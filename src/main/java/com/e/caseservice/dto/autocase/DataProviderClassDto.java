package com.e.caseservice.dto.autocase;

import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.imports.ImportDeclaration;
import com.github.javaparser.ast.stmt.ReturnStmt;
import com.github.javaparser.ast.stmt.Statement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 将dataProvider的类中的方法和返回值以kv的形式存入map中，其中dataProvider注解中name为key，对应方法的返回值为value
 */
public class DataProviderClassDto {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataProviderClassDto.class);

    private String className;
    private NodeList<ImportDeclaration> imports;
    private Map<String, List<ArrayInitializerExpr>> dataProviders = new HashMap<>();

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    /**
     * 解析方法的返回值，将dataProvider注解中的name和方法的返回值存入map中
     *
     * @param normalAnnotationExpr
     * @param statements
     * @return
     */
    public void parseDataProviderMethod(NormalAnnotationExpr normalAnnotationExpr, NodeList<Statement> statements) {

        String key = parseAnnotations(normalAnnotationExpr);
        ReturnStmt returnStmt = getMethodReturnStmt(statements);
        if (null != returnStmt) {
            List<ArrayInitializerExpr> value = parseMethodReturnStmt(returnStmt);
            if (key.isEmpty()) {
                LOGGER.error("解析dataProvider的name失败 " + normalAnnotationExpr.toString() + "目前只支持name=\"test\"这种格式");
                return;
            }

            if (value.isEmpty()) {
                LOGGER.error("解析dataProvider中的返回数组失败 " + statements.toString());
                return;
            }
            this.dataProviders.put(key, value);
        }
    }

    public NodeList<ImportDeclaration> getImports() {
        return imports;
    }

    public void setImports(NodeList<ImportDeclaration> imports) {
        this.imports = imports;
    }

    public Map<String, List<ArrayInitializerExpr>> getDataProviders() {
        return dataProviders;
    }

    public void setDataProviders(Map<String, List<ArrayInitializerExpr>> dataProviders) {
        this.dataProviders = dataProviders;
    }

    /**
     * 解析dataProvider注解中name的值，目前name的值只支持常量字符串
     *
     * @param normalAnnotationExpr
     * @return
     */
    private String parseAnnotations(NormalAnnotationExpr normalAnnotationExpr) {
        String name = "";
        for (MemberValuePair memberValuePair : normalAnnotationExpr.getPairs()) {
            if (memberValuePair.getValue() instanceof StringLiteralExpr) {
                StringLiteralExpr stringLiteralExpr = (StringLiteralExpr) memberValuePair.getValue();
                name = stringLiteralExpr.getValue();

            }
        }
        return name;

    }

    /**
     * 解析dataProvider的返回值，目前只支持
     * return new Object[][]{{123, "abc"}, {456, "def"}}; 这种格式的返回值的解析
     *
     * @param returnStmt
     * @return
     */
    private List<ArrayInitializerExpr> parseMethodReturnStmt(ReturnStmt returnStmt) {
        List<ArrayInitializerExpr> arrayList = new ArrayList<>();
        if (returnStmt.getExpr().isPresent()) {
            Expression expression = returnStmt.getExpr().get();
            //处理返回值中的二维数据，将每个一维数组装入list中返回
            if (expression instanceof ArrayCreationExpr) {
                parseArrayCreationExpr((ArrayCreationExpr) expression, arrayList);
            }
        }
        return arrayList;
    }

    private void parseArrayCreationExpr(ArrayCreationExpr arrayCreationExpr, List<ArrayInitializerExpr> arrayList) {
        if (arrayCreationExpr.getInitializer().isPresent()) {
            NodeList<Expression> expressions = arrayCreationExpr.getInitializer().get().getValues();
            for (Expression exp : expressions) {
                parseSubArr(exp, arrayList);
            }
        }
    }


    private void parseSubArr(Expression expression, List<ArrayInitializerExpr> arrayList) {

        if (expression instanceof ArrayInitializerExpr) {
            ArrayInitializerExpr subAeeInit = (ArrayInitializerExpr) expression;
            arrayList.add(subAeeInit);
        } else if (expression instanceof ArrayCreationExpr) {

            ArrayCreationExpr arrayCreationExpr = (ArrayCreationExpr) expression;
            if (arrayCreationExpr.getInitializer().isPresent()) {
                ArrayInitializerExpr subAeeInit = arrayCreationExpr.getInitializer().get();
                arrayList.add(subAeeInit);
            }
        }

    }

    private ReturnStmt getMethodReturnStmt(NodeList<Statement> statements) {
        ReturnStmt returnStmt = null;

        for (Statement statement : statements) {
            //处理方法中return部分
            if (statement instanceof ReturnStmt) {
                returnStmt = (ReturnStmt) statement;
            }
        }
        return returnStmt;
    }
}