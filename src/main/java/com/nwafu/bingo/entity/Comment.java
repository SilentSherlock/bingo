package com.nwafu.bingo.entity;

import java.util.Date;

/**
 * Date: 2020/8/19
 * Description: 评论类，根据ctype分为对帖子的回复和对回复的回复
 */
public class Comment {

    private Integer cid;
    private Integer uid;
    private Integer pid;
    private String content;
    private Date ctime;
    private Integer ctype;
    private Integer tocid;
    private Integer touid;

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getCtype() {
        return ctype;
    }

    public void setCtype(Integer ctype) {
        this.ctype = ctype;
    }

    public Integer getTocid() {
        return tocid;
    }

    public void setTocid(Integer tocid) {
        this.tocid = tocid;
    }

    public Integer getTouid() {
        return touid;
    }

    public void setTouid(Integer touid) {
        this.touid = touid;
    }

    public Date getCtime() {
        return ctime;
    }

    public void setCtime(Date ctime) {
        this.ctime = ctime;
    }
}
