package com.nwafu.bingo.dao;

import com.nwafu.bingo.entity.Comment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Date: 2020/8/20
 * Description: optional describe the class
 */
@Repository
public interface CommentDao {

    void add(Comment comment) throws Exception;
    /*根据不同的id来查询comment
    * idType的值应为cid,uid,pid,touid,tocid*/
    List<Comment> getById(@Param("idType") String idType, @Param("idValue") Integer idValue) throws Exception;
    /*要求与上同*/
    void deleteById(@Param("idType") String idType, @Param("idValue") Integer idValue) throws Exception;
}
