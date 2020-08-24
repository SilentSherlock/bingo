package com.nwafu.bingo.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

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
}
