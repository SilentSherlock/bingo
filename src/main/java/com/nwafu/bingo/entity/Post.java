package com.nwafu.bingo.entity;

import java.util.List;

/**
 * Date: 2020/8/19
 * Description: 帖子类
 */
public class Post {

    private Integer pid;
    private Integer uid;
    private String ptime;
    private String ptheme;//主题，list转得到
    private Integer plikenum;//点赞
    private String content;
    private String title;

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getPtime() {
        return ptime;
    }

    public void setPtime(String ptime) {
        this.ptime = ptime;
    }

    public String getPtheme() {
        return ptheme;
    }

    public void setPtheme(String ptheme) {
        this.ptheme = ptheme;
    }

    public Integer getPlikenum() {
        return plikenum;
    }

    public void setPlikenum(Integer plikenum) {
        this.plikenum = plikenum;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
