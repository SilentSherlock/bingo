package com.nwafu.bingo.utils;

import com.nwafu.bingo.entity.Admin;
import com.nwafu.bingo.entity.Post;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.Date;

/**
 * Date: 2020/8/22
 * Description: 工具类
 */
public class Tools {

    public void fileUpload(String filePath, MultipartFile multipartFile) throws IOException {

        /*先进入到文件夹,文件夹不存在就创建*/
        File test = new File(filePath);
        if (!test.exists()) {
            test.mkdirs();
        }
        /*如果文件存在,先删除再保存*/
        File uploadFilePath = new File(filePath + multipartFile.getOriginalFilename());
        if (uploadFilePath.exists()) {
            uploadFilePath.delete();
        }
        multipartFile.transferTo(uploadFilePath);
    }

   /* public static void main(String[] args) throws Exception {
        Tools tools = new Tools();
        Post post = new Post();
        Admin admin = new Admin();
        admin.setAid(2121);
        admin.setAname("fdafd");
        admin.setPassword("");
        boolean result = tools.validateObject(admin);
        System.out.println(result);
    }*/
    /**
     * 校验对象属性是否都被赋值
     */
    public boolean validateObject(Object object) throws Exception {
        if (object == null) return false;

        Field[] fields = object.getClass().getDeclaredFields();
        String[] propTypes = new String[fields.length];
        String[] propNames = new String[fields.length];

        for (int i = 0; i < fields.length; i++) {
            propTypes[i] = fields[i].getType().toString();
            System.out.println("type: " + propTypes[i]);
            propNames[i] = fields[i].getName().substring(0,1).toUpperCase() + fields[i].getName().substring(1);
        }

        //其他不同属性检测可继续添加
        for (int i = 0; i < propTypes.length; i++) {
            Method method = object.getClass().getMethod("get" + propNames[i]);
            switch (propTypes[i]){
                case "class java.lang.Integer":
                    Integer intValue = (Integer) method.invoke(object);
                    if (intValue == null) return false;
                    break;
                case "class java.lang.String":
                    String strValue = (String) method.invoke(object);
                    if (strValue == null || "".equals(strValue)) return false;
                    break;
                case "class java.util.Date":
                    Date date = (Date) method.invoke(object);
                    if (date == null) return false;
                default:
                    throw new Exception("Tools validateObject get unknown property type");
            }
        }
        return true;
    }
    /**
    * @MethodName getDays
    * @Description 获取两个Date之间的天数差
    * @Param [nowTime, targetTime]
    * @return long
    * @author yolia
    * @Date 9:44 2020/8/25
    **/
    public static long getDays(Date nowTime, Date targetTime){
        long diff = targetTime.getTime() - nowTime.getTime();
        long days = diff / (1000 * 60 * 60 * 24);
        return days;
    }
    /**
    * @MethodName setHMS20
    * @Description 将时间的Hour、Minute、Second清零
    * @Param [now]
    * @return java.util.Date
    * @author yolia
    * @Date 16:18 2020/8/27
    **/
    public static Date setHMS20(Date now){
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(now);
        // 将时分秒,毫秒域清零
        cal1.set(Calendar.HOUR_OF_DAY, 0);
        cal1.set(Calendar.MINUTE, 0);
        cal1.set(Calendar.SECOND, 0);
        cal1.set(Calendar.MILLISECOND, 0);

        return cal1.getTime();
    }
}
