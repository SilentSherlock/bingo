package com.nwafu.bingo.entity;

/**
 * Date: 2020/8/19
 * Description: 管理员类
 */
public class Admin {

    private Integer aid;
    private String aname;
    private String password;

    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
