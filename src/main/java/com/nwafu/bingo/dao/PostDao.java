package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.omg.PortableServer.POA;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface PostDao {

    void add(Post post) throws Exception;
    /*根据不同的id来查询comment
     * idType的值应为pid,uid*/
    List<Post> getById(@Param("idType") String idType, @Param("idValue") Integer idValue) throws Exception;
    /*要求与上同*/
    void deleteById(@Param("idType") String idType, @Param("idValue") Integer idValue) throws Exception;
    void update(Post post) throws Exception;
    List<Post> getAll() throws Exception;
}
