package com.e.caseservice.utils;

import com.e.caseservice.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.net.ssl.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.X509Certificate;
import java.util.Map;

public class HttpRequest {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpRequest.class);

    private static final int CONNECT_TIMEOUT = 3000;//3秒
    private static final int READ_TIMEOUT = 80000;//80秒

    private HttpRequest() {
        //使该类不会被实例化
    }

    /**
     * Do GET request
     *
     * @param url
     * @return
     * @throws Exception
     * @throws IOException
     */
    public static InputStream doGetInputStream(String url, Map<String, Object> urlParameterMap) {

        try {
            HttpURLConnection httpURLConnection = getConnection(url, "GET", urlParameterMap);
            if (httpURLConnection.getResponseCode() >= 300) {
                LOGGER.error("http error code:" + httpURLConnection.getResponseCode());
                LOGGER.error(httpURLConnection.getResponseMessage());
                return null;
            } else {
                return httpURLConnection.getInputStream();
            }
        } catch (IOException e) {
            LOGGER.error("发送" + url + "发生异常", e);
            return null;
        }

    }

    public static String doGet(String url, Map<String, Object> urlParameterMap) {

        return inputStreamToString(doGetInputStream(url, urlParameterMap));
    }


    /**
     * Do POST request
     *
     * @param url
     * @param urlParameterMap
     * @param jsonBody
     * @return
     * @throws Exception
     */
    public static String doPost(String url, Map<String, Object> urlParameterMap, String jsonBody) {
        try {
            HttpURLConnection httpURLConnection = getConnection(url, "POST", urlParameterMap);
            if (null != jsonBody) {
                httpURLConnection.setDoOutput(true);
                httpURLConnection.setRequestProperty("Content-Type", "application/json; CHARSET=UTF-8");
                httpURLConnection.setRequestProperty("Content-Length", String.valueOf(jsonBody.length()));
                OutputStream outputStream = null;
                OutputStreamWriter outputStreamWriter = null;
                try {
                    outputStream = httpURLConnection.getOutputStream();
                    outputStreamWriter = new OutputStreamWriter(outputStream, Constants.CHARSET_UTF_8);
                    outputStreamWriter.write(jsonBody);
                    outputStreamWriter.flush();
                } finally {
                    if (outputStreamWriter != null) {
                        outputStreamWriter.close();
                    }
                    if (outputStream != null) {
                        outputStream.close();
                    }
                }
            }
            if (httpURLConnection.getResponseCode() < 300) {
                return inputStreamToString(httpURLConnection.getInputStream());
            }
        } catch (Exception e) {
            LOGGER.error("发送" + url + "发生异常", e);
        }
        return "";
    }

    private static String inputStreamToString(InputStream inputStream) {
        try {
            if (null == inputStream) {
                return "";
            }
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int i;
            while ((i = inputStream.read()) != -1) {
                baos.write(i);
            }
            return baos.toString(Constants.CHARSET_UTF_8);
        } catch (Exception e) {
            LOGGER.error("InputStream转为字符串异常", e);
            return "";
        }
    }

    // Create an anonymous class to trust all certificates.
    private static void ignoreCertificateErrors() {
        TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {
                    @Override
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }

                    @Override
                    public void checkClientTrusted(
                            X509Certificate[] certs, String authType) {
                        // Ignore it
                    }

                    @Override
                    public void checkServerTrusted(
                            X509Certificate[] certs, String authType) {
                        // Ignore it
                    }
                }
        };
        // Create an class to trust all hosts
        HostnameVerifier nullVerifier = new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };

        try {
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier(nullVerifier);
        } catch (Exception e) {
            LOGGER.error("处理https协议异常", e);
        }
    }

    private static HttpURLConnection getConnection(String url, String method, Map<String, Object> urlParameterMap) throws IOException {

        if (url.toLowerCase().contains("https://")) {
            ignoreCertificateErrors();
        }
        String urlWithPara = url;
        if (null != urlParameterMap) {
            urlWithPara = url + "?" + buildQuery(urlParameterMap);
        }
        URL currUrl = new URL(urlWithPara);

        HttpURLConnection conn = (HttpURLConnection) currUrl.openConnection();
        conn.setConnectTimeout(CONNECT_TIMEOUT);
        conn.setReadTimeout(READ_TIMEOUT);

        //防止屏蔽程序抓取而返回403错误
        conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        //设置请求属性
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
        conn.setRequestProperty("Charset", "UTF-8");
        conn.setRequestMethod(method);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        return conn;
    }

    /**
     * 将map集合的键值对转化成：key1=value1&key2=value2 的形式
     *
     * @param parameterMap 需要转化的键值对集合
     * @return 字符串
     */
    private static String buildQuery(Map<String, Object> parameterMap) {
        if (parameterMap == null || parameterMap.isEmpty()) {
            return null;
        }

        StringBuilder parameterBuilder = new StringBuilder();

        for (Map.Entry<String, Object> entry : parameterMap.entrySet()) {
            String key = "";
            String value = "";
            if (entry.getKey() != null && entry.getValue() != null) {
                key = Tools.urlEncode(entry.getKey());
                value = Tools.urlEncode(entry.getValue());
            }

            if (!key.isEmpty() && !value.isEmpty()) {
                parameterBuilder.append(key).append("=").append(value);
            }
            parameterBuilder.append("&");
        }
        return parameterBuilder.substring(0, parameterBuilder.length() - 1);
    }

}