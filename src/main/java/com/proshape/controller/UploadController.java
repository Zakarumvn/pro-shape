package com.proshape.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Katarzyna on 2017-10-20.
 */
@RestController
@RequestMapping("/api/upload")
public class UploadController {


    @RequestMapping(value = "/object")
    @ResponseStatus(HttpStatus.OK)
    public void uploadObject(@RequestParam("file") MultipartFile file, @RequestParam("username")String username) throws IOException {
        byte[] bytes;

        if (!file.isEmpty()) {
            bytes = file.getBytes();
        }

    }
}
