package com.nwafu.bingo.entity;

import java.util.Date;

/**
 * Date: 2020/8/19
 * Description:
 * Writer: yolia
 */
public class OrderDetail {
    private String oid;
    private Integer uid;
    private Integer gid;//游戏id
    private String klist;//购买成功后发放给玩家的游戏key,list对象转换得到
    private Integer knum;//购买数量
    private Float discount;//购买时折扣
    private Date otime; //购买时间

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getKlist() {
        return klist;
    }

    public void setKlist(String klist) {
        this.klist = klist;
    }

    public Integer getKnum() {
        return knum;
    }

    public void setKnum(Integer knum) {
        this.knum = knum;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Date getOtime() {
        return otime;
    }

    public void setOtime(Date otime) {
        this.otime = otime;
    }
}
