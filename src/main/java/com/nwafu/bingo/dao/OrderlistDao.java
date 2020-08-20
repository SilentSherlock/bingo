package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Orderlist;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
public interface OrderlistDao {

    void add(Orderlist orderlist) throws Exception;
    /*根据不同的id来查询comment
     * idType的值应为oid,uid*/
    List<Orderlist> getById(@Param("idType") Integer idType, @Param("idValue") Integer idValue) throws Exception;
    List<Orderlist> getAll() throws Exception;
}
