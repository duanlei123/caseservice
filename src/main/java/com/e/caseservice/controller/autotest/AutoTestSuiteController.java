package com.e.caseservice.controller.autotest;

import com.e.caseservice.common.Result;
import com.e.caseservice.common.StatusCode;
import com.e.caseservice.dto.autotest.AutoTestSuiteDto;
import com.e.caseservice.service.autotest.AutoTestSuiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sun.rmi.runtime.NewThreadAction;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author wb-dl321273
 * @date 2020/4/13 15:42
 * @description 接口负责研发：
 * 接口文档：
 * 接口说明(业务介绍，介绍重要参数的用途)：测试套控制层
 */

@RestController
@RequestMapping("/autotestsuit")
public class AutoTestSuiteController {

    @Autowired
    private AutoTestSuiteService autoTestSuiteService;

    /**
     * 获取测试套列表
     * @param status 测试套状态
     * @return
     */
    @RequestMapping(value = "/getTestSuiteList", method = RequestMethod.GET)
    @ResponseBody
    public Result getTestSuiteList(@RequestParam(value = "status", required = false) String status) {
        List<AutoTestSuiteDto> autoTestSuiteDtos = autoTestSuiteService.getTestSuiteList(status);
        return new Result(true, StatusCode.OK, "成功", autoTestSuiteDtos);
    }

    /**
     * 根据测试套id 获取测试套
     * @param id
     * @return
     */
    @RequestMapping(value = "/getTestSuiteByID")
    @ResponseBody
    public Result getTestSuiteByID(@RequestParam(value = "id") Integer id) {
        AutoTestSuiteDto autoTestSuiteDto =  autoTestSuiteService.getTestSuiteByID(id);
        return new Result(true, StatusCode.OK, "成功", autoTestSuiteDto);
    }

    /**
     * 添加测试套
     * @param autoTestSuiteDto
     * @return
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Result addTestSuite(@RequestBody AutoTestSuiteDto autoTestSuiteDto) {
        autoTestSuiteDto.setCreatetime(new Date());
        autoTestSuiteService.addTestSuite(autoTestSuiteDto);
        return new Result(true, StatusCode.OK, "添加成功");
    }

    /**
     * 更新测试套
     * @param autoTestSuiteDto
     * @return
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Result updateTestSuite(@RequestBody AutoTestSuiteDto autoTestSuiteDto) {
        boolean updateTestSuite = autoTestSuiteService.updateTestSuite(autoTestSuiteDto);
        if (updateTestSuite){
            return new Result(true, StatusCode.OK, "更新成功");
        }
        return  new Result(false, StatusCode.ERROR, "测试套不存在");
    }


    /**
     * 删除测试套
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Result deleteTestSuite(@RequestBody Integer id) {
        autoTestSuiteService.deleteTestSuite(id);
        return new Result(true, StatusCode.OK, "删除成功");
    }


    /**
     * 根据名称查询测试套
     * @param id
     * @param name
     * @return
     */
    @RequestMapping(value = "/getTestSuiteByIDAndName")
    @ResponseBody
    public Result getTestSuiteByIDAndName(@RequestParam(value = "id", required = false) Integer id, @RequestParam(value = "name") String name) {
        AutoTestSuiteDto testSuiteByIDAndName = autoTestSuiteService.getTestSuiteByIDAndName(id, name);
        if (testSuiteByIDAndName != null){
            return new Result(true, StatusCode.OK, "成功", testSuiteByIDAndName);
        }else {
            return new Result(false, StatusCode.ERROR, "失败");
        }
    }

    /**
     * 导入配置文件
     * @param request
     * @return
     */
    @RequestMapping(value = "/importConf", method = RequestMethod.POST, produces = "application/txt;charset=UTF-8")
    @ResponseBody
    public String importConf(HttpServletRequest request) {
        String importConf = autoTestSuiteService.importConf(request);
        return importConf;
    }

    // 更新配置文件
    @RequestMapping(value = "/updateTestSuitConf", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Result updateTestSuitConf(@RequestBody AutoTestSuiteDto autoTestSuiteDto) {
        autoTestSuiteService.updateTestSuitConf(autoTestSuiteDto);
        return new Result(true, StatusCode.OK, "更新配置文件成功");
    }
    // 导出配置文件
    @RequestMapping(value = "/exportConf", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> exportConf(HttpServletRequest request, HttpServletResponse response, @RequestBody String conf) {
        return autoTestSuiteService.exportConf(request, response, conf);
    }

    // 下载配置文件
    @RequestMapping(value = "/downloadConf")
    @ResponseBody
    public void downloadConf(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "fileName") String fileName) {
        autoTestSuiteService.downloadConf(request, response, fileName);
    }

}
