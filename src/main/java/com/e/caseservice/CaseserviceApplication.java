package com.e.caseservice;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.e.caseservice.dao")
public class CaseserviceApplication {

    private static int nMaxMergeThread = 2;
    public static int getnMaxMergeThread() {
        return nMaxMergeThread;
    }

    public static void main(String[] args) {
        SpringApplication.run(CaseserviceApplication.class, args);
    }

}
