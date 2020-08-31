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
    /*根据不同的id来查询comment
     * idType的值应为oid,uid*/
    List<Orderlist> selectOrderListByUid(@Param(value = "uid") Integer uid,
                                               @Param(value = "pageIndex") Integer pageIndex,
                                               @Param(value = "pageCount") Integer pageCount) throws Exception;
    Integer getOrderListByUidCount(Integer uid) throws Exception;
}
