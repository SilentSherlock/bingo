package com.nwafu.bingo.service;

import com.nwafu.bingo.dao.CommentDao;
import com.nwafu.bingo.dao.PostDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Date: 2020/8/20
 * Description: 社区类，封装帖子和评论
 * 包括帖子的添加删除
 */
@Service
public class CommunityService {

    @Resource
    private PostDao postDao;
    @Resource
    private CommentDao commentDao;
    private static final String CLASSNAME = "CommunityService";

    private void log(String status) {
        System.out.println(CLASSNAME + " " + status);
    }


}
