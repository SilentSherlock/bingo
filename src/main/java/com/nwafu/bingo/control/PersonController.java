package com.nwafu.bingo.control;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.nwafu.bingo.entity.Admin;
import com.nwafu.bingo.entity.Game;
import com.nwafu.bingo.entity.User;
import com.nwafu.bingo.service.MailService;
import com.nwafu.bingo.service.PersonService;
import com.nwafu.bingo.service.StoreService;
import com.nwafu.bingo.service.TextSearchService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Search;
import com.nwafu.bingo.utils.Status;
import com.nwafu.bingo.utils.Tools;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.*;


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
    @Resource
    private MailService mailService;
    @Resource
    private TextSearchService textSearchService;
    private String code = "";

    @RequestMapping("/adminValidate")
    public Result adminValidate(Admin admin, HttpSession httpSession) throws Exception {
        Result result = new Result();
        Admin admin1 = personService.validateAdmin(admin.getAname(), admin.getPassword());
        if (admin1 != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("admin", admin1);
            httpSession.setAttribute("loginAdmin", admin1);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/userValidate")
    public Result userValidate(User user, HttpSession httpSession) throws Exception {
        Result result = new Result();
        User user1 = personService.validateUser(user.getUname(), user.getPassword());
        if (user1 != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("user", user1);
            httpSession.setAttribute("loginUser", user1);
        }else {
            result.setStatus(Status.FAILURE);
        }
        return result;
    }

    @RequestMapping("/isAdminLogin")
    public Result isAdminLogin(HttpSession httpSession) {
        Admin admin = (Admin) httpSession.getAttribute("loginAdmin");
        Result result = new Result();
        if (admin != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("loggedAdminInfo", admin);
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("msg", "admin is null");
        }

        return result;
    }

    @RequestMapping("/adminLogout")
    public Result adminLogout(HttpSession httpSession) {
        Result result = new Result();
        Admin admin = (Admin) httpSession.getAttribute("loginAdmin");
        if (admin != null) {
            httpSession.removeAttribute("loginAdmin");
            result.setStatus(Status.SUCCESS);
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("msg", "logout failed, There's no admin");
        }
        return result;
    }
    @RequestMapping("/isLogin")
    public Result isLogin(HttpSession httpSession) {
        User user = (User) httpSession.getAttribute("loginUser");
        Result result = new Result();
        if (user != null) {
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("loggedUserInfo", user);
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("msg", "user is null");
        }

        return result;
    }

    @RequestMapping("/logout")
    public Result logout(HttpSession httpSession) {
        Result result = new Result();
        User user = (User) httpSession.getAttribute("loginUser");
        if (user != null) {
            httpSession.removeAttribute("loginUser");
            result.setStatus(Status.SUCCESS);
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("msg", "logout failed, There's no user");
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

    /*not mkdir
    * update: add mkdir
    * */
    @RequestMapping("/addUser")
    public Result addUser(User user) throws Exception {//
        List<User> users = personService.getByUserName(user.getUname());

        Result result = new Result();
        if (users.size() == 0) {
            String imgFold = ResourceUtils.getURL("classpath:").getPath() +  "static/src/uinfo/";
            File foldPath = new File(imgFold);
            if (!foldPath.exists()) {
                foldPath.mkdirs();
            }
            user.setUalias(user.getUname());
            user.setUavatar("/src/avatar_default.png");
            personService.addPerson(user);
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

    @RequestMapping("/updateUserNoPhoto")
    public Result updateUserNoPhoto(User user) throws Exception {
        Result result = new Result();
        personService.updatePerson(user);
        result.setStatus(Status.SUCCESS);
        return result;
    }

    //second edition, may be modified
    @RequestMapping("/updateUser")
    public Result updateUser(User user, @RequestParam("avatar")MultipartFile file) throws Exception {
        Result result = new Result();
        personService.updatePerson(user);

        if (file != null) {
            int uid = user.getUid();
            String imgSrc = "/src/uinfo/" + uid + ".jpg";
            String imgPath = ResourceUtils.getURL("classpath:").getPath() + "static" + imgSrc;
            File img = new File(imgPath);
            if (img.exists()) {
                img.delete();
            }
            file.transferTo(img);
            user.setUavatar(imgSrc);
            personService.updatePerson(user);
        }
        result.setStatus(Status.SUCCESS);
        return result;
    }

    /*
    * mode
    * 1----愿望单中增加游戏
    * 0----愿望单中删除游戏
    * */
    @RequestMapping("/updateWishListById")
    public Result updateWishListById(@RequestParam("uid") Integer uid, @RequestParam("gid") Integer gid, @RequestParam("mode") int mode) throws Exception {
        return updateGameListOrWishList(uid, gid, mode, 1);
    }

    /*
    * mode
    * 0----个人账户中增加游戏
    * 1----个人账户中删除游戏
    * */
    @RequestMapping("/updateGameListById")
    public Result updateGameListById(@RequestParam("uid") Integer uid, @RequestParam("gid") String gids, @RequestParam("mode") int mode) throws Exception {
        JSONArray jsonArray = JSON.parseArray(gids);
        Result result = new Result();
        User user = personService.getUserById(uid);
//        String oldGameList = user.getGamelist();

        for (Object gid : jsonArray) {
            Integer gidInt = (Integer) gid;
            Result tmp = updateGameListOrWishList(uid, gidInt, mode, 0);
            if (tmp.getStatus() == Status.FAILURE) {
                /*result.setStatus(Status.FAILURE);
                result.getResultMap().put("msg", "add gid by list failed");
                user.setGamelist(oldGameList);
                personService.updatePerson(user);*/
                System.out.println("多出一条游戏，应前端沙雕需求，不返回错误");
            }
        }
        result.setStatus(Status.SUCCESS);
        return result;
    }

    /*
    * listType
    * 0----GameList
    * 1----WishList
    * */
    private Result updateGameListOrWishList(Integer uid, Integer gid, int mode, int listType) throws Exception {
        Result result = new Result();

        if (uid != null && gid != null) {
            User user = personService.getUserById(uid);
            String list = "";

            if (listType == 0) list = user.getGamelist();
            else if (listType == 1) list = user.getWishlist();

            JSONArray jsonArray;
            if (list == null || list.length() == 0 || "null".equals(list)) jsonArray = new JSONArray();
            else jsonArray = JSON.parseArray(list);

            if (mode == 1) {
                if (jsonArray.isEmpty() || !jsonArray.contains(gid)) {
                    jsonArray.add(gid);
                    result.setStatus(Status.SUCCESS);
                }else {
                    result.setStatus(Status.FAILURE);
                    result.getResultMap().put("msg", "the game is in the gamelist or wishlist");
                }

            }else if (mode == 0) {
                int target = jsonArray.indexOf(gid);
                if (target == -1) {
                    result.setStatus(Status.FAILURE);
                    result.getResultMap().put("msg", "list doesn't contains the game");
                }else {
                    jsonArray.remove(target);
                    result.setStatus(Status.SUCCESS);
                }
            }

            list = JSON.toJSONString(jsonArray);
            if (listType == 0) user.setGamelist(list);
            else if (listType == 1) user.setWishlist(list);

            personService.updatePerson(user);
        }else {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("msg", "uid or gid is null!");
        }

        return result;
    }
    @RequestMapping("/deleteAdminById")
    public Result deleteAdminById(@RequestParam("aid") Integer aid) throws Exception {
        Result result = new Result(Status.SUCCESS);
        personService.deleteAdminById(aid);
        return result;
    }

    /*
    * 0----管理员验证
    * 1----用户验证
    * */
    @RequestMapping("/validateNameLegality")
    public String validateNameLegality(@RequestParam("name") String name, @RequestParam("type") Integer type) throws Exception{
        Map<String, String> resultMap = new HashMap<>();
        if (name != null && !"".equals(name)) {
            if (type == 0) {
                List<Admin> admins = personService.getByAdminName(name);
                if (admins.size() != 0) {
                    resultMap.put("valid", "false");
                }else {
                    resultMap.put("valid", "true");
                }
            }else if(type == 1) {
                List<User> users = personService.getByUserName(name);
                if (users.size() != 0) {
                    resultMap.put("valid", "false");
                }else {
                    resultMap.put("valid", "true");
                }
            }
        }else {
            resultMap.put("valid", "false");
        }

        return JSON.toJSONString(resultMap);
    }

    private List<Game> transform(String listStr) throws Exception {
        System.out.println("str: " + listStr);
        if (listStr == null || "".equals(listStr) || "null".equals(listStr)) return null;
        JSONArray array = JSONArray.parseArray(listStr);
        List<Game> games = new LinkedList<>();
        for(Object id:array){
            games.add(storeService.getGameById(Integer.parseInt(id.toString())));
        }
        return games;
    }

    @RequestMapping("user_register_code")
    public String user_register_code(@RequestParam("code") String code) {
        System.out.println(code);
        Map<String, String> result = new HashMap<>();
        if (code.equals(this.code))
            result.put("valid", "true");
        else
            result.put("valid", "false");
        return JSON.toJSONString(result);
    }
    //验证
    @RequestMapping("user_register_send_code")
    public Result user_register_send_code(@RequestParam("umail") String umail) {
        code = String.valueOf(new Date().getTime()).substring(7);
        String text = "您的验证码为：" + code;
        String subject = "彬果游戏(Bingo)—注册";

        mailService.sendSimpleEmail(umail, subject, text);

        return new Result(Status.SUCCESS, null);
    }

    @RequestMapping("getUserPage")
    public Result getUserPage(Search search) throws Exception {
        Result result;
        List<User> list= personService.getUserPage(search.getPageIndex(),search.getPageCount());
        if(list==null){
            result = new Result(Status.FAILURE);
            result.getResultMap().put("getUserpage", "获取失败");
        }else {
            result = new Result();
            Integer searchNum = personService.getUserCount(search);
            result.getResultMap().put("searchList", list);
            result.getResultMap().put("allSearchNum",searchNum);
            result.setStatus(Status.SUCCESS);
        }
        return result;
    }
}
