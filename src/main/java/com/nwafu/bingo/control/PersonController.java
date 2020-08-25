package com.nwafu.bingo.control;

import com.alibaba.fastjson.JSONArray;
import com.nwafu.bingo.entity.Admin;
import com.nwafu.bingo.entity.Game;
import com.nwafu.bingo.entity.User;
import com.nwafu.bingo.service.PersonService;
import com.nwafu.bingo.service.StoreService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Status;
import org.apache.ibatis.annotations.Param;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.Resource;
import java.io.File;
import java.util.LinkedList;
import java.util.List;


/**
 * Date: 2020/8/21
 * Description: 人员管理控制类，负责人事相关的控制跳转
 */
@RestController
@RequestMapping("/person")
public class PersonController {

    @Resource
    private PersonService personService;
    @Resource
    private StoreService storeService;

    @RequestMapping("/adminValidate")
    public Result adminValidate(Admin admin) throws Exception {
        Result result = new Result();
        Admin admin1 = personService.validateAdmin(admin.getAname(), admin.getPassword());
        if (admin1 != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("admin", admin1);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/userValidate")
    public Result userValidate(User user) throws Exception {
        Result result = new Result();
        User user1 = personService.validateUser(user.getUname(), user.getPassword());
        if (user1 != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("user", user1);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    /*gamelist and wishlist not include*/
    @RequestMapping("/getAllUser")
    public Result getAllUser() throws Exception {
        Result result = new Result();
        List<User> users = personService.getAllUser();
        if (users != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("allUser", users);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/getAllAdmin")
    public Result getAllAdmin() throws Exception {
        Result result = new Result();
        List<Admin> admins = personService.getAllAdmin();
        if (admins != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("allAdmin", admins);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }


    @RequestMapping("/getUserById")
    public Result getUserById(@RequestParam("uid") Integer uid) throws Exception {
        Result result = new Result();
        User user = personService.getUserById(uid);
        if (user != null) {
            List<Game> gameList = transform(user.getGamelist());
            List<Game> wishList = transform(user.getWishlist());
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("user", user);
            result.getResultMap().put("gameList", gameList);
            result.getResultMap().put("wishList", wishList);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/addAdmin")
    public Result addAdmin(Admin admin) throws Exception {
        List<Admin> admins = personService.getByAdminName(admin.getAname());

        Result result = new Result();
        if (admins.size() == 0) {
            result.setStatus(Status.SUCCESS);
            personService.addPerson(admin);
            result.getResultMap().put("info", "Insert Success");
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("info", "The Admin Name exists");
        }
        return result;
    }
    /*not mkdir*/
    @RequestMapping("/addUser")
    public Result addUser(User user,  @RequestParam("avatar")MultipartFile file) throws Exception {//
        List<User> users = personService.getByUserName(user.getUname());

        Result result = new Result();
        if (users.size() == 0) {
            int uid = personService.addPerson(user);
            String imgFold = ResourceUtils.getURL("classpath:").getPath() +  "static/src/uinfo/";
            File foldPath = new File(imgFold);
            if (!foldPath.exists()) {
                foldPath.mkdirs();
            }
            String imgPath = imgFold + uid + ".jpg";
            File imgPathFile = new File(imgPath);
            if (imgPathFile.exists()) {
                imgPathFile.delete();
            }
            file.transferTo(imgPathFile);
            user.setUavatar(imgPath);
            personService.updatePerson(user);
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("info", "Insert Success");
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("info", "The User Name Exists");
        }
        return result;
    }

    @RequestMapping("/updateAdmin")
    public Result updateAdmin(Admin admin) throws Exception {
        Result result = new Result();
        personService.updatePerson(admin);
        result.setStatus(Status.SUCCESS);
        return result;
    }

    //first edition, will be modified
    @RequestMapping("/updateUser")
    public Result updateUser(User user) throws Exception {
        Result result = new Result();
        personService.updatePerson(user);
        result.setStatus(Status.SUCCESS);
        return result;
    }

    @RequestMapping("/deleteAdminById")
    public Result deleteAdminById(@RequestParam("aid") Integer aid) throws Exception {
        Result result = new Result(Status.SUCCESS);
        personService.deleteAdminById(aid);
        return result;
    }

    private List<Game> transform(String listStr) throws Exception {
        if (listStr == null) return null;
        JSONArray array = JSONArray.parseArray(listStr);
        List<Game> games = new LinkedList<>();
        for(Object id:array){
            games.add(storeService.getGameById(Integer.parseInt(id.toString())));
        }
        return games;
    }
}
