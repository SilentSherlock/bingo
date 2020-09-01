package com.nwafu.bingo.control;

import com.nwafu.bingo.entity.Comment;
import com.nwafu.bingo.entity.Post;
import com.nwafu.bingo.service.CommunityService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Status;
import com.nwafu.bingo.utils.Tools;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/21
 * Description: 社区管理控制类，负责社区相关实体的操作
 */
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Resource
    private CommunityService communityService;
    private Tools tools = new Tools();

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

    /**
     * 更新一条属性
     * @Param1: post id
     * @Param2: 属性名
     * @Param3: 属性值
     * */
    @RequestMapping("/updatePostProp")
    public Result updatePostProp(@RequestParam("pid") Integer pid, @RequestParam("propName") String propName, @RequestParam("propValue") Object propValue) throws Exception {
        Result result = new Result();
        List<Post> posts = communityService.getPostById("pid", pid);
        if (posts == null || posts.size() != 1 || propName == null || propValue == null) {
            result.setStatus(Status.FAILURE);
        }else {
            switch (propName) {
                case "ptheme":
                    posts.get(0).setPtheme((String) propValue);
                    break;
                case "plikenum":
                    posts.get(0).setPlikenum(Integer.parseInt((String) propValue));
                    break;
                case "content":
                    posts.get(0).setContent((String) propValue);
                    break;
                case "title":
                    posts.get(0).setTitle((String) propValue);
                    break;
                default:
                    throw new Exception("Wrong propName " + propName);
            }
            communityService.updatePost(posts.get(0));
            result.setStatus(Status.SUCCESS);
        }
        return result;
    }

    /**
     * 一次更新post两条以上属性，传递post对象
     * Post要给出所有属性值
     * */
    @RequestMapping("/updatePost")
    public Result updatePost(Post post) throws Exception {
        Result result = new Result();
        if (post == null) {
            result.setStatus(Status.FAILURE);
        }else {
            if (tools.validateObject(post)) {
                communityService.updatePost(post);
                result.setStatus(Status.SUCCESS);
            }else {
                result.setStatus(Status.FAILURE);
            }
        }
        return result;
    }
}
