package com.nwafu.bingo.entity;

/**
 * Date: 2020/8/19
 * Description: 订单类
 */
public class Orderlist {

    private Integer oid;
    private Integer uid;
    private String otime;
    private String orderDetails;//由list类型的details转换

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

    public String getOtime() {
        return otime;
    }

    public void setOtime(String otime) {
        this.otime = otime;
    }

    public String getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;
    }
}
