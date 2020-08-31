package com.nwafu.bingo.entity;

import java.util.Date;

/**
 * Date: 2020/8/19
 * Description: 订单列表类
 */
public class Orderlist {
    private String oid;
    private Integer uid;
    private Float allprice;
    private Date otime;

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

    public Float getAllprice() {
        return allprice;
    }

    public void setAllprice(Float allprice) {
        this.allprice = allprice;
    }

    public Date getOtime() {
        return otime;
    }

    public void setOtime(Date otime) {
        this.otime = otime;
    }
}
