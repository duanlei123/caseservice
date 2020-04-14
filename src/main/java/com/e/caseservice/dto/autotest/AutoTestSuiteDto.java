package com.e.caseservice.dto.autotest;

import java.util.Date;

/**
 * 测试套实体类
 */
public class AutoTestSuiteDto {

    private Integer id; // id
    private String name; // 测试套名称
    private Integer productId; // 所属产品id
    private String gitUrl; // git http url
    private String type; // 类型
    private String config; //配置文件内容
    private String confFileName; //配置文件名称
    private String caseRootPackage; // case根路径
    private Integer status; // 状态
    private Integer refCount; //应用次数
    private String description; // 描述
    private String version; // 版本
    private String chs_name; // 测试套状态
    private String branch; // 分支
    private Date createtime; //创建时间
    private String info; // 解析测试套信息
    private String gitusername;
    private String gitpassword;

    public String getGitusername() {
        return gitusername;
    }

    public void setGitusername(String gitusername) {
        this.gitusername = gitusername;
    }

    public String getGitpassword() {
        return gitpassword;
    }

    public void setGitpassword(String gitpassword) {
        this.gitpassword = gitpassword;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }


    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getChs_name() {
        return chs_name;
    }

    public void setChs_name(String chs_name) {
        this.chs_name = chs_name;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getGitUrl() {
        return gitUrl;
    }

    public void setGitUrl(String gitUrl) {
        this.gitUrl = gitUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public String getConfFileName() {
        return confFileName;
    }

    public void setConfFileName(String confFileName) {
        this.confFileName = confFileName;
    }

    public String getCaseRootPackage() {
        return caseRootPackage;
    }

    public void setCaseRootPackage(String caseRootPackage) {
        this.caseRootPackage = caseRootPackage;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRefCount() {
        return refCount;
    }

    public void setRefCount(Integer refCount) {
        this.refCount = refCount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    @Override
    public String toString() {
        return "AutoTestSuiteDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", productId=" + productId +
                ", gitUrl='" + gitUrl + '\'' +
                ", type='" + type + '\'' +
                ", config='" + config + '\'' +
                ", confFileName='" + confFileName + '\'' +
                ", caseRootPackage='" + caseRootPackage + '\'' +
                ", status=" + status +
                ", refCount=" + refCount +
                ", description='" + description + '\'' +
                ", version='" + version + '\'' +
                ", chs_name='" + chs_name + '\'' +
                ", branch='" + branch + '\'' +
                ", createtime=" + createtime +
                ", info='" + info + '\'' +
                '}';
    }
}
