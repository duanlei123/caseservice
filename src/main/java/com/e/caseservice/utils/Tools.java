package com.e.caseservice.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class Tools {

    private static final Logger LOGGER = LoggerFactory.getLogger(Tools.class);
    private static final String CHARSET = "utf-8";

    private Tools() {
        //使该类不会被实例化
    }

    /**
     * @param mss 要转换的毫秒数
     * @return 该毫秒数转换为  minutes * seconds 后的格式
     */
    public static String getDistanceTime(long mss) {
        long minutes = mss / (1000 * 60);
        long seconds = (mss % (1000 * 60)) / 1000;
        long milliSecond = mss % 1000;
        String strMilliSeconds = " milliSeconds";
        String strSeconds = " seconds ";
        String strMinutes = " minutes ";

        if (minutes == 0 && seconds == 0) {
            return milliSecond + strMilliSeconds;
        } else if (minutes == 0) {
            return seconds + strSeconds + milliSecond + strMilliSeconds;
        } else {
            return minutes + strMinutes + seconds + strSeconds + milliSecond + strMilliSeconds;
        }

    }

    static String urlEncode(Object o) {
        try {
            return URLEncoder.encode(String.valueOf(o), CHARSET);
        } catch (UnsupportedEncodingException e) {
            LOGGER.error("对" + o + "进行urlEncode编码异常", e);
            return "";
        }
    }
}
