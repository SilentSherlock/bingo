package com.nwafu.bingo.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Date: 2020/8/21
 * Description: 封装返回的结果
 * status:状态码(Status中值)
 *
 * Map<name, Object>
 *     name: 对象的名字
 *     Object: 对象值
 */
public class Result {

    private int status;
    private Map<String, Object> resultMap;

    public Result() { resultMap = new HashMap<>(); }
    public Result(int status) {
        this.status = status;
        resultMap = new HashMap<>();
    }
    public Result(int status, Map<String, Object> resultMap) {
        this.status = status;
        this.resultMap = resultMap;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Map<String, Object> getResultMap() {
        return resultMap;
    }

    public void setResultMap(Map<String, Object> resultMap) {
        this.resultMap = resultMap;
    }
}
