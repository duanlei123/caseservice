package com.e.caseservice.utils;

import com.e.caseservice.CaseserviceApplication;
import java.util.concurrent.*;
import java.util.logging.Logger;

/**
 * 线程池
 */
public class ThreadHandle {

    private static final Logger LOGGER = Logger.getLogger(ThreadHandle.class.getName());


    // 线程池
    private static ExecutorService executor = null;

    public static void startThreadExecutor() {
        executor = Executors.newFixedThreadPool(CaseserviceApplication.getnMaxMergeThread());
    }

    public static void runThread(Runnable runnable) {
        if (executor == null) {
            startThreadExecutor();
        }
        executor.execute(runnable);

    }

    public static <T> Future<T> callThread(Callable<T> task) {

        if (executor == null) {
            startThreadExecutor();
        }
        return executor.submit(task);
    }

    public static Future<?> callThread(Runnable runnable) {

        if (executor == null) {
            startThreadExecutor();
        }
        return executor.submit(runnable);
    }

    public static ThreadPoolExecutor getThreadExecutor() {
        return (ThreadPoolExecutor) executor;
    }
}
