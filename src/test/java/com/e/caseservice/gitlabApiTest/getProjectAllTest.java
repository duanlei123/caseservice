package com.e.caseservice.gitlabApiTest;

import org.gitlab.api.GitlabAPI;
import org.gitlab.api.models.GitlabProject;
import org.gitlab.api.models.GitlabSession;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import javax.sound.midi.Soundbank;
import java.io.IOException;
import java.util.List;

public class getProjectAllTest {

    private  GitlabAPI gitlabAPI = null;
    @BeforeClass
    public void beforeClass(){
        // 获取gitlabsession
        GitlabSession connect = null;
        try {
            connect = GitlabAPI.connect("http://192.168.18.132:10080/",
                    "duanlei", "12345678");
        } catch (IOException e) {
            System.out.println("gitlab链接失败! 用户名，密码，url不正确");
            e.printStackTrace();
        }
        // 获取token 3502d8bf0c5045d015b92f38a8a38509
        String privateToken = connect.getPrivateToken();
        System.out.println(privateToken);
        if (privateToken == null){
            // 如果认证成功没有私人令牌， 生成私人令牌
            connect.setPrivateToken("");
            // 获取gitlabAPI 对象
            gitlabAPI = GitlabAPI.connect("http://192.168.18.132:10080/", privateToken);
        }else {
            gitlabAPI = GitlabAPI.connect("http://192.168.18.132:10080/", privateToken);
        }
    }

    @Test
    public void getAllProjectsTest() throws IOException {
//        List<GitlabProject> allProjects1 = gitlabAPI.getAllProjects(); 管理员可以访问
        List<GitlabProject> allProjects = gitlabAPI.getProjects(); // 获取已经认证用户可访问的项目列表
        System.out.println(allProjects);
    }
}
