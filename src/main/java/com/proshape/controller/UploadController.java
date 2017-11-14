package com.proshape.controller;

import com.proshape.service.UploadService;
import com.proshape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Katarzyna on 2017-10-20.
 */
@RestController
@RequestMapping("api/upload")
public class UploadController {

    @Autowired
    UserService userService;

    @Autowired
    UploadService uploadService;

    @PostMapping(value = "/object")
    public int uploadObject(@RequestParam("file") List<MultipartFile> files, @RequestParam("fileGroupName") String fileGroupName) throws IOException, SQLException {
        try{
            uploadService.saveUploadedFiles(files, fileGroupName);
        } catch (IOException e){
            return 0;
        }

        return 1;
    }

    @GetMapping(value= "/getObject")
    public byte[] getObject(@RequestParam("fileName")String fileName){
        try{
            byte[] data = uploadService.getObject(fileName);
            return data;
        } catch (IOException e){
            return null;
        }
    }

}
