package com.e.caseservice.utils;

import java.util.Random;

/**
 * @author wb-dl321273
 * @date 2020/4/7 17:09
 * @description 接口负责研发：
 * 接口文档：
 * 接口说明(业务介绍，介绍重要参数的用途)：
 */
public class GenerateRandomString {

    public static String RandomCharString(int length) {
        Random randGen = null;
        String source = "A1aB2b3C4c5D6d7E8eF9fG0gHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        char[] numbersAndLetters = source.toCharArray();
        ;
        int len = 26 - 1;
        if (length < 1) {
            return null;
        }
        if (randGen == null) {
            randGen = new Random();
        }
        char[] randBuffer = new char[length];
        for (int i = 0; i < randBuffer.length; i++) {
            randBuffer[i] = numbersAndLetters[randGen.nextInt(len)];
        }
        return new String(randBuffer);
    }
}
