package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Orderlist;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface OrderlistDao {

    void add(Orderlist orderlist) throws Exception;
    void delete(Orderlist orderlist) throws Exception;
    /*根据不同的id来查询comment
     * idType的值应为oid,uid*/
    List<Orderlist> getById(@Param("idType") String idType, @Param("idValue") Integer idValue) throws Exception;
    List<Orderlist> getAll() throws Exception;
    List<Orderlist> getByCurTime() throws Exception;
}
