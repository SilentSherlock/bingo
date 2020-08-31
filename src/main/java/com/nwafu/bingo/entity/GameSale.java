package com.nwafu.bingo.entity;

/**
 * Writer: yolia
 */
public class GameSale {
    private Integer gid;
    private String gname;
    private Integer cursale;
    private Float increaserate;

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

    public Integer getCursale() {
        return cursale;
    }

    public void setCursale(Integer cursale) {
        this.cursale = cursale;
    }

    public Float getIncreaserate() {
        return increaserate;
    }

    public void setIncreaserate(Float increaserate) {
        this.increaserate = increaserate;
    }
}
