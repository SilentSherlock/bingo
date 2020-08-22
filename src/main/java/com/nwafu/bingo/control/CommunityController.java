package com.nwafu.bingo.control;

import com.nwafu.bingo.entity.Comment;
import com.nwafu.bingo.entity.Post;
import com.nwafu.bingo.service.CommunityService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Status;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/21
 * Description: optional describe the class
 */
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Resource
    private CommunityService communityService;

    @RequestMapping("/allPosts")
    public Result getAllPost() throws Exception {
        Result result = new Result();
        List<Post> posts = communityService.getAll();
        if (posts != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("AllPost", posts);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/getPostsById")
    public Result getPostsById(@RequestParam("idType") String idType, @RequestParam("idValue") Integer idValue) throws Exception{
        Result result = new Result();
        List<Post> posts = communityService.getPostById(idType, idValue);
        if (posts != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("postBy" + idType, posts);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/getCommentsById")
    public Result getCommentsById(@RequestParam("idType") String idType, @RequestParam("idValue") Integer idValue) throws Exception {
        Result result = new Result();
        List<Comment> comments = communityService.getCommentById(idType, idValue);
        if (comments != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("CommentBy" + idType, comments);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }
    @RequestMapping("/deletePostsById")
    public Result deletePostsById(@RequestParam("idType") String idType, @RequestParam("idValue") Integer idValue) throws Exception {
        Result result = new Result();
        communityService.deletePostOrCommentById(idType, idValue, 0);
        result.setStatus(Status.SUCCESS);
        return result;
    }

    @RequestMapping("/deleteCommentsById")
    public Result deleteCommentsById(@RequestParam("idType") String idType, @RequestParam("idValue") Integer idValue) throws Exception {
        Result result = new Result();
        communityService.deletePostOrCommentById(idType, idValue, 1);
        result.setStatus(Status.SUCCESS);
        return result;
    }

    @RequestMapping("/addPost")
    public Result addPost(Post post) throws Exception {
        Result result = new Result();
        if (post != null) {
            communityService.addPostOrComment(post);
            result.setStatus(Status.SUCCESS);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/addComment")
    public Result addComment(Comment comment) throws Exception {
        Result result = new Result();
        if (comment != null) {
            communityService.addPostOrComment(comment);
            result.setStatus(Status.SUCCESS);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/updatePost")
    public Result updatePost(Post post) throws Exception {
        Result result = new Result();
        communityService.updatePost(post);
        result.setStatus(Status.SUCCESS);
        return result;
    }
}
