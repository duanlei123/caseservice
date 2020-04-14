package com.e.caseservice.dto.autocase;

import com.github.javaparser.ast.expr.Expression;

public class CaseMethodDto {
    private String methodName;
    private Expression group;
    private Expression description;
    private int startLineNum;
    private Expression priority;
    private Expression dataProvider;
    private Expression dataProviderClass;
    private Expression enableState;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CaseMethodDto that = (CaseMethodDto) o;

        return methodName != null ? methodName.equals(that.methodName) : that.methodName == null;
    }

    @Override
    public int hashCode() {
        return methodName != null ? methodName.hashCode() : 0;
    }


    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public Expression getGroup() {
        return group;
    }

    public void setGroup(Expression group) {
        this.group = group;
    }

    public Expression getDescription() {
        return description;
    }

    public void setDescription(Expression description) {
        this.description = description;
    }

    public int getStartLineNum() {
        return startLineNum;
    }

    public void setStartLineNum(int startLineNum) {
        this.startLineNum = startLineNum;
    }

    public Expression getPriority() {
        return priority;
    }

    public void setPriority(Expression priority) {
        this.priority = priority;
    }

    public Expression getDataProvider() {
        return dataProvider;
    }

    public void setDataProvider(Expression dataProvider) {
        this.dataProvider = dataProvider;
    }

    public Expression getDataProviderClass() {
        return dataProviderClass;
    }

    public void setDataProviderClass(Expression dataProviderClass) {
        this.dataProviderClass = dataProviderClass;
    }

    public Expression getEnableState() {
        return enableState;
    }

    public void setEnableState(Expression enableState) {
        this.enableState = enableState;
    }
}
