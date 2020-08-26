package com.nwafu.bingo.entity;

import java.util.Date;

/**
 * Date: 2020/8/19
 * Description: optional describe the class
 */
public class Game {

    private Integer gid;
    private String gname;
    private String gtype;//list类型的string转换得到
    private String developer;
    private String publisher;
    private Date realeasedate;
    private Float gprice;
    private Float discount;
    private Float gscore;
    private String language;//list类型的string转换得到
    private String detail;
    private String vhref;//list类型的string转换得到
    private String phref;//list类型的string转换得到
    private String chref;//list类型的string转换得到
    private String dlclist;//list类型的String转换得到
    private String platform;//list类型String转换得到
    private String systemreq;//list类型数字转换得到，为systemreq的id

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getGname() {
        return gname;
    }

    public void setGname(String gname) {
        this.gname = gname;
    }

    public String getGtype() {
        return gtype;
    }

    public void setGtype(String gtype) {
        this.gtype = gtype;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getRealeasedate() {
        return realeasedate;
    }

    public void setRealeasedate(Date realeasedate) {
        this.realeasedate = realeasedate;
    }

    public Float getGprice() {
        return gprice;
    }

    public void setGprice(Float gprice) {
        this.gprice = gprice;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Float getGscore() {
        return gscore;
    }

    public void setGscore(Float gscore) {
        this.gscore = gscore;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getVhref() {
        return vhref;
    }

    public void setVhref(String vhref) {
        this.vhref = vhref;
    }

    public String getPhref() {
        return phref;
    }

    public void setPhref(String phref) {
        this.phref = phref;
    }

    public String getChref() {
        return chref;
    }

    public void setChref(String chref) {
        this.chref = chref;
    }

    public String getDlclist() {
        return dlclist;
    }

    public void setDlclist(String dlclist) {
        this.dlclist = dlclist;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getSystemreq() {
        return systemreq;
    }

    public void setSystemreq(String systemreq) {
        this.systemreq = systemreq;
    }
}
