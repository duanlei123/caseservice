package com.e.caseservice.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class MajorKey {
    private static final Logger LOGGER = LoggerFactory.getLogger(MajorKey.class);
    private static final long ONE_STEP = 10;
    private static final Lock LOCK = new ReentrantLock();
    private static long lastTime = System.currentTimeMillis();
    private static short lastCount = 0;

    @SuppressWarnings("finally")
    public static String getId() {
        LOCK.lock();
        int count;
        try {
            if (lastCount == ONE_STEP) {
                boolean done = false;
                while (!done) {
                    long now = System.currentTimeMillis();
                    if (now == lastTime) {
                        try {
                            Thread.currentThread();
                            Thread.sleep(1);
                        } catch (InterruptedException e) {
                            LOGGER.error("进程等待异常", e);
                        }
                    } else {
                        lastTime = now;
                        lastCount = 0;
                        done = true;
                    }
                }
            }
            count = lastCount++;
        } finally {
            LOCK.unlock();
        }
        return lastTime + "" + String.format("%03d", count);
    }
}
