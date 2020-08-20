package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Game;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface GameDao {

    void add(Game game) throws Exception;
    List<Game> getAll() throws Exception;
    /*模糊查询*/
    List<Game> getByName(String name) throws Exception;
    /*直接根据gid获取*/
    Game getById(Integer id) throws Exception;
    void update(Game game) throws Exception;
}
