package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.OrderDetail;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/30
 * Writer: yolia
 */

@Repository
public interface OrderDetailDao {
    //订单相关
    //添加操作
    int add(OrderDetail orderDetail) throws Exception;
    //查询相关
    List<OrderDetail> selectOidDistinctByOid(String oid) throws Exception;
    List<OrderDetail> selectOrderListByOidAndUid(@Param(value = "oid") String oid,
                                                 @Param(value = "uid") Integer uid) throws Exception;
}
