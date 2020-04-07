package com.e.caseservice.service;

import com.e.caseservice.utils.FileUtils;
import com.e.caseservice.utils.GitlabApiUtils;
import com.e.caseservice.utils.HttpRequest;
import org.gitlab.api.GitlabAPI;
import org.gitlab.api.models.GitlabProject;
import org.gitlab.api.models.GitlabSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.security.util.Password;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class GitService {
    private static final Logger LOGGER = LoggerFactory.getLogger(GitService.class);

    private GitlabAPI gitlabApi;
    private GitlabProject targetProject;
    private URL gitOriUrl;
    private String httpURL;
    private int gitProjectId;
    private String branchName;
    private String gitProjectName;
    private String savePath;

    boolean init(URL httpUrl, String branchName, String savePath, String username, String password) {

        this.gitOriUrl = httpUrl;
        String port = gitOriUrl.getPort() == -1 ? "" : ":" + gitOriUrl.getPort();
        this.httpURL = gitOriUrl.getProtocol() + "://" + gitOriUrl.getHost() + port + "/";

        gitlabApi = GitlabApiUtils.getGitlabApi(httpURL, username, password);
        try {
            this.gitProjectName = gitOriUrl.getPath().substring(1).replaceAll("\\.git", "");
        } catch (Exception e) {
            LOGGER.error("解析(测试套工程)项目名称失败错误", e);
        }
        this.savePath = savePath;
        this.branchName = branchName;

        if (savePath.lastIndexOf("/") != savePath.length()) {
            this.savePath += "/";
        }
        // 获取项目id
        this.gitProjectId = getGitProjectId();
        if (this.gitProjectId < 0) {
            LOGGER.error("查询项目" + gitOriUrl.toString() + "的Git ID失败");
            return false;
        }
        LOGGER.info("解析测试通过名为:{}", gitProjectName);
        return true;
    }


    /**
     * 通过项目的projectName查找其对应的id，直接使用projectName作为参数下载可能因为projectName中的特殊字符导致url异常
     * /api/v3/projects/all 只有管理员才能访问, 这里我们使用 /api/v3/projects:获取已经认证用户可访问的项目列表
     * @return projectName对应的id
     */
    private int getGitProjectId(){
        try {
            // 获取已经认证用户可访问的项目列表
            List<GitlabProject> projects = gitlabApi.getProjects();
            // 获取项目id
            targetProject = findTargetProjectId(projects);
            if (targetProject != null){
                return targetProject.getId();
            }
        } catch (IOException e) {
            LOGGER.error("获取Gitlab上测试case工程信息异常{}！", httpURL, e);
            return -1;
        }
        return  -1;
//
//        int page = 1;
//        int targetGitProjectId;
//        while (true) {
//            //https://gitlab01.dtdream.com/api/v3/projects/all/?private_token=La6JV3KxgwnxMsA9mxcP
//            String urlStr = this.httpURL + "/api/v3/projects/all";
//            LOGGER.info("urlStr "+urlStr+this.token);
//            Map<String, Object> urlParameterMap = new HashMap<>();
//            urlParameterMap.put("private_token", this.token);
//            urlParameterMap.put("per_page", 100);
//            urlParameterMap.put("page", page);
//
//            try {
//                String jsonArr = HttpRequest.doGet(urlStr, urlParameterMap);
//                if (jsonArr.isEmpty()) {
//                    LOGGER.error("获取GIT上项目信息异常！");
//                    return -1;
//                }
//                JSONArray jsonArray = new JSONArray(jsonArr);
//                if (jsonArray.length() == 0) {
//                    LOGGER.error("测试套项目不存在！");
//                    return -1;
//                }
//                targetGitProjectId = findTargetProjectId(jsonArray);
//                if (targetGitProjectId > 0) {
//                    return targetGitProjectId;
//                }
//            } catch (Exception e) {
//                LOGGER.error("查询项目{}的Git ID异常{}",this.gitProjectName, e);
//                return -1;
//            }
//            page++;
//        }
    }

    private GitlabProject findTargetProjectId(List<GitlabProject> projects) {
        try {
            for (GitlabProject project : projects){
                if (project.getHttpUrl().equalsIgnoreCase(this.gitOriUrl.toString())){
                    LOGGER.info("获取Gitlab上测试case工程id为:{}", project.getId());
                    return project;
                }
            }
//            for (int j = 0; j < gitlabProject.size(); j++) {
//                JSONObject jsonObject = jsonArray.getJSONObject(j);
//                if (jsonObject.getString("http_url_to_repo").equalsIgnoreCase(this.gitOriUrl.toString())) {
//                    LOGGER.info("Git http repo:" + jsonObject.getString("http_url_to_repo"));
//                    return jsonObject.getInt("id");
//                }
//            }
        } catch (Exception e) {
            LOGGER.error("获取Gitlab上测试case工程id 异常", e);
        }
        LOGGER.error("获取Gitlab上测试case工程id不存在{}",this.gitOriUrl);
        return null;
    }

    String getGitProjectName() {
        return gitProjectName;
    }


    /**
     * 下载对于分支测试套代码
     * @return
     */
    boolean downloadBranchCode() {
        long time1 = new Date().getTime();
//        String urlStr = this.httpURL + "/api/v3/projects/" + this.gitProjectId + "/repository/archive";
//        Map<String, Object> urlParameterMap = new HashMap<>();
//        urlParameterMap.put("private_token", this.token);
//        urlParameterMap.put("sha", this.branchName);
        try {
            //得到输入流
//            InputStream inputStream = HttpRequest.doGetInputStream(urlStr, urlParameterMap);
            byte[] fileArchive = gitlabApi.getFileArchive(targetProject);
            InputStream inputStream = new ByteArrayInputStream(fileArchive);
            if (inputStream == null) {
                LOGGER.error("下载代码异常");
                return false;
            }
            LOGGER.info("开始下载并解压tar包");
            //解开tar包
            int totalLength = FileUtils.decompressGzipFile(inputStream, new File(this.savePath));
            if (totalLength == 0) {
                LOGGER.error("解压tar失败");
                return false;
            }
            long time2 = new Date().getTime();
            float fileLength = (float) totalLength / 1024;
            float elapseTime = (float) (time2 - time1) / 1000;
            float rate = fileLength / elapseTime;

            LOGGER.info("下载项目大小:" + fileLength + " KB");
            LOGGER.info("耗时       :" + elapseTime + " 秒");
            LOGGER.info("下载速率大小:" + rate + " KBps");
        } catch (Exception e) {
            LOGGER.error("下载项目代码发生异常", e);
            return false;
        }
        return true;
    }

    public String getHttpURL() {
        return httpURL;
    }
}
