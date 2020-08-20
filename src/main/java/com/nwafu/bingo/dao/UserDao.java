package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.User;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
public interface UserDao {

    void add(User user) throws Exception;
    List<User> getByName(String name) throws Exception;
    User getById(Integer id) throws Exception;
    List<User> getAll() throws Exception;
    void update(User user) throws Exception;
}
