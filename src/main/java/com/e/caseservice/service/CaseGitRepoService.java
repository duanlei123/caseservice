package com.e.caseservice.service;

import com.e.caseservice.common.Constants;
import com.e.caseservice.dto.*;
import com.e.caseservice.utils.JavaParseTools;
import com.e.caseservice.utils.MajorKey;
import com.e.caseservice.utils.OrderedProperties;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.body.*;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.imports.ImportDeclaration;
import com.github.javaparser.ast.type.ClassOrInterfaceType;
import com.github.javaparser.ast.type.Type;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.*;


public class CaseGitRepoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CaseGitRepoService.class);

    private Map<String, DataProviderClassDto> dataProviderClassDtoMap = new HashMap<>();
    private Map<String, Expression> constantVariableMap = new HashMap<>();
    private List<CaseClassDto> caseClassDtos = new ArrayList<>();
    private JSONArray confProperties = new JSONArray();
    private int totalCaseFileNum = 0;
    private int totalDataProviderFileNum = 0;
    private int insertModuleNum = 0;
    private int insertCasesNum = 0;
    private int updateCasesNum = 0;
    private String projectRootDir;
    private String gitProjectName;
    private String branchName;
    private String gitHttpUrl;
    private String confFileName;
    private String testSuiteVersion = "";
    private String caseRootPackage;
    private int testSuiteId;
    private Map<String, String> existModulesInfoMap;
    private Map<String, String> existCasesInfoMap;
    private Set<AutoModuleInfoDto> insertModuleInfoDtoSet = new HashSet<>();
    private Set<AutoCaseInfoDto> insertAutoCaseSet = new HashSet<>();
    private List<String> updateCaseIds = new ArrayList<>();

    public String getConfFileName() {
        return confFileName;
    }

    public void setConfFileName(String confFileName) {
        this.confFileName = confFileName;
    }

    String getProjectRootDir() {
        return projectRootDir;
    }

    public void setProjectRootDir(String projectRootDir) {
        this.projectRootDir = projectRootDir;
    }

    public String getTestSuiteVersion() {
        return testSuiteVersion;
    }

    public void setTestSuiteVersion(String testSuiteVersion) {
        this.testSuiteVersion = testSuiteVersion;
    }

    /**
     * 访问git 测试套工程
     */
    boolean init(URL httpUrl, String branchName, String savePath, String confFileName, String username, String password,
                 Map<String, String> existModulesInfoMap, Map<String, String> existCasesInfoMap, int testSuiteId, String caseRootPackage) {
        this.confFileName = confFileName;
        this.caseRootPackage = caseRootPackage;
        this.branchName = branchName;

        //下载指定repo代码
        GitService gitService = new GitService();
        if (!gitService.init(httpUrl, branchName, savePath, username, password)) {
            LOGGER.error("GIT代码初始化失败!");
            return false;
        }
        if (!gitService.downloadBranchCode()) {
            LOGGER.error("代码下载失败!");
            return false;
        }
        // 获取git http URL
        this.gitHttpUrl = gitService.getHttpURL();
        // 获取 工程名
        this.gitProjectName = gitService.getGitProjectName();
        //得到项目的根路径
        File projectRootDirFile = getProjectRootDir(savePath, gitProjectName);
        if (projectRootDirFile == null) {
            LOGGER.error("下载成功, 查找下载后用例文件夹失败!");
            return false;
        } else {
            this.projectRootDir = projectRootDirFile.getAbsolutePath();
            this.existModulesInfoMap = existModulesInfoMap;
            this.existCasesInfoMap = existCasesInfoMap;
            this.testSuiteId = testSuiteId;
            //历工程的文件夹，找到java文件进行处理，遇到用例所在的根目录单独处理
            travelRootFolder(projectRootDirFile);
            return true;
        }
    }

    /**
     * 获取项目根路径文件夹名称
     * @param path
     * @param gitProjectName
     * @return
     */
    private File getProjectRootDir(String path, String gitProjectName) {
        try {
            File baseDir = new File(path);
            File[] files = baseDir.listFiles();
            File projectRootDirFile = null;
            if (files != null) {
                for (File file : files) {
                    //分析java文件
                    if (file.isDirectory() && file.getAbsolutePath().toLowerCase().contains(gitProjectName.toLowerCase().substring(gitProjectName.indexOf("/") + 1))) {
                        LOGGER.info("获取项目文件夹名称{}", file.getAbsolutePath());
                        projectRootDirFile = file;
                        break;
                    }
                }
            }
            return projectRootDirFile;
        } catch (Exception e) {
            return null;
        }
    }


    /**
     * 解析 .jave 中用例 , 注意根目录下文件 @TEST 不处理
     * @param file
     * @param parentID
     * @param moduleType
     */
    private void parseJavaFile(File file, String parentID, int moduleType) {
        LOGGER.debug("处理java文件{}:", file.getAbsolutePath());
        try {
            CompilationUnit compilationUnit = JavaParser.parse(file, Charset.forName(Constants.CHARSET_UTF_8));
            NodeList<TypeDeclaration<?>> typeDeclarations = compilationUnit.getTypes();
            String javaFilePackageName = compilationUnit.getPackage().isPresent() ? compilationUnit.getPackage().get().getPackageName() : "";
            NodeList<ImportDeclaration> javaFileImports = compilationUnit.getImports();
            if (typeDeclarations.size() > 1) {
                LOGGER.info(file.getAbsolutePath() + "中包含多个class");
            }
            //处理单个java文件中所有class
            for (TypeDeclaration typeDeclaration : typeDeclarations) {
                if (typeDeclaration instanceof ClassOrInterfaceDeclaration) {
                    parseJavaFileClass(javaFilePackageName, javaFileImports, (ClassOrInterfaceDeclaration) typeDeclaration, file.getAbsolutePath(), parentID, moduleType);
                }
            }
        } catch (Exception e) {
            LOGGER.error("处理文件:" + file.getAbsolutePath() + "失败", e);
        }
    }

    //判断java class是case还是dataProvider
    private void parseJavaFileClass(String javaFilePackageName, NodeList<ImportDeclaration> javaFileImports, ClassOrInterfaceDeclaration classOrInterfaceDeclaration, String classAbsolutePath, String parentID, int moduleType) {
        List<MethodDeclaration> methods = classOrInterfaceDeclaration.getMethods();
        String simpleClassName = classOrInterfaceDeclaration.getName();
        String className = javaFilePackageName.isEmpty() ? simpleClassName : javaFilePackageName + "." + simpleClassName;
        //提取文件中所有的常量加入map中，用于用例写入数据库时解析一些变量的值
        parseConstantsField(classOrInterfaceDeclaration.getFields(), className);
        CaseClassDto caseClassDto = null;
        DataProviderClassDto dataProviderClassDto = null;

        //分析类中的每个方法的类型
        for (MethodDeclaration method : methods) {
            //判断注解类型是否是@test
            NormalAnnotationExpr caseNormalAnnotationExpr = parseMethodAnnotation(method.getAnnotations(), Constants.CASE_ANNOTATION_NAME);
            if (null != caseNormalAnnotationExpr) {
                //处理用例类文件
                String moduleId;
                if (parentID == null) {
                    LOGGER.error(className + "在用例根目录之外包含用例，忽略处理");
                    continue;
                } else {
                    moduleId = getModuleID(parentID, simpleClassName, moduleType);
                }
                if (null == caseClassDto) {
                    caseClassDto = new CaseClassDto();
                    caseClassDto.setClassName(className);
                    caseClassDto.setImports(javaFileImports);
                    caseClassDto.setSimpleClassName(simpleClassName);
                    caseClassDto.setPackageName(javaFilePackageName);
                    caseClassDto.setClassAbsolutePath(classAbsolutePath);
                    caseClassDto.setModuleID(moduleId);
                    this.caseClassDtos.add(caseClassDto);
                    this.totalCaseFileNum++;
                }
                caseClassDto.parseMethodAnn(caseNormalAnnotationExpr, method.getName());
                continue;
            }
            //判断注解类型是否是@dataProvider
            NormalAnnotationExpr dataProviderNormalAnnotationExpr = parseMethodAnnotation(method.getAnnotations(), Constants.DATA_PROVIDER_ANNOTATION_NAME);
            if (null != dataProviderNormalAnnotationExpr) {
                //处理用例数据类文件
                if (null == dataProviderClassDto) {
                    dataProviderClassDto = new DataProviderClassDto();
                    dataProviderClassDto.setImports(javaFileImports);
                    dataProviderClassDto.setClassName(className);
                    //以dataProvider所在class的name为key，对应的dto为value存入map中，用于用例写入数据库时解析其对应的dataProvider
                    this.dataProviderClassDtoMap.put(className, dataProviderClassDto);
                    this.totalDataProviderFileNum++;
                }
                if (method.getBody().isPresent()) {
                    //解析dataProvider中的方法返回值
                    dataProviderClassDto.parseDataProviderMethod(dataProviderNormalAnnotationExpr, method.getBody().get().getStmts());
                }
            }
        }
    }

    List<CaseClassDto> getCaseClassDtos() {
        return caseClassDtos;
    }

    public void setCaseClassDtos(List<CaseClassDto> caseClassDtos) {
        this.caseClassDtos = caseClassDtos;
    }

    /**
     * 分析方法中所有的注解，如果注解中包含@test和@dataProvider则返回，否则返回空
     * @param anns
     * @param annName
     * @return
     */
    private NormalAnnotationExpr parseMethodAnnotation(NodeList<AnnotationExpr> anns, String annName) {
        NormalAnnotationExpr normalAnnotationExpr = null;
        for (AnnotationExpr ann : anns) {
            if (ann.getName().getName().equalsIgnoreCase(annName) && ann instanceof NormalAnnotationExpr) {
                normalAnnotationExpr = (NormalAnnotationExpr) ann;
            }
        }
        return normalAnnotationExpr;
    }

    /**
     * 遍历工程的文件夹，找到java文件进行处理，遇到用例所在的根目录单独处理
     * @param baseDir
     */
    private void travelRootFolder(File baseDir) {
        //获取文件夹下所有文件
        File[] files = baseDir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            // 判断是否为文件夹-- 是
            if (file.isDirectory()) {
                // 判断是否为根目录
                if (file.getName().equals(this.caseRootPackage)) {
                    // 处理头文件夹
                    travelCaseFolder(file, 1, Constants.TREE_ROOT_NODE);
                } else {
                    // 处理文件夹, 递归处理
                    travelRootFolder(file);
                }
            } else {
                // 为文件
                String strFileName = file.getName();
                if (strFileName.length() > 5 && strFileName.lastIndexOf(".java") == (strFileName.length() - 5)) {
                    //非用例根目录下的用例class即使存在@test也不会处理
                    parseJavaFile(file, null, 0);
                }
                if ((this.confFileName != null) && strFileName.equals(this.confFileName)) {
                    // 处理配置文件
                    parseConfFile(file);
                }
            }
        }
    }

    /**
     * 遍历用例所在的package，处理java文件同时生成树状结构
     * @param baseDir
     * @param moduleType
     * @param parentID
     */
    private void travelCaseFolder(File baseDir, int moduleType, String parentID) {

        File[] files = baseDir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    travelCaseFolder(file, moduleType + 1, getModuleID(parentID, file.getName(), moduleType));
                } else {
                    String strFileName = file.getName();
                    if (strFileName.length() > 5 && strFileName.lastIndexOf(".java") == (strFileName.length() - 5)) {
                        parseJavaFile(file, parentID, moduleType);
                    }

                }
            }
        }
    }

    /**
     * 根据parentID+name查询数据库是否存在，如果存在则直接返回则module id，否则新生成一个模块
     *
     * @param parentID
     * @param folderName
     * @param moduleType
     * @return
     */

    private String getModuleID(String parentID, String folderName, int moduleType) {
        String moduleId = this.existModulesInfoMap.get(parentID + folderName);
        if (moduleId == null) {
            moduleId = MajorKey.getId();
            this.existModulesInfoMap.put(parentID + folderName, moduleId);
            this.insertModuleNum++;
        }

        //将模块新增的和更新的放在一起
        AutoModuleInfoDto autoModuleInfoDto = new AutoModuleInfoDto();
        autoModuleInfoDto.setId(moduleId);
        autoModuleInfoDto.setType(moduleType);
        autoModuleInfoDto.setParentId(parentID);
        autoModuleInfoDto.setName(folderName);
        autoModuleInfoDto.setTestSuiteId(this.testSuiteId);
        this.insertModuleInfoDtoSet.add(autoModuleInfoDto);

        return moduleId;

    }

    private String getCaseID(String moduleID, String caseName) {
        String caseId = this.existCasesInfoMap.get(moduleID + caseName);

        if (caseId == null) {
            caseId = MajorKey.getId();
            this.insertCasesNum++;
        } else {
            this.updateCaseIds.add(caseId);
            this.updateCasesNum++;
        }
        return caseId;
    }

    /**
     * 解析配置文件
     * @param file
     */
    private void parseConfFile(File file) {
        LOGGER.info("处理配置文件:" + file.getAbsolutePath());
        Properties properties = new OrderedProperties();
        InputStream is = null;
        InputStreamReader isr;
        try {
            is = new FileInputStream(file);
            isr = new InputStreamReader(is, "UTF-8");
            properties.load(isr);
            Set<String> set = properties.stringPropertyNames();

            for (String key : set) {
                String propertyValue = properties.getProperty(key);
                //单独记录版本号
                if (key.equals(Constants.TEST_SUITE_VERSION)) {
                    this.testSuiteVersion = propertyValue;
                } else {
                    JSONObject jsonObject = new JSONObject();

                    if (!key.endsWith(Constants.CONF_DESCRIPTION_SUFFIX)) {
                        jsonObject.put("key", key);
                        jsonObject.put("value", propertyValue);

                        for (String keyDesc : set) {
                            if ((key + Constants.CONF_DESCRIPTION_SUFFIX).equals(keyDesc)) {
                                jsonObject.put("description", properties.getProperty(keyDesc));
                            }
                        }

                        this.confProperties.put(jsonObject);
                    }
                }
            }

        } catch (Exception e) {
            LOGGER.error("处理配置文件" + file.getAbsolutePath() + "失败", e);
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException e) {
                LOGGER.error("关闭" + file.getAbsolutePath() + "异常", e);
            }
        }


    }

    public boolean parseCase() {
        //repo中所有常量的map
        if (this.constantVariableMap.isEmpty()) {
            LOGGER.info("解析repo后得到的常量为空");
        }
        //repo中所有case所在的类文件
        if (this.caseClassDtos.isEmpty()) {
            LOGGER.error("解析repo后未发现测试用例,请检查用例根目录\"" + this.caseRootPackage + "\" 是否正确");
            return false;
        }
        //repo中所有dataProvider的map
        if (dataProviderClassDtoMap.isEmpty()) {
            LOGGER.info("用例中不存在dataProvider数据");
        }
        parseCaseByClass();
        return true;

    }

    /**
     * 解析用例中常量的值，并和dataProvider进行关联
     */

    private void parseCaseByClass() {
        for (CaseClassDto caseClassDto : this.caseClassDtos) {
            parseCaseMethod(caseClassDto);
        }
    }

    private void parseCaseMethod(CaseClassDto caseClassDto) {
        for (CaseMethodDto caseMethodDto : caseClassDto.getCaseMethodDtos()) {

            //判断该用例的状态是enable还是disable
            if (!JavaParseTools.parseBoolExpression(caseMethodDto.getEnableState(), caseClassDto.getImports(), constantVariableMap, caseClassDto.getClassName())) {
                LOGGER.info(caseMethodDto.getMethodName() + "状态为false");
                continue;
            }

            AutoCaseInfoDto autoCaseInfoDto = new AutoCaseInfoDto();
            autoCaseInfoDto.setId(getCaseID(caseClassDto.getModuleID(), caseMethodDto.getMethodName()));
            autoCaseInfoDto.setName(caseMethodDto.getMethodName());
            autoCaseInfoDto.setModuleId(caseClassDto.getModuleID());
            autoCaseInfoDto.setDescription(JavaParseTools.parseStringExpression(caseMethodDto.getDescription(), constantVariableMap, caseClassDto.getImports(), caseClassDto.getClassName()));

            JSONArray jsonArray = new JSONArray();
            //如果有dataProvider开始处理
            if (caseMethodDto.getDataProvider() == null) {
                LOGGER.debug(caseMethodDto.getMethodName() + " 用例不包括dataProvider");
            } else {
                getDataProviderArr(caseMethodDto.getDataProvider(), caseMethodDto.getDataProviderClass(), dataProviderClassDtoMap, caseClassDto.getImports(), constantVariableMap, jsonArray);
            }

            autoCaseInfoDto.setDataNum(jsonArray.length());
            autoCaseInfoDto.setData(jsonArray.toString());
            autoCaseInfoDto.setClassName(caseClassDto.getClassName());
            autoCaseInfoDto.setPackageName(caseClassDto.getPackageName());
            autoCaseInfoDto.setSimpleClassName(caseClassDto.getSimpleClassName());
            autoCaseInfoDto.setGitUrl(buildGitHttpUrl(this.projectRootDir, caseClassDto.getClassAbsolutePath(), caseMethodDto.getStartLineNum(), gitProjectName, branchName, gitHttpUrl));
            autoCaseInfoDto.setPriority(JavaParseTools.parseIntegerExpression(caseMethodDto.getPriority(), caseClassDto.getImports(), constantVariableMap, caseClassDto.getClassName()));
            autoCaseInfoDto.setGroups(JavaParseTools.parseArrayInitExpression(caseMethodDto.getGroup(), caseClassDto.getImports(), constantVariableMap, caseClassDto.getClassName()).toString());

            //将所有的用例都放入插入的list中，如果已经在数据库中存在的用例先删除处理
            this.insertAutoCaseSet.add(autoCaseInfoDto);
        }
    }

    /**
     * 将dataProvider中的object[][]转化为一个JsonArray的二维数组
     *
     * @param dataProvider
     * @param dataProviderClass
     * @param dataProviderClassDtoMap
     * @param imports
     * @param constantVariableMap
     * @return
     */

    private void getDataProviderArr(Expression dataProvider, Expression dataProviderClass, Map<String, DataProviderClassDto> dataProviderClassDtoMap, NodeList<ImportDeclaration> imports, Map<String, Expression> constantVariableMap, JSONArray jsonArray) {

        //判断dataProvider中注解的类型，目前只支持字符串表达式
        if (!(dataProvider instanceof StringLiteralExpr)) {
            return;
        }

        //判断dataProvider中class的类型是否是正确的类名
        if (!(dataProviderClass instanceof ClassExpr)) {
            return;
        }

        List<String> dataProviderClassNameList = getDataProviderClassName((ClassExpr) dataProviderClass, imports);

        if (dataProviderClassNameList.isEmpty()) {
            return;
        }
        DataProviderClassDto dataProviderClassDto = getDataProvider(dataProviderClassNameList, dataProviderClassDtoMap);

        if (null == dataProviderClassDto) {
            return;
        }
        StringLiteralExpr stringLiteralExpr = (StringLiteralExpr) dataProvider;

        parseDataProviderArr(stringLiteralExpr.getValue(), dataProviderClassDto, constantVariableMap, jsonArray);

    }

    private DataProviderClassDto getDataProvider(List<String> dataProviderClassNameList, Map<String, DataProviderClassDto> dataProviderClassDtoMap) {
        DataProviderClassDto dataProviderClassDto = null;
        for (String ataProviderClassName : dataProviderClassNameList) {
            dataProviderClassDto = dataProviderClassDtoMap.get(ataProviderClassName);
            if (dataProviderClassDto != null) {
                break;
            }
        }
        return dataProviderClassDto;
    }


    /**
     * 根据dataProvider注解中的 className+import拼出完整的className
     *
     * @param classExpr
     * @param imports
     * @return
     */

    private List<String> getDataProviderClassName(ClassExpr classExpr, NodeList<ImportDeclaration> imports) {
        Type type = classExpr.getType();
        if (!(type instanceof ClassOrInterfaceType)) {
            return new ArrayList<>();
        }

        ClassOrInterfaceType classOrInterfaceType = (ClassOrInterfaceType) type;

        List<String> dataProviderClassNameList;
        if (classOrInterfaceType.getScope().isPresent()) {
            dataProviderClassNameList = new ArrayList<>();
            dataProviderClassNameList.add(classOrInterfaceType.toString());
        } else {
            dataProviderClassNameList = JavaParseTools.getClassNameFromImport(classOrInterfaceType.toString(), imports);
        }

        return dataProviderClassNameList;

    }

    /**
     * 处理dataProvider中二维数组中的成员一维数组中的值
     *
     * @param value
     * @param dataProviderClassDto
     * @param constantVariableMap
     */

    private void parseDataProviderArr(String value, DataProviderClassDto dataProviderClassDto, Map<String, Expression> constantVariableMap, JSONArray jsonArray) {
        //根据DataProvider中的name查找对应的数据
        List<ArrayInitializerExpr> arrayInitializerExprs = dataProviderClassDto.getDataProviders().get(value);
        if (null != arrayInitializerExprs) {
            for (ArrayInitializerExpr arrExpr : arrayInitializerExprs) {
                jsonArray.put(JavaParseTools.parseArrayInitExpression(arrExpr, dataProviderClassDto.getImports(), constantVariableMap, dataProviderClassDto.getClassName()).toString());
            }
        } else {
            LOGGER.error(dataProviderClassDto.getClassName() + "中查找" + value + "的数据失败,请检查数组定位格式，目前只支持{\"a\",\"b\"}这种方法");
        }
    }

    private String buildGitHttpUrl(String projectBaseDir, String classAbsolutePath, int lineNum, String gitProjectName, String branchName, String gitHttpUrl) {
        String stringBuilder = gitProjectName + "/blob/" + branchName + "/" +
                classAbsolutePath.replace(projectBaseDir, "") + "#L" + lineNum;
        return gitHttpUrl + stringBuilder.replace("\\", "/").replace("//", "/");
    }

    JSONArray getConfProperties() {
        return confProperties;
    }

    public void setConfProperties(JSONArray confProperties) {
        this.confProperties = confProperties;
    }

    Map<String, DataProviderClassDto> getDataProviderClassDtoMap() {
        return dataProviderClassDtoMap;
    }

    public void setDataProviderClassDtoMap(Map<String, DataProviderClassDto> dataProviderClassDtoMap) {
        this.dataProviderClassDtoMap = dataProviderClassDtoMap;
    }

    public int getTotalCaseFileNum() {
        return totalCaseFileNum;
    }

    public int getTotalDataProviderFileNum() {
        return totalDataProviderFileNum;
    }

    public int getInsertModuleNum() {
        return insertModuleNum;
    }

    public int getInsertCasesNum() {
        return insertCasesNum;
    }

    public int getUpdateCasesNum() {
        return updateCasesNum;
    }

    public Set<AutoModuleInfoDto> getInsertModuleInfoDtoSet() {
        return insertModuleInfoDtoSet;
    }

    public void setInsertModuleInfoDtoSet(Set<AutoModuleInfoDto> insertModuleInfoDtoSet) {
        this.insertModuleInfoDtoSet = insertModuleInfoDtoSet;
    }

    public Set<AutoCaseInfoDto> getInsertAutoCaseSet() {
        return insertAutoCaseSet;
    }

    public void setInsertAutoCaseSet(Set<AutoCaseInfoDto> insertAutoCaseSet) {
        this.insertAutoCaseSet = insertAutoCaseSet;
    }

    public List<String> getUpdateCaseIds() {
        return updateCaseIds;
    }

    Map<String, Expression> getConstantVariableMap() {
        return constantVariableMap;
    }

    public void setConstantVariableMap(Map<String, Expression> constantVariableMap) {
        this.constantVariableMap = constantVariableMap;
    }


    /**
     * 将初始化过的变量放入map中，以className+变量名称作为key，变量值作为value，char和string两种类型因为涉及去除单引号和双引号
     * 需要单独处理，其他类型的直接toString
     * 变量初始化，其他的类型将值直接toString
     *
     * @param fields
     * @param className
     */
    private void parseConstantsField(List<FieldDeclaration> fields, String className) {
        for (FieldDeclaration field : fields) {
            NodeList<VariableDeclarator> vars = field.getVariables();
            for (VariableDeclarator var : vars) {
                if (var.getInit().isPresent()) {
                    Expression expression = var.getInit().get();
                    this.constantVariableMap.put(className + "." + var.getId().getName(), expression);
                }
            }
        }
    }
}
