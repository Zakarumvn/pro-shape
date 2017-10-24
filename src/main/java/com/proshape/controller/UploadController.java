package com.proshape.controller;

import com.proshape.security.SecurityUtils;
import com.proshape.service.UploadService;
import com.proshape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

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
    public void uploadObject(@RequestParam("file") List<MultipartFile> files, @RequestParam("fileGroupName") String fileGroupName) throws IOException, SQLException {
        uploadService.saveUploadedFiles(files, fileGroupName);
    }
}
