package com.nwafu.bingo.entity;
/**
 * Date: 2020/8/19
 * Description: 从Orderlist类中分拆出来的类，用来代表用户订单中一个条目的详细信息
 */
public class OrderDetail {

    private Integer gid;//游戏id
    private String keys;//购买成功后发放给玩家的游戏key,list对象转换得到
    private Float discount;//购买时折扣
    private Float price;//购买时价格

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getKeys() {
        return keys;
    }

    public void setKeys(String keys) {
        this.keys = keys;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}
