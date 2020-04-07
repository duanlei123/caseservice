package com.e.caseservice.controller;

import com.e.caseservice.common.Constants;
import com.e.caseservice.common.Result;
import com.e.caseservice.common.StatusCode;
import com.e.caseservice.dto.StatusDto;
import com.e.caseservice.service.AutoParseCaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 解析自动化case 工程 入库
 */
@RestController
public class AutoParseCaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AutoParseCaseController.class);
    private final AutoParseCaseService autoParseCaseService;

    @Autowired
    public AutoParseCaseController(AutoParseCaseService autoParseCaseService) {
        this.autoParseCaseService = autoParseCaseService;
    }

    /**
     * 解析自动化case
     * @param gitUrl giturl , githttpurl
     * @param branchName 分支名称
     * @param confFileName case工程配置文件
     * @param gitToken git Token 这里需要管理员的Token 必须有权限的token
     * @param testSuiteId  测试套id （测试套创建从用户页面创建, 未开发）
     * @param caseRootPackage case是所在报路径
     */
    @RequestMapping(value = "/parseRepoCase", method = RequestMethod.POST)
    @ResponseBody
    public Result parseRepoCase(@RequestParam(value = "gitUrl") String gitUrl,
                                @RequestParam(value = "branchName") String branchName,
                                @RequestParam(value = "confFileName") String confFileName,
                                @RequestParam(value = "gitToken") String gitToken,
                                @RequestParam(value = "testSuiteId") int testSuiteId,
                                @RequestParam(value = "caseRootPackage") String caseRootPackage) {

        return autoParseCaseService.parseRepoCase(gitUrl, branchName, confFileName, testSuiteId,
                Constants.REPO_DOWNLOAD_FOLDER + "/" + Thread.currentThread().getName(),
                gitToken, caseRootPackage);

    }

    @RequestMapping(value = "/getAllStatus", method = RequestMethod.GET)
    public Result getAllStatus(){
        List<StatusDto> lists = autoParseCaseService.getAllStatus();
        return new Result(true, StatusCode.OK, "成功",lists);
    }
}