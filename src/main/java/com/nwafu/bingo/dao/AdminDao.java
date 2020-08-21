package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Admin;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface AdminDao {

    List<Admin> getAll() throws Exception;
    List<Admin> getByName(String name) throws Exception;
    void add(Admin admin) throws Exception;
    void deleteById(Integer id) throws Exception;
    void update(Admin admin) throws Exception;
}
