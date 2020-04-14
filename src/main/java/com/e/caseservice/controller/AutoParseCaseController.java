package com.e.caseservice.controller;

import com.e.caseservice.common.Constants;
import com.e.caseservice.common.Result;
import com.e.caseservice.common.StatusCode;
import com.e.caseservice.dto.autocase.StatusDto;
import com.e.caseservice.dto.autotest.AutoTestSuiteDto;
import com.e.caseservice.service.AutoParseCaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * 解析自动化case 工程 入库
 */
@RestController
@RequestMapping("/autotestsuit")
public class AutoParseCaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AutoParseCaseController.class);
    private final AutoParseCaseService autoParseCaseService;

    @Autowired
    public AutoParseCaseController(AutoParseCaseService autoParseCaseService) {
        this.autoParseCaseService = autoParseCaseService;
    }

    /**
     * 解析自动化case
     */
    @RequestMapping(value = "/parseRepoCase", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Result parseRepoCase(@RequestBody AutoTestSuiteDto testsuite) {
        String savePath = Constants.REPO_DOWNLOAD_FOLDER + "/" + Thread.currentThread().getName();
        return autoParseCaseService.parseRepoCase(testsuite.getGitUrl(), testsuite.getBranch(), testsuite.getConfFileName(), testsuite.getId(),savePath,testsuite.getGitusername(),testsuite.getGitpassword(),testsuite.getCaseRootPackage());

    }

    @RequestMapping(value = "/getAllStatus", method = RequestMethod.GET)
    public Result getAllStatus(){
        List<StatusDto> lists = autoParseCaseService.getAllStatus();
        return new Result(true, StatusCode.OK, "成功",lists);
    }
}