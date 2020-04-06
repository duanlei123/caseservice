package com.e.caseservice.gitlabApiTest;

import org.gitlab.api.GitlabAPI;
import org.gitlab.api.models.GitlabProject;
import org.gitlab.api.models.GitlabSession;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.io.IOException;
import java.util.List;

public class getProjectAllTest {

    private  GitlabAPI gitlabAPI = null;
    @BeforeClass
    public void beforeClass(){
        // 获取gitlabsession
        GitlabSession connect = null;
        try {
            connect = GitlabAPI.connect("https://gitee.com/duanlei12/CaseDemo.git",
                    "13393406705", "19931013dl");
        } catch (IOException e) {
            System.out.println("gitlab链接失败! 用户名，密码，url不正确");
            e.printStackTrace();
        }
        // 获取token 3502d8bf0c5045d015b92f38a8a38509
        String privateToken = connect.getPrivateToken();
        if (privateToken == null){
            // 如果认证成功没有私人令牌， 生成私人令牌
            connect.setPrivateToken("");
            // 获取gitlabAPI 对象
            gitlabAPI = GitlabAPI.connect("", privateToken);
        }else {
            gitlabAPI = GitlabAPI.connect("", privateToken);
        }
    }

    @Test
    public void getAllProjectsTest(){
        List<GitlabProject> allProjects = gitlabAPI.getAllProjects();
        System.out.println(allProjects);
    }
}
