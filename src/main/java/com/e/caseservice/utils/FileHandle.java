package com.e.caseservice.utils;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;
import java.io.*;
import java.nio.channels.FileChannel;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class FileHandle {

    protected static final org.slf4j.Logger logger = LoggerFactory.getLogger(FileHandle.class);

    public static long getFileByte(String sFilePath) {
        File file = new File(sFilePath);

        if (!file.exists()) {
            return 0;
        }

        return file.length();
    }

    public static boolean createFile(String destFileName) {

        File file = new File(destFileName);
        if (file.exists()) {
            return false;
        }
        if (destFileName.endsWith(File.separator)) {
            return false;
        }
        // 判断目标文件所在的目录是否存在
        if (!file.getParentFile().exists()) {
            // 如果目标文件所在的目录不存在，则创建父目录
            if (!file.getParentFile().mkdirs()) {
                return false;
            }
        }
        // 创建目标文件
        try {
            return file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean removeFile(String destFileName) {
        File file = new File(destFileName);
        if (!file.exists()) {
            //System.out.println("创建单个文件" + destFileName + "失败，目标文件已存在！");
            return false;
        }
        // 目录
        if (destFileName.endsWith(File.separator)) {
            //System.out.println("创建单个文件" + destFileName + "失败，目标文件不能为目录！");
            return false;
        }
        return file.delete();
    }

    public static boolean removeDir(String destFileName) {
        try {
            FileUtils.deleteDirectory(new File(destFileName));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }


    public static boolean copyFiles_channel(String sSrcDir, String sTargetDir, String... fileName) {
        Tools.checkDirExist(sSrcDir);
        Tools.checkDirExist(sTargetDir);
        if (fileName.length < 0) {
            return true;
        }
        boolean ret = true;
        for (String oneFile : fileName) {
            if (!FileHandle.copyFile_channel(
                    Tools.pathAppend(sSrcDir, oneFile),
                    Tools.pathAppend(sTargetDir, oneFile)
            )) {
                ret = false;
            }
        }
        return ret;
    }

    public static boolean copyFile_channel(String sSrcFile, String sTargetFile) {

        FileInputStream fi = null;
        FileOutputStream fo = null;
        FileChannel in = null;
        FileChannel out = null;

        File sourceFile;
        File targetFile;
        try {

            sourceFile = new File(sSrcFile);
            createFile(sTargetFile);
            targetFile = new File(sTargetFile);
            fi = new FileInputStream(sourceFile);
            fo = new FileOutputStream(targetFile);
            in = fi.getChannel();// 得到对应的文件通道
            out = fo.getChannel();// 得到对应的文件通道
            in.transferTo(0, in.size(), out);// 连接两个通道，并且从in通道读取，然后写入out通道

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        } finally {
            safeClose(fi);
            safeClose(in);
            safeClose(fo);
            safeClose(out);
        }
        return true;
    }

    static public void safeClose(Closeable closeable) {
        try {
            if (closeable != null) {
                closeable.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static boolean unzipFile(File file) {
        ZipInputStream Zin = null;
        BufferedInputStream Bin = null;
        FileOutputStream out = null;
        BufferedOutputStream Bout = null;
        try {
            Zin = new ZipInputStream(new FileInputStream(file));//输入源zip路径
            Bin = new BufferedInputStream(Zin);
            String Parent = file.getParent();
            File Fout = null;
            ZipEntry entry;
            try {
                while ((entry = Zin.getNextEntry()) != null && !entry.isDirectory()) {
                    Fout = new File(Parent, entry.getName());
                    if (!Fout.exists()) {
                        (new File(Fout.getParent())).mkdirs();
                    }
                    out = new FileOutputStream(Fout);
                    Bout = new BufferedOutputStream(out);
                    int b;
                    while ((b = Bin.read()) != -1) {
                        Bout.write(b);
                    }
                    Bout.close();
                    Bout = null;
                    out.close();
                    out = null;
                }
                Bin.close();
                Bin = null;
                Zin.close();
                Zin = null;
                return true;
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            safeClose(Zin);
            safeClose(Bin);
            safeClose(out);
            safeClose(Bout);
        }
        return false;
    }


    /**
     * 压缩整个文件夹中的所有文件，生成指定名称的zip压缩包
     *
     * @param filepath 文件所在目录
     * @param zippath  压缩后zip文件名称
     * @param dirFlag  zip文件中第一层是否包含一级目录，true包含；false没有
     *                 2015年6月9日
     */
    public static void zipDirectory(String filepath, String zippath, boolean dirFlag) throws IOException {
        File file = new File(filepath);// 要被压缩的文件夹
        File zipFile = new File(zippath);
        FileOutputStream outputStream = null;
        ZipOutputStream zipOut = null;
        try {
            outputStream = new FileOutputStream(zipFile);
            zipOut = new ZipOutputStream(outputStream);
            if (file.isDirectory()) {
                File[] files = file.listFiles();
                if (files == null) {
                    return;
                }
                for (File fileSec : files) {
                    if (dirFlag) {
                        recursionZip(zipOut, fileSec, file.getName() + File.separator);
                    } else {
                        recursionZip(zipOut, fileSec, "");
                    }
                }
            }
        } catch (Exception e) {
            throw e;
        } finally {
            safeClose(zipOut);
            safeClose(outputStream);
        }
    }

    private static void recursionZip(ZipOutputStream zipOut, File file, String baseDir) throws IOException {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            for (File fileSec : files) {
                recursionZip(zipOut, fileSec, baseDir + file.getName() + File.separator);
            }
        } else {
            byte[] buf = new byte[1024];
            InputStream input = null;
            try {
                input = new FileInputStream(file);
                zipOut.putNextEntry(new ZipEntry(baseDir + file.getName()));
                int len;
                while ((len = input.read(buf)) != -1) {
                    zipOut.write(buf, 0, len);
                }
            } catch (Exception e) {
                throw e;
            } finally {
                safeClose(input);
            }

        }
    }

    /**
     * 复制文件
     */
    public static boolean copyFile(String sSrcFile, String sTargetFile) {

        BufferedInputStream inBuff = null;
        BufferedOutputStream outBuff = null;
        File sourceFile;
        File targetFile;
        try {

            // 若源文件不存在，直接返回false
            sourceFile = new File(sSrcFile);
            if (!sourceFile.exists()) {
                //System.out.println("文件:" + sSrcFile + "不存在，拷贝失败");
                return false;
            }
            // 若存在，创建新文件
            targetFile = new File(sTargetFile);
            // 新建文件输入流并对它进行缓冲
            inBuff = new BufferedInputStream(new FileInputStream(sourceFile));
            // 新建文件输出流并对它进行缓冲
            outBuff = new BufferedOutputStream(new FileOutputStream(targetFile));
            // 缓冲数组
            byte[] b = new byte[1024 * 4];
            int len;
            while ((len = inBuff.read(b)) != -1) {
                outBuff.write(b, 0, len);
            }
            // 刷新此缓冲的输出流
            outBuff.flush();
        } catch (Exception e) {
            //System.out.println("copyFile failed");
            e.printStackTrace();
            return false;
        } finally {
            safeClose(inBuff);
            safeClose(outBuff);
        }

        return true;
    }

    // save string to file
    public static boolean saveFile(String sFilePath, String sContent) {
        return saveFile(sFilePath, sContent, null);
    }

    // save string to file
    public static boolean saveFile(String sFilePath, String sContent, String charset) {
        logger.info("save file, filePath: " + sFilePath);
        try {
            FileUtils.writeStringToFile(new File(sFilePath), sContent, charset);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    //文本读取指定文件的内容
    @SuppressWarnings("resource")
    public static String loadFile(String sFilePath) {
        BufferedReader br = null;
        try {

            String sContent = "";

            br = new BufferedReader(new FileReader(sFilePath));
            String data = br.readLine();// 一次读入一行，直到读入null为文件结束
            if (data != null) {
                sContent += data;
                sContent += "\r\n";
            }
            while (data != null) {
                //System.out.println(data);

                data = br.readLine();
                if (data != null) {
                    sContent += data;
                    sContent += "\r\n";
                }
            }

            sContent.trim();

            return sContent;

        } catch (IOException e) {

            return "";
        } finally {
            try {
                if (br != null) br.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取子目录下文件名列表
     *
     * @param srcDir   源文件夹
     * @param fileName 文件名
     * @param bPrefix  是否文件名为后缀 （不包含'.'）
     * @return 文件列表
     */
    public static File[] getFileInDirOrTrueSub(File srcDir, String fileName, boolean bPrefix) {

        File[] fileArray = srcDir.listFiles(new FilenameFilter() {
            String fileNameC = fileName.toLowerCase();

            public boolean accept(File dir, String name) {
                String file = name.toLowerCase();
                if (bPrefix) {
                    return file.endsWith("." + fileNameC);
                } else {
                    return file.equals(fileNameC);
                }
            }
        });
        if (fileArray == null || fileArray.length <= 0) {
            File[] fileDirArray = srcDir.listFiles(new FilenameFilter() {
                public boolean accept(File dir, String name) {
                    return new File(Tools.pathAppend(dir.getPath(), name)).isDirectory();
                }
            });
            if (fileDirArray == null || fileDirArray.length != 1) {
                // may be more than one sub
                return null;
            }
            return getFileInDirOrTrueSub(fileDirArray[0], fileName, bPrefix);
        }
        return fileArray;
    }

    /**
     * 获取子目录下文件名列表
     *
     * @param srcDir   源文件夹
     * @param fileName 文件名
     * @param bPrefix  是否文件名为后缀 （不包含'.'）
     * @return 文件列表
     */
    public static File[] getFileInDirOrTrueSub(File srcDir, String subDir, String fileName, boolean bPrefix) {

        File junit = new File(Tools.pathAppend(srcDir.getAbsolutePath(), subDir));
        if (!junit.exists() || !junit.isDirectory()) {
            return null;
        }
        File[] findFilesArray = FileHandle.getFileInDirOrTrueSub(junit, fileName, bPrefix);
        if (findFilesArray == null || findFilesArray.length <= 0) {
            return null;
        }
        return findFilesArray;
    }

    public static String getContent(String sFilePath) {
        return getContent(sFilePath, null);
    }

    // 原样读取指定文件的内容
    public static String getContent(String sFilePath, String charset) {
        String str = "";
        try {
            str = FileUtils.readFileToString(new File(sFilePath), charset);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return str;
    }

    /**
     * 从指定位置读取指定长度的文件内容
     *
     * @param sFilePath 文件路径
     * @param from      读取初始位置
     * @param len       读取长度（字节）
     * @param charSet   编码格式
     * @return 指定内容
     */
    public static String getFixedLenContent(String sFilePath, int from, int len, String charSet) {
        RandomAccessFile raf = null;
        byte[] byteArr = null;
        String sContent = null;
        int i = 0;
        try {
            // 定义读取的字节数组
            byteArr = new byte[len];
            // 只读
            raf = new RandomAccessFile(sFilePath, "r");
            // 移动指针至指定位置
            raf.seek(from);
            for (i = 0; i < len; i++) {
                byteArr[i] = raf.readByte();
            }
            sContent = new String(byteArr, charSet);
        } catch (FileNotFoundException e) {
            logger.error("getFixedLenContent failed: sFilePath = " + sFilePath, e.getMessage());
        } catch (IOException e) {
            // 读取超出文件末尾
            if (i != 0) {
                // 若指定的第一个字节非文件末尾
                try {
                    sContent = new String(byteArr, 0, i, charSet);
                } catch (UnsupportedEncodingException e1) {
                    logger.error("getFixedLenContent failed: sFilePath = " + sFilePath, e.getMessage());
                }
            }
        } finally {
            try {
                if (null != raf) {
                    raf.close();
                }
            } catch (IOException e) {
                logger.error("getFixedLenContent failed: sFilePath = " + sFilePath, e.getMessage());
            }
        }
        return sContent;
    }

    /**
     * 生成指定文件夹下所有文件的MD5校验码
     *
     * @param sFolderPath
     * @return
     */
    public static String getFileMd5InFolder(String sFolderPath) {

        StringBuilder sHwMd5Content = new StringBuilder();

        File file = new File(sFolderPath);

        if (file.isDirectory()) {
            String[] filelist = file.list();
            for (int i = 0; i < filelist.length; i++) {

                File readfile = new File(sFolderPath + File.separator + filelist[i]);
                if (!readfile.isDirectory()) {
                    String sTmpMd5 = Tools.getMD5Str(FileHandle.loadFile(readfile.getPath()), null) + "\r\n";
                    sHwMd5Content.append(readfile.getName() + "\t\t");
                    sHwMd5Content.append(sTmpMd5);
                } else {
                    sHwMd5Content.append(getFileMd5InFolder(readfile.getPath()));
                }
            }
        }

        return sHwMd5Content.toString();
    }

    /**
     * 获取指定类所在路径
     */
    public static String getClassPath(Class cls) {
        // 检查用户传入的参数是否为空
        if (cls == null)
            throw new IllegalArgumentException("参数不能为空！");
        ClassLoader loader = cls.getClassLoader();
        // 获得类的全名，包括包名
        String clsName = cls.getName() + ".class";
        // 获得传入参数所在的包
        Package pack = cls.getPackage();
        String path = "";
        // 如果不是匿名包，将包名转化为路径
        if (pack != null) {
            String packName = pack.getName();
            // 此处简单判定是否是Java基础类库，防止用户传入JDK内置的类库
            if (packName.startsWith("java.") || packName.startsWith("javax."))
                throw new IllegalArgumentException("不要传送系统类！");
            // 在类的名称中，去掉包名的部分，获得类的文件名
            clsName = clsName.substring(packName.length() + 1);
            // 判定包名是否是简单包名，如果是，则直接将包名转换为路径，
            if (packName.indexOf(".") < 0)
                path = packName + "/";
            else {// 否则按照包名的组成部分，将包名转换为路径
                int start = 0, end = 0;
                end = packName.indexOf(".");
                while (end != -1) {
                    path = path + packName.substring(start, end) + "/";
                    start = end + 1;
                    end = packName.indexOf(".", start);
                }
                path = path + packName.substring(start) + "/";
            }
        }
        // 调用ClassLoader的getResource方法，传入包含路径信息的类文件名
        java.net.URL url = loader.getResource(path + clsName);
        // 从URL对象中获取路径信息
        String realPath = url.getPath();
        // 去掉路径信息中的协议名"file:"
        int pos = realPath.indexOf("file:");
        if (pos > -1)
            realPath = realPath.substring(pos + 5);
        // 去掉路径信息最后包含类文件信息的部分，得到类所在的路径
        pos = realPath.indexOf(path + clsName);
        realPath = realPath.substring(0, pos - 1);
        // 如果类文件被打包到JAR等文件中时，去掉对应的JAR等打包文件名
        if (realPath.endsWith("!"))
            realPath = realPath.substring(0, realPath.lastIndexOf("/"));
        /*------------------------------------------------------------
         ClassLoader的getResource方法使用了utf-8对路径信息进行了编码，当路径
		  中存在中文和空格时，他会对这些字符进行转换，这样，得到的往往不是我们想要 
		  的真实路径，在此，调用了URLDecoder的decode方法进行解码，以便得到原始的 
		  中文及空格路径 
		-------------------------------------------------------------*/
        try {
            realPath = java.net.URLDecoder.decode(realPath, "utf-8");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return realPath;
    }// getAppPath定义结束

    public static boolean isFileExist(String sFilePath) {
        //LOGGER.info("into file exist");
        // 若源文件不存在，直接返回false
        File sourceFile = new File(sFilePath);
        return sourceFile.exists();
    }

    public static boolean rename(String src, String dest) {
        if (StringUtils.isEmpty(src) || StringUtils.isEmpty(dest)) {
            return false;
        }
        if (!isFileExist(src)) {
            logger.error("rename fail source file not exist!");
            return false;
        }
        if (isFileExist(dest)) {
            logger.error("rename fail dest file exist!");
            return false;
        }
        return new File(src).renameTo(new File(dest));
    }
}
