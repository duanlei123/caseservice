package com.e.caseservice.utils;
import org.gitlab.api.GitlabAPI;
import org.gitlab.api.models.GitlabSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.activation.MailcapCommandMap;
import javax.sound.midi.Soundbank;
import java.io.IOException;

/**
 * @author wb-dl321273
 * @date 2020/4/7 16:53
 * @description 接口负责研发：
 * 接口文档：
 * 接口说明(业务介绍，介绍重要参数的用途)： 获取gitlab api
 *  目前使用gitlab V3 api, 将来升级gitlab 需要升级gitlab api v4
 */
public class GitlabApiUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(GitlabApiUtils.class);

    public static GitlabAPI getGitlabApi(String gitHttpUrl, String username, String password) {
        GitlabAPI gitlabAPI = null;
        try {
            GitlabSession connect = GitlabAPI.connect(gitHttpUrl, username, password);
            String privateToken = connect.getPrivateToken();
            LOGGER.info("用户private_Token: {}", privateToken);
            // 这里注意，如果是 gitlab 8.3.2 版本， 用户会默认创建token, gitlab 9 以上版本默认没有token
            if (privateToken == null) {
                privateToken = GenerateRandomString.RandomCharString(20);
                // 设置一个token
                connect.setPrivateToken(privateToken);
            }
            gitlabAPI = GitlabAPI.connect(gitHttpUrl, privateToken);

        } catch (IOException e) {
            LOGGER.error("gitlab 用户认证失败: {}", username, e);
        }
        return gitlabAPI;
    }
}
