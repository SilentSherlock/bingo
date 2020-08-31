package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.GameSale;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameSaleDao {
    //查询
    List<GameSale> selectAll(@Param(value = "order") String order,
                             @Param(value = "sort") Integer sort,
                             @Param(value = "pageIndex") Integer pageIndex,
                             @Param(value = "pageCount") Integer pageCount) throws Exception;
    Integer getAllCount() throws Exception;
}
