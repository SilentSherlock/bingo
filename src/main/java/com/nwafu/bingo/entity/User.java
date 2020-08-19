package com.nwafu.bingo.entity;

import java.util.List;

/**
 * Date: 2020/8/19
 * Description: 用户类，
 */
public class User {

    private Integer uid;
    private String uname;
    private String password;
    private String gamelist;//账户游戏列表,list转换得到
    private String wishlist;//愿望单,list转换得到
    private String umail;
    private String ualias;//昵称
    private String usex;
    private String ubirthday;
    private String uprofile;//个人信息
    private String uavatar;//头像路径

    public String getUprofile() {
        return uprofile;
    }

    public void setUprofile(String uprofile) {
        this.uprofile = uprofile;
    }

    public String getUavatar() {
        return uavatar;
    }

    public void setUavatar(String uavatar) {
        this.uavatar = uavatar;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGamelist() {
        return gamelist;
    }

    public void setGamelist(String gamelist) {
        this.gamelist = gamelist;
    }

    public String getWishlist() {
        return wishlist;
    }

    public void setWishlist(String wishlist) {
        this.wishlist = wishlist;
    }

    public String getUmail() {
        return umail;
    }

    public void setUmail(String umail) {
        this.umail = umail;
    }

    public String getUalias() {
        return ualias;
    }

    public void setUalias(String ualias) {
        this.ualias = ualias;
    }

    public String getUsex() {
        return usex;
    }

    public void setUsex(String usex) {
        this.usex = usex;
    }

    public String getUbirthday() {
        return ubirthday;
    }

    public void setUbirthday(String ubirthday) {
        this.ubirthday = ubirthday;
    }
}
