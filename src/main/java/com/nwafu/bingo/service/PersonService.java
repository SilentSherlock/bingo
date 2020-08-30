package com.nwafu.bingo.service;

import com.nwafu.bingo.dao.AdminDao;
import com.nwafu.bingo.dao.UserDao;
import com.nwafu.bingo.entity.Admin;
import com.nwafu.bingo.entity.Post;
import com.nwafu.bingo.entity.User;
import com.nwafu.bingo.utils.Search;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/20
 * Description: 人员管理类，封装对管理员和用户两个实体的操作，并定义一些服务
 * 验证功能
 * 获取所有用户，管理员
 * 根据id获取用户
 * 添加，删除用户
 * 添加，删除管理员
 */
@Service
public class PersonService {

    @Resource
    private AdminDao adminDao;
    @Resource
    private UserDao userDao;
    private static final String CLASSNAME = "PersonService";
    /*对管理员登录进行验证*/
    public Admin validateAdmin(String name, String password) throws Exception{
        return (Admin) validate(name, password, 0);
    }
    /*对用户登录进行验证*/
    public User validateUser(String name, String password) throws Exception {
        return (User) validate(name, password, 1);
    }
    /*
    * 0----管理员验证
    * 1----用户验证
    * */
    private Object validate(String name, String password, int type) throws Exception{

        Object result = new Object();
        List<Admin> admins;
        List<User> users;

        if (type == 0) {
            String status = "Admin Validate";
            log(status);
            admins = adminDao.getByName(name);
            for (Admin admin : admins) {
                if (admin.getPassword().equals(password)) {
                    log(status + " success");
                    result = admin;
                    break;
                }
            }
            if(result instanceof Admin){
                System.out.println("Validate success");
            }else {
                result = null;
            }
        }else if(type == 1) {
            String status = "User Validate";
            log(status);
            users = userDao.getByName(name);
            for (User user : users) {
                if (user.getPassword().equals(password)) {
                    log(status + " success");
                    result = user;
                    break;
                }
            }

            /**
             * 判断类型是否为user或者admin，否则会导致类型转换失败
             */
            if(result instanceof User){
                System.out.println("Validate success");
            }else {
                result = null;
            }
        }else {
            log(" type " + type + " is invalid!");
            return null;
        }

        return result;
    }


    public List<User> getAllUser() throws Exception {
        String status = "PersonService: Get All Users";
        System.out.println(status);
        List<User> users = userDao.getAll();
        if (users != null) {
            System.out.println(status + " success");
            return users;
        }
        return null;
    }

    public List<Admin> getAllAdmin() throws Exception {
        String status = "Get all Admin";
        System.out.println(CLASSNAME + " " + status);
        List<Admin> admins = adminDao.getAll();
        if (admins != null) {
            System.out.println(CLASSNAME + " " + status + " success");
            return admins;
        }
        return null;
    }


    public User getUserById(Integer id) throws Exception {
        String status = "Get user by Id";
        System.out.println(CLASSNAME + " " + status);
        User user = userDao.getById(id);
        if (user != null) {
            System.out.println(CLASSNAME + " " + status + " success");
            return user;
        }
        return null;
    }

    public List<User> getByUserName(String name) throws Exception {
        return userDao.getByName(name);
    }

    public List<Admin> getByAdminName(String name) throws Exception {
        return adminDao.getByName(name);
    }
    public int addPerson(Object object) throws Exception{
        String status = "Add Person";
        int generateId = 0;
        log(status);
        if (object != null) {
            if (object instanceof Admin) {
                Admin admin = (Admin) object;
                adminDao.add(admin);
                generateId = admin.getAid();
            }else if (object instanceof User) {
                User user = (User) object;
                userDao.add((User) object);
                generateId = user.getUid();
            }
        }
        log(status + " Parameter null or wrong type");
        return generateId;
    }

    public void deleteAdminById(Integer id) throws Exception {
        String status = "Delete Admin";
        adminDao.deleteById(id);
        log(status + "  success" );
    }

    public void updatePerson(Object object) throws Exception {
        String status = "Update Person";
        log(status);
        if (object != null) {
            if (object instanceof Admin) {
                adminDao.update((Admin) object);
            }else if (object instanceof User) {
                userDao.update((User) object);
            }
        }
        log(status + " Parameter null or wrong type");
    }

    public List<User> getUserPage(Integer current_index, Integer size) throws Exception {
        List<User> list = userDao.getUserPage(current_index,size);
        if(list.size() == 0){
            return null;
        }else {
            return list;
        }
    }
    public Integer getUserCount(Search search){
        Integer allSearchNum = userDao.getUserCount(search);
        return (int)Math.ceil((double)allSearchNum / (double)search.getPageCount());
    }
    private void log(String status) {
        System.out.println(CLASSNAME + " " + status);
    }


}
