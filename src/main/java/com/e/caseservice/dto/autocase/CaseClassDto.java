package com.e.caseservice.dto.autocase;


import com.e.caseservice.common.Constants;
import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.expr.MemberValuePair;
import com.github.javaparser.ast.expr.NormalAnnotationExpr;
import com.github.javaparser.ast.imports.ImportDeclaration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashSet;
import java.util.Set;

/**
 * 类的数据结构，将一个类的信息分析后以该DTO保存
 */
public class CaseClassDto {
    private NodeList<ImportDeclaration> imports;

    private Set<CaseMethodDto> caseMethodDtos = new HashSet<>();

    private static final Logger LOGGER = LoggerFactory.getLogger(CaseClassDto.class);

    private String className;

    private String packageName;

    private String simpleClassName;

    private String classAbsolutePath;

    private String moduleID;

    public String getClassAbsolutePath() {
        return classAbsolutePath;
    }

    public void setClassAbsolutePath(String classAbsolutePath) {
        this.classAbsolutePath = classAbsolutePath;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getSimpleClassName() {
        return simpleClassName;
    }

    public void setSimpleClassName(String simpleClassName) {
        this.simpleClassName = simpleClassName;
    }

    public NodeList<ImportDeclaration> getImports() {
        return imports;
    }

    public void setImports(NodeList<ImportDeclaration> imports) {
        this.imports = imports;
    }

    public Set<CaseMethodDto> getCaseMethodDtos() {
        return caseMethodDtos;
    }

    public void setCaseMethodDtos(Set<CaseMethodDto> caseMethodDtos) {
        this.caseMethodDtos = caseMethodDtos;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public void parseMethodAnn(NormalAnnotationExpr normalAnnotationExpr, String methodName) {

        CaseMethodDto caseMethodDto = new CaseMethodDto();
        caseMethodDto.setMethodName(methodName);
        caseMethodDto.setStartLineNum(normalAnnotationExpr.getBegin().line);
        parseAnnotation(normalAnnotationExpr.getPairs(), caseMethodDto);
        this.caseMethodDtos.add(caseMethodDto);
    }


    private void parseAnnotation(NodeList<MemberValuePair> valuePairs, CaseMethodDto caseMethodDto) {
        if (null == valuePairs) {
            return;
        }
        for (MemberValuePair memberValuePair : valuePairs) {
            switch (memberValuePair.getName()) {
                case Constants.CASE_ANNOTATION_DESC:
                    caseMethodDto.setDescription(memberValuePair.getValue());
                    break;
                case Constants.CASE_ANNOTATION_GROUPS:
                    caseMethodDto.setGroup(memberValuePair.getValue());
                    break;
                case Constants.CASE_ANNOTATION_PRI:
                    caseMethodDto.setPriority(memberValuePair.getValue());
                    break;
                case Constants.CASE_ANNOTATION_DATA_PROVIDER:
                    caseMethodDto.setDataProvider(memberValuePair.getValue());
                    break;
                case Constants.CASE_ANNOTATION_DATA_PROVIDER_CLASS:
                    caseMethodDto.setDataProviderClass(memberValuePair.getValue());
                    break;

                case Constants.CASE_ANNOTATION_ENABLED:
                    caseMethodDto.setEnableState(memberValuePair.getValue());
                    break;

                default:
                    LOGGER.error("不支持的@test注解" + memberValuePair.toString());
            }

        }

    }

    public String getModuleID() {
        return moduleID;
    }

    public void setModuleID(String moduleID) {
        this.moduleID = moduleID;
    }
}
