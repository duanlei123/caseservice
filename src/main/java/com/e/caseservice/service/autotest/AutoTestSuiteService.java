package com.e.caseservice.service.autotest;

import com.e.caseservice.common.Constants;
import com.e.caseservice.dao.autotest.AutoTestSuiteDao;
import com.e.caseservice.dto.autotest.AutoTestSuiteDto;
import com.e.caseservice.utils.FileHandle;
import com.e.caseservice.utils.FileUtils;
import com.e.caseservice.utils.Tools;
import org.apache.commons.lang.StringUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

/**
 * @author wb-dl321273
 * @date 2020/4/13 15:44
 * @description 接口负责研发：
 * 接口文档：
 * 接口说明(业务介绍，介绍重要参数的用途)：
 */
@Service
public class AutoTestSuiteService {

    private static final Logger logger = LoggerFactory.getLogger(AutoTestSuiteService.class);

    @Autowired
    private AutoTestSuiteDao autoTestSuiteDao;

    // 获取所有测试套
    public List<AutoTestSuiteDto> getTestSuiteList(String status) {
        return autoTestSuiteDao.getTestSuiteList(status);
    }
    //查询测试套
    public AutoTestSuiteDto getTestSuiteByID(Integer id) {
        return autoTestSuiteDao.getTestSuiteByID(id);
    }
    // 添加测试套
    public void addTestSuite(AutoTestSuiteDto autoTestSuiteDto) {
        autoTestSuiteDao.addTestSuite(autoTestSuiteDto);
    }
    // 更新测试套
    public boolean updateTestSuite(AutoTestSuiteDto autoTestSuiteDto) {
        // 根据id获取测试套
        AutoTestSuiteDto testSuiteByID = getTestSuiteByID(autoTestSuiteDto.getId());
        if (testSuiteByID == null){
            return false;
        }
        autoTestSuiteDao.updateTestSuite(autoTestSuiteDto);
        return true;
    }

    // 删除测试套
    public boolean deleteTestSuite(Integer id) {
        // 根据id获取测试套
        AutoTestSuiteDto testSuiteByID = getTestSuiteByID(id);
        if (testSuiteByID == null){
            return false;
        }
        autoTestSuiteDao.deleteTestSuite(id);
        return true;
    }

    // 根据名称查询测试套
    public AutoTestSuiteDto getTestSuiteByIDAndName(Integer id, String name) {
        return  autoTestSuiteDao.getTestSuiteByIDAndName(id, name);
    }

    // 导入配置文件
    public String importConf(HttpServletRequest request) {
        JSONArray jsonArray = new JSONArray();

        //将request转型为MultipartHttpRequest
        MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;

        //得到request文件中的附件
        Map<String, MultipartFile> fileMap = mRequest.getFileMap();

        //遍历httpRequest的附件
        for (Map.Entry<String, MultipartFile> entry : fileMap.entrySet()) {

            //得到文件
            MultipartFile mFile = entry.getValue();

            Properties properties = new Properties();
            InputStream is = null;
            InputStreamReader isr = null;

            try {
                is = mFile.getInputStream();
                isr = new InputStreamReader(is, Constants.CHARSET_UTF_8);
                properties.load(isr);
                Set<String> set = properties.stringPropertyNames();

                for (String key : set) {
                    String propertyValue = properties.getProperty(key);
                    JSONObject jsonObject = new JSONObject();

                    if (!key.endsWith(Constants.CONF_DESCRIPTION_SUFFIX)) {
                        jsonObject.put("key", key);
                        jsonObject.put("value", propertyValue);

                        for (String keyDesc : set) {
                            if (StringUtils.equals(key + Constants.CONF_DESCRIPTION_SUFFIX, keyDesc)) {
                                jsonObject.put("description", properties.getProperty(keyDesc));
                            }
                        }

                        jsonArray.add(jsonObject);
                    }
                }
                break;
            } catch (Exception e) {
                logger.error(e.getMessage(), mFile.getOriginalFilename() + "解析失败");
            } finally {
                FileHandle.safeClose(is);
                FileHandle.safeClose(isr);
            }
        }

        return jsonArray.toString();
    }

    // 更新配置文件
    public void updateTestSuitConf(AutoTestSuiteDto autoTestSuiteDto) {
        autoTestSuiteDao.updateTestSuitConf(autoTestSuiteDto.getId(), autoTestSuiteDto.getConfig());
    }

    public Map<String, String> exportConf(HttpServletRequest request, HttpServletResponse response, String conf) {

        String sRootPath = request.getSession().getServletContext().getRealPath("/");
        Map<String, String> paramMap = new HashMap<>();

        String sRetPath = Tools.pathAppend(Constants.File_Repository, Constants.DOWNLOADDIR);
        StringBuilder sFileName = new StringBuilder();
        sFileName.append(Tools.getTime()).append("_").append("conf.properties");
        sRetPath = Tools.pathAppend(sRetPath, sFileName.toString());
        // 保存文件路径
        String sSavePath = Tools.pathAppend(sRootPath, sRetPath);
        FileHandle.saveFile(sSavePath, generateConfProperties(conf), Constants.CHARSET_UTF_8);

        paramMap.put("targetFileName", sFileName.toString());
        return paramMap;
    }
    /**
     * 生成conf.properties格式的配置数据
     *
     * @param conf 配置kv数组
     * @return k=v格式数据
     */
    private String generateConfProperties(String conf) {
        StringBuilder confProperties = new StringBuilder();
        JSONArray jsonArray = JSONArray.fromObject(conf);
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            confProperties.append(jsonObject.get("key"));
            confProperties.append("=");
            confProperties.append(jsonObject.get("value"));
            confProperties.append("\n");
            if (null != jsonObject.get("description")) {
                confProperties.append(jsonObject.get("key") + Constants.CONF_DESCRIPTION_SUFFIX);
                confProperties.append("=");
                confProperties.append(jsonObject.get("description"));
                confProperties.append("\n");
            }
        }
        return confProperties.toString();
    }

    // 下载配置文件
    public void downloadConf(HttpServletRequest request, HttpServletResponse response, String fileName) {
        String sRootPath = request.getSession().getServletContext().getRealPath("/");
        String sDownloadDir = Tools.pathAppend(Constants.File_Repository, Constants.DOWNLOADDIR);
        sDownloadDir = Tools.pathAppend(sRootPath, sDownloadDir);
        String sFilePath = Tools.pathAppend(sDownloadDir, fileName);
        File file = new File(sFilePath);

        FileUtils.download(request, response, sFilePath, fileName);
        file.delete();
    }
}
