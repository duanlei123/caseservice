package com.e.caseservice.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;

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

    public static File checkDirExist(String directoryPath) {
        File file = new File(directoryPath);
        if (!file.exists()) {
            file.mkdirs();
            file.mkdir();
        }
        return file;
    }

    public static String pathAppend(final String sSrcPath, final String sNewFiled) {

        String sTmpSrcPath = sSrcPath;
        if (sTmpSrcPath.lastIndexOf(File.separator) != (sTmpSrcPath.length() - 1))
            sTmpSrcPath += File.separator;
        sTmpSrcPath += sNewFiled;

        return sTmpSrcPath;
    }

    /**
     * md5加密(ITS)
     *
     * @param str
     * @param charSet
     * @return
     */
    public synchronized static String getMD5Str(String str, String charSet) {
        //md5加密
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.reset();
            if (charSet == null) {
                messageDigest.update(str.getBytes());
            } else {
                messageDigest.update(str.getBytes(charSet));
            }
        } catch (NoSuchAlgorithmException e) {
            //log.error("md5 error:"+e.getMessage(),e);
        } catch (UnsupportedEncodingException e) {
            //log.error("md5 error:"+e.getMessage(),e);
        }

        byte[] byteArray = messageDigest.digest();
        StringBuffer md5StrBuff = new StringBuffer();
        for (int i = 0; i < byteArray.length; i++) {
            if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
                md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
            else
                md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
        }
        return md5StrBuff.toString();
    }


    public static String getTime() {

        StringBuilder sTime = new StringBuilder("");
        Calendar c = Calendar.getInstance();
        sTime.append(c.get(Calendar.YEAR));
        sTime.append(c.get(Calendar.MONTH) + 1);
        sTime.append(c.get(Calendar.DATE));
        sTime.append(c.get(Calendar.HOUR_OF_DAY));
        sTime.append(c.get(Calendar.MINUTE));
        sTime.append(c.get(Calendar.SECOND));
        return sTime.toString();
    }
}
