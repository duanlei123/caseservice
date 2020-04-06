package com.e.caseservice.utils;

import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.imports.ImportDeclaration;
import com.github.javaparser.ast.imports.SingleTypeImportDeclaration;
import com.github.javaparser.ast.imports.TypeImportOnDemandDeclaration;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JavaParseTools {

    private static final Logger LOGGER = LoggerFactory.getLogger(JavaParseTools.class);

    private JavaParseTools() {
        //使该类不会被实例化
    }

    public static String parseStringExpression(Expression expression, Map<String, Expression> constantVariableMap, NodeList<ImportDeclaration> imports, String className) {
        Expression exp = parseCommonExpression(expression, constantVariableMap, imports, className);
        if (null == exp) {
            return "";
        } else if (exp instanceof StringLiteralExpr) {
            return ((StringLiteralExpr) exp).getValue();
        } else {
            return exp.toString();
        }
    }


    public static Integer parseIntegerExpression(Expression expression, NodeList<ImportDeclaration> imports, Map<String, Expression> constantVariableMap, String className) {
        Expression exp = parseCommonExpression(expression, constantVariableMap, imports, className);
        if (exp instanceof IntegerLiteralExpr) {
            return Integer.valueOf(((IntegerLiteralExpr) exp).getValue());
        } else {
            return null;
        }
    }

    public static boolean parseBoolExpression(Expression expression, NodeList<ImportDeclaration> imports, Map<String, Expression> constantVariableMap, String className) {
        if (expression == null) {
            return true;
        }
        Expression exp = parseCommonExpression(expression, constantVariableMap, imports, className);
        if (exp instanceof BooleanLiteralExpr) {
            BooleanLiteralExpr booleanLiteralExpr = (BooleanLiteralExpr) exp;
            return booleanLiteralExpr.getValue();
        } else {
            return true;
        }
    }


    /**
     * 根据传入的表达式判断是否为直接赋值常量，或可以在map中可以解析的引用的常量
     *
     * @param expression
     * @param constantVariableMap
     * @param imports
     * @param className
     * @return
     */
    private static Expression parseCommonExpression(Expression expression, Map<String, Expression> constantVariableMap, NodeList<ImportDeclaration> imports, String className) {
        Expression targetExpress = null;
        if (expression instanceof FieldAccessExpr) {
            //表达式为引用类名+变量名的常量则去map查找其值
            FieldAccessExpr fieldAccessExpr = (FieldAccessExpr) expression;
            targetExpress = parseFieldAccessExpr(fieldAccessExpr, constantVariableMap, imports);

        } else if (expression instanceof NameExpr) {
            //表达式引用的为本类中的属性也去map查找其值
            targetExpress = constantVariableMap.get(className + "." + ((NameExpr) expression).getName());
        }
        if (targetExpress == null) {
            return expression;
        } else {
            return targetExpress;
        }

    }


    /**
     * 如果是常量变量，在map中查找其定义的值
     *
     * @param fieldAccessExpr
     * @param constantVariableMap
     * @param imports
     * @return
     */

    private static Expression parseFieldAccessExpr(FieldAccessExpr fieldAccessExpr, Map<String, Expression> constantVariableMap, NodeList<ImportDeclaration> imports) {

        Expression targetExpress = null;
        Expression scopeExpression = fieldAccessExpr.getScope();
        //如果其为全路径的className+变量名称则直接在map中查找
        if (scopeExpression instanceof FieldAccessExpr) {
            targetExpress = constantVariableMap.get(fieldAccessExpr.toString());
        }

        //如果其为simpleClassName+变量名称则用import+simpleClassName+变量名称在map中查找
        if (scopeExpression instanceof NameExpr) {
            NameExpr nameExpr = (NameExpr) scopeExpression;
            List<String> classNames = getClassNameFromImport(nameExpr.getName(), imports);
            for (String className : classNames) {
                targetExpress = constantVariableMap.get(className + "." + fieldAccessExpr.getField());
            }

        }
        return targetExpress;
    }

    /**
     * 根据simpleClassName在import中查找className，如果找到则返回单个className，如果找不到则返回所有*号的import+simpleClassName
     * 都不存在则返回长度为0的list
     *
     * @param className
     * @param imports
     * @return
     */

    public static List<String> getClassNameFromImport(String className, NodeList<ImportDeclaration> imports) {

        List<String> importList = new ArrayList<>();
        //先查找单一的import里面有没有目标的class
        for (ImportDeclaration im : imports) {
            //单一引入
            if (im instanceof SingleTypeImportDeclaration) {
                SingleTypeImportDeclaration sIm = (SingleTypeImportDeclaration) im;
                String importClassName = sIm.getType().getName();
                if (importClassName.substring(importClassName.lastIndexOf(".") + 1).equals(className)) {

                    importList.add(sIm.getType().getName());
                    return importList;

                }
            }
        }
        //如果找不到将所有*号的加入class的里面
        for (ImportDeclaration im : imports) {
            //带*号的import
            if (im instanceof TypeImportOnDemandDeclaration) {
                TypeImportOnDemandDeclaration tIm = (TypeImportOnDemandDeclaration) im;
                importList.add(tIm.getName().getQualifiedName() + "." + className);
            }

        }

        return importList;
    }

    /**
     * 处理一维数组的内容，目前只支持{x,x,x}这种数组，new String[x,x,x]这种类型不支持
     * @param expression
     * @param imports
     * @param constantVariableMap
     * @param className
     * @return
     */

    public static JSONArray parseArrayInitExpression(Expression expression, NodeList<ImportDeclaration> imports, Map<String, Expression> constantVariableMap, String className) {
        JSONArray jsonArray = new JSONArray();
        if (!(expression instanceof ArrayInitializerExpr)) {
            return jsonArray;

        }
        NodeList<Expression> arrElements = ((ArrayInitializerExpr) expression).getValues();
        for (Expression arrElement : arrElements) {
            Expression exp = parseCommonExpression(arrElement, constantVariableMap, imports, className);
            jsonArray.put(parseLiteralExprValue(exp));

        }
        return jsonArray;
    }

    private static Object parseLiteralExprValue(Expression expression) {
        if (expression == null) {
            return null;
        }
        Object object;
        if (expression instanceof CharLiteralExpr) {
            CharLiteralExpr expr = (CharLiteralExpr) expression;
            object = expr.getValue();

        } else if (expression instanceof DoubleLiteralExpr) {
            DoubleLiteralExpr expr = (DoubleLiteralExpr) expression;
            object = Double.valueOf(expr.getValue());

        } else if (expression instanceof IntegerLiteralExpr) {
            IntegerLiteralExpr expr = (IntegerLiteralExpr) expression;
            object = Integer.valueOf(expr.getValue());

        } else if (expression instanceof LongLiteralExpr) {
            LongLiteralExpr expr = (LongLiteralExpr) expression;
            object = Long.valueOf(expr.getValue());

        } else if (expression instanceof BooleanLiteralExpr) {
            BooleanLiteralExpr expr = (BooleanLiteralExpr) expression;
            object = expr.getValue();

        } else if (expression instanceof StringLiteralExpr) {
            StringLiteralExpr expr = (StringLiteralExpr) expression;
            object = expr.getValue();

        } else if (expression instanceof NullLiteralExpr) {
            object = null;
        } else {
            object = expression.toString();
        }
        return object;
    }

}
