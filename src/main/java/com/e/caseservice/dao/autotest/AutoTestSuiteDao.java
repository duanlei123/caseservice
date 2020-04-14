package com.e.caseservice.dao.autotest;

import com.e.caseservice.dto.autotest.AutoTestSuiteDto;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @author wb-dl321273
 * @date 2020/4/13 15:59
 * @description 接口负责研发：
 * 接口文档：
 * 接口说明(业务介绍，介绍重要参数的用途)：测试套
 */
@Repository
public interface AutoTestSuiteDao {
    // 获取测试套列表
    List<AutoTestSuiteDto> getTestSuiteList(@Param("status") String status);
    // 获取测试套
    AutoTestSuiteDto getTestSuiteByID(@Param("id") Integer id);
    // 添加测试套
    void addTestSuite(@Param("autoTestSuiteDto") AutoTestSuiteDto autoTestSuiteDto);
    //更新测试套
    void updateTestSuite(@Param("autoTestSuiteDto")AutoTestSuiteDto autoTestSuiteDto);
    // 删除测试套
    void deleteTestSuite(@Param("id")Integer id);
    // 根据名称查询测试套
    AutoTestSuiteDto getTestSuiteByIDAndName(@Param("id") Integer id, @Param("name") String name);
    // 更新配置文件
    void updateTestSuitConf(@Param("id") Integer id, @Param("config") String config);
}
