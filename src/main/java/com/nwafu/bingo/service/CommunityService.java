package com.nwafu.bingo.service;

import com.nwafu.bingo.dao.CommentDao;
import com.nwafu.bingo.dao.PostDao;
import com.nwafu.bingo.entity.Comment;
import com.nwafu.bingo.entity.Post;
import com.nwafu.bingo.utils.Search;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/20
 * Description: 社区类，封装帖子和评论
 * 获取所有帖子
 * 根据pid或者uid获取或者删除帖子
 * 根据cid,uid,pid,touid,tocid获取或者删除评论
 * 添加帖子或者评论
 * 更新帖子
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

    public List<Post> getAll() throws Exception{
        String status = "Get All Post";
        log(status);
        List<Post> posts = postDao.getAll();
        if (posts != null) {
            log(status + " success");
            return posts;
        }
        return null;
    }

    public void addPostOrComment(Object object) throws Exception{
        String status = "add post or comment";
        if (object != null) {
            if (object instanceof Post) {
                postDao.add((Post) object);
            }else if (object instanceof Comment) {
                commentDao.add((Comment) object);
            }
        }else log(status + " wrong object null");
    }

    public void updatePost(Post post) throws Exception {
        String status = "update post";
        log(CLASSNAME + " " + status);
        postDao.update(post);
    }

    public List<Post> getPostById(String idType, Integer idValue) throws Exception {
        String status = "Get Post by id";
        List<Post> posts = postDao.getById(idType, idValue);
        if (posts != null) {
            log(status + " success");
            return posts;
        }
        return null;
    }
    public List<Comment> getCommentById(String idType, Integer idValue) throws Exception {
        String status = "Get comment by id";
        List<Comment> comments = commentDao.getById(idType, idValue);
        if (comments != null) {
            log(status + " success");
            return comments;
        }
        return null;
    }

    /*
    * 0----删除Post
    * 1----删除Comment
    * */
    public void deletePostOrCommentById(String idType, Integer idValue, Integer type) throws Exception {
        String status = "Delete comment or post by id";
        if (type == 0) {
            postDao.deleteById(idType, idValue);
            log(CLASSNAME + " " + status + " post");
        }else if (type == 1) {
            commentDao.deleteById(idType, idValue);
            log(CLASSNAME + " " + status + " comment");
        } else log(CLASSNAME + " wrong type");
    }


    public List<Post> getPostPage(Integer current_index, Integer size) throws Exception {
        List<Post> list = postDao.getPostPage(current_index,size);
        if(list.size() == 0){
            return null;
        }else {
            return list;
        }
    }
    public Integer getPostCount(Search search){
        Integer allSearchNum = postDao.getPostCount(search);
        return (int)Math.ceil((double)allSearchNum / (double)search.getPageCount());
    }
}
