package com.e.caseservice.dao;

import com.e.caseservice.dto.AutoCaseInfoDto;
import com.e.caseservice.dto.AutoModuleInfoDto;
import com.e.caseservice.dto.StatusDto;
import com.e.caseservice.dto.TestSuitDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Set;

@Mapper
public interface AutoParseCaseDao {

    List<StatusDto> getAllStatus();

    void updateTestSuite(@Param("testSuiteId") int testSuiteId, @Param("config") String config,
                         @Param("info") String info, @Param("status") String status,
                         @Param("testSuiteVersion") String testSuiteVersion);

    TestSuitDto getTestSuit(@Param("testSuiteId") int testSuiteId);

    List<String> getAllModuleId(@Param("testSuiteId") int testSuiteId);

    void deleteAllCases(@Param("moduleList") List<String> moduleList);

    void deleteAllModules(@Param("testSuiteId") int testSuiteId);

    List<AutoModuleInfoDto> getExistModules(@Param("testSuiteId") int testSuiteId);

    List<AutoCaseInfoDto> getExistCases(@Param("testSuiteId") int testSuiteId);

    void insertAutoModules(@Param("autoModulesList") Set<AutoModuleInfoDto> autoModulesSet);

    void insertAutoCases(@Param("autoCasesList") Set<AutoCaseInfoDto> autoCasesSet);

    void deleteExistCases(@Param("updateCaseIds") List<String> updateCaseIds);

}
