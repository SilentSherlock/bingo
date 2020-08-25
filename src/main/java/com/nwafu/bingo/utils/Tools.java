package com.nwafu.bingo.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
}
