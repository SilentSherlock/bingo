package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.SystemReq;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface SystemReqDao {

    SystemReq getById(Integer id) throws Exception;
    List<SystemReq> getAll() throws Exception;
    void add(SystemReq systemReq) throws Exception;
    void deleteById(Integer id) throws Exception;
    void updateById(SystemReq systemReq) throws Exception;
}
