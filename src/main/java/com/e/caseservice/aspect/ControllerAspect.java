package com.e.caseservice.aspect;

import com.e.caseservice.utils.NetworkUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

/**
 * 统一接口日志处理
 */
@Aspect
@Order(5)
@Component
public class ControllerAspect {
    private static final Logger logger = LogManager.getLogger(ControllerAspect.class);

    ThreadLocal<Long> startTime = new ThreadLocal<Long>();

    @Pointcut("execution(public * com.e.caseservice.controller.*.*(..))")
    public void webLog() {
    }

    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        startTime.set(System.currentTimeMillis());

        // 接收到请求，记录请求内容
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 记录下请求内容
        Enumeration<String> enums = request.getParameterNames();
        List<String> params = new ArrayList();
        while (enums.hasMoreElements()) {
            String paraName = enums.nextElement();
            String param = paraName + ":" + request.getParameter(paraName);
            params.add(param);
        }

        logger.info("URL: {}, Method: {}, Params: {}, IP: {} ", request.getRequestURL().toString(), request.getMethod(), params.toString(), NetworkUtils.getClientIp(request));
        logger.info("Class Method: {}, Args: {} ", joinPoint.getSignature().getDeclaringTypeName() + "."  + joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(returning = "ret", pointcut = "webLog()")
    public void doAfterReturning(Object ret) throws Throwable {
        // 处理完请求，返回内容
        logger.info("RESPONSE: {} " , ret);
        logger.info("SPEND TIME: {} ms", System.currentTimeMillis() - startTime.get());
    }
}
