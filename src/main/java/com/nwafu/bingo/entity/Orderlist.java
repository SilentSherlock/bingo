package com.nwafu.bingo.entity;

import java.util.Date;

/**
 * Date: 2020/8/19
 * Description: 订单类
 */
public class Orderlist {

    private Integer oid;
    private Integer uid;
    private Date otime;
    private String orderDetails;//由list类型的OrderDetail转换

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Date getOtime() {
        return otime;
    }

    public void setOtime(Date otime) {
        this.otime = otime;
    }

    public String getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;
    }
}
