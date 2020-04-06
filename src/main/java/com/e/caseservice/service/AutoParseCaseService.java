package com.e.caseservice.service;

import com.e.caseservice.common.Constants;
import com.e.caseservice.common.Result;
import com.e.caseservice.common.StatusCode;
import com.e.caseservice.dao.AutoParseCaseDao;
import com.e.caseservice.dto.AutoCaseInfoDto;
import com.e.caseservice.dto.AutoModuleInfoDto;
import com.e.caseservice.dto.StatusDto;
import com.e.caseservice.dto.TestSuitDto;
import com.e.caseservice.utils.FileUtils;
import com.e.caseservice.utils.Tools;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

@Service
public class AutoParseCaseService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AutoParseCaseService.class);
    private final AutoParseCaseDao autoParseCaseDao;
    @Autowired
    public AutoParseCaseService(AutoParseCaseDao autoParseCaseDao) {
        this.autoParseCaseDao = autoParseCaseDao;
    }


    public List<StatusDto> getAllStatus() {
        return autoParseCaseDao.getAllStatus();
    }

    /**
     * 同步测试套
     * @param savePath  下载工程代码存储路径 (当前项目路径 + 线程名)
     */
    public Result parseRepoCase(String gitUrl, String branchName, String confFileName,
                                             int testSuiteId, String savePath, String gitToken,
                                             String caseRootPackage) {
        try {

            URL gitOriUrl = new URL(gitUrl);
            //根据testSuiteId 查询测试套
            TestSuitDto testSuitDto = autoParseCaseDao.getTestSuit(testSuiteId);
            if (testSuitDto == null) {
                LOGGER.error("测试套不存在请先创建！");
                return new Result(false, StatusCode.ERROR, "测试套不存在请先创建！");
                // 如果测试套为运行中状态
            } else if (Constants.TEST_SUITE_RUNNING_STATE.equalsIgnoreCase(testSuitDto.getStatus())) {
                LOGGER.error("测试套正在同步中, 如有问题请联系管理员 {}", testSuiteId);
                return new Result(false, StatusCode.ERROR, "测试套正在同步中！");
            } else {
                // 修改测试套状态为 运行中
                autoParseCaseDao.updateTestSuite(testSuiteId, "", "", Constants.TEST_SUITE_RUNNING_STATE, "");
                // 启动同步线程 开始分析用例
                ParseCaseThread parseCaseThread = new ParseCaseThread(gitOriUrl, branchName, confFileName, testSuiteId, savePath, gitToken, caseRootPackage, testSuitDto.getVersion());
                new Thread(parseCaseThread).start();
            }
        } catch (MalformedURLException e) {
            LOGGER.error("请检查GitUrl {}, 传入正确的UrL,{}" , gitUrl, e.getMessage());
            //产生异常更新测试套表
            autoParseCaseDao.updateTestSuite(testSuiteId, "", "解析测试套异常,非法url", Constants.TEST_SUITE_ABNORMAL_STATE, "");
            return new Result(false, StatusCode.ERROR, "测试套同步失败,RUL异常！");
        }
        return new Result(true, StatusCode.OK, "请内心等待,测试套正在同步中");
    }

    /**
     * 分析用例失败时清除数据库中数据，成功时将结果写入数据库
     * @param state
     * @param info
     * @param testSuiteId
     * @param config
     * @param testSuiteVersion
     * @return
     */
    private void processResult(boolean state, String info, int testSuiteId, String config, String testSuiteVersion, File savePathFile) {
        //将配置文件和结果写入数据库
        //删除下载的代码
        if (!FileUtils.deleteDir(savePathFile)) {
            LOGGER.error("删除下载测试套代码失败！");
        }
        if (state) {
            // 分析成功, 入库
            autoParseCaseDao.updateTestSuite(testSuiteId, config, info, Constants.TEST_SUITE_NORMAL_STATE, testSuiteVersion);
        } else {
            // 分析失败，清除数据
            autoParseCaseDao.updateTestSuite(testSuiteId, config, info, Constants.TEST_SUITE_ABNORMAL_STATE, "");
            delAllCasesAndModules(testSuiteId);
        }
    }

    /**
     * 删除 测试套下所有的module
     * @param testSuiteId
     */
    private void delAllCasesAndModules(int testSuiteId) {
        // 获取根据testSuiteId获取所有auto_moduleinfo
        List<String> moduleList = autoParseCaseDao.getAllModuleId(testSuiteId);
        if (!moduleList.isEmpty()) {
            // 请求module
            autoParseCaseDao.deleteAllCases(moduleList);
        }
        autoParseCaseDao.deleteAllModules(testSuiteId);
    }


    private Map<String, String> buildHttpResponseInfo(boolean state, String info) {
        Map<String, String> map = new HashMap<>();
        //将配置文件和结果写入数据库
        map.put("info", info);
        if (state) {
            map.put("result", "success");
        } else {
            map.put("result", "fail");
        }
        return map;
    }

    /**
     * 开始分析测试套
     */
    private void startParse(URL gitOriUrl, String branchName, String confFileName, int testSuiteId, String savePath, String gitToken,
                            String caseRootPackage, String testSuiteVersion) {
        LOGGER.info("开始分析测试套{},工程{}, 分支{}.",testSuiteId,gitOriUrl.toString(), branchName);
        Date startTime = new Date();
        //查询数据库内已经存在的模块
        List<AutoModuleInfoDto> existModules = autoParseCaseDao.getExistModules(testSuiteId);
        //该map以模块的parent id+name为key，同一个模块下模块名称唯一, 存储已经存在的模块
        Map<String, String> existModulesInfoMap = new HashMap<>();
        for (AutoModuleInfoDto module : existModules) {
            existModulesInfoMap.put(module.getParentId() + module.getName(), module.getId());
        }
        //查询数据库内已经存在的用例
        List<AutoCaseInfoDto> existCases = autoParseCaseDao.getExistCases(testSuiteId);
        //同一个模块下用例名称唯一, 存储已经存在的用例
        Map<String, String> existCasesInfoMap = new HashMap<>();
        for (AutoCaseInfoDto caseInfo : existCases) {
            existCasesInfoMap.put(caseInfo.getModuleId() + caseInfo.getName(), caseInfo.getId());
        }

        //初始化代码存储路径
        File savePathFile = new File(savePath);
        if (!FileUtils.deleteDir(savePathFile)) {
            LOGGER.error("初始化代码存储路径失败!(代码存储路径为当前路径+子线程名)");
            processResult(false, "初始化代码存储路径失败", testSuiteId, "", testSuiteVersion, savePathFile);
            return;
        }
        // 从git下载测试套工程
        CaseGitRepoService caseGitRepoService = new CaseGitRepoService();
        //开始下载并分析用例代码文件，分析完毕后将其转为对应的数据结构存储
        if (!caseGitRepoService.init(gitOriUrl, branchName, savePath, confFileName, gitToken, existModulesInfoMap, existCasesInfoMap, testSuiteId, caseRootPackage)) {
            processResult(false, "下载代码失败", testSuiteId, "", testSuiteVersion, savePathFile);
            return;
        }
        // 开始解析代码
        if (!caseGitRepoService.parseCase()) {
            processResult(false, "分析代码失败", testSuiteId, "", testSuiteVersion, savePathFile);
            return;
        }

        Set<AutoModuleInfoDto> insertModuleInfoDtoSet = caseGitRepoService.getInsertModuleInfoDtoSet();
        Set<AutoCaseInfoDto> insertAutoCaseSet = caseGitRepoService.getInsertAutoCaseSet();
        List<String> updateCaseIds = caseGitRepoService.getUpdateCaseIds();
        LOGGER.info("分析用例完毕，将结果写入数据库");
        try {
            //如果存在需要更新的测试用例，先删除后再写入
            // 将原有用例和模块全部删除 然后整体重新写入
            delAllCasesAndModules(testSuiteId);
            if (!insertModuleInfoDtoSet.isEmpty()) {
                // modules 入库
                autoParseCaseDao.insertAutoModules(insertModuleInfoDtoSet);
            }
            if (!insertAutoCaseSet.isEmpty()) {
                // case 入库
                autoParseCaseDao.insertAutoCases(insertAutoCaseSet);
            }
        } catch (Exception e) {
            LOGGER.error("写入数据库异常{}", e.getMessage());
            processResult(false, "写入数据库异常", testSuiteId, "", testSuiteVersion, savePathFile);
            return;
        }
        String config = caseGitRepoService.getConfProperties().toString();
        if (config.isEmpty()) {
            LOGGER.error("未找到配置文件" + confFileName);
        }
        // 获取版本， 默认为1.0.0
        String version = caseGitRepoService.getTestSuiteVersion();
        if (version == null || version.isEmpty()) {
            version = testSuiteVersion;
        }
        if (testSuiteVersion.isEmpty()) {
            LOGGER.error("未找到测试套" + gitOriUrl.toString() + "版本信息");
        }
        LOGGER.info("新增模块个数:" + caseGitRepoService.getInsertModuleNum());
        LOGGER.info("新增用例个数:" + caseGitRepoService.getInsertCasesNum());
        LOGGER.info("更新用例个数:" + caseGitRepoService.getUpdateCasesNum());
        LOGGER.info("处理@Test文件:" + caseGitRepoService.getTotalCaseFileNum());
        LOGGER.info("处理@dataProvider文件:" + caseGitRepoService.getTotalDataProviderFileNum());
        String expendTimeInfo = Tools.getDistanceTime(new Date().getTime() - startTime.getTime());
        LOGGER.info("分析Git项目:" + gitOriUrl.toString() + "    " + branchName + "分支用例共耗时" + expendTimeInfo);
        processResult(true, "新增模块个数:" + caseGitRepoService.getInsertModuleNum() +
                "新增用例个数:" + caseGitRepoService.getInsertCasesNum() +
                ";更新用例个数:" + caseGitRepoService.getUpdateCasesNum() + " 耗时:" + expendTimeInfo, testSuiteId, config, version, savePathFile);
    }

    /**
     * 起新线程处理分析用例
     */
    class ParseCaseThread implements Runnable {
        private final URL gitOriUrl;
        private final String branchName;
        private final String confFileName;
        private final int testSuiteId;
        private final String savePath;
        private final String gitToken;
        private final String caseRootPackage;
        private final String testSuiteVersion;

        public ParseCaseThread(URL gitOriUrl, String branchName, String confFileName, int testSuiteId, String savePath, String gitToken, String caseRootPackage, String testSuiteVersion) {
            this.gitOriUrl = gitOriUrl;
            this.branchName = branchName;
            this.confFileName = confFileName;
            this.testSuiteId = testSuiteId;
            this.savePath = savePath;
            this.gitToken = gitToken;
            this.caseRootPackage = caseRootPackage;
            if (testSuiteVersion == null || testSuiteVersion.isEmpty()) {
                this.testSuiteVersion = Constants.TEST_SUITE_DEFAULT_VERSION;
            } else {
                this.testSuiteVersion = testSuiteVersion;
            }
        }

        public void run() {
            Thread.currentThread().setName("testSuiteId:" + this.testSuiteId);
            // 开始分析
            startParse(gitOriUrl, branchName, confFileName, testSuiteId, savePath, gitToken, caseRootPackage, testSuiteVersion);
        }
    }


}
