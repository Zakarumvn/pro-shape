package com.proshape.controller;

import com.proshape.domain.File;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.service.FileService;
import com.proshape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Katarzyna on 2017-10-20.
 */
@RestController
@RequestMapping("api/file")
public class FileController {

    @Autowired
    UserService userService;

    @Autowired
    FileService fileService;


    @Transactional
    @PostMapping(value = "/upload")
    public int uploadObject(@RequestParam("file") List<MultipartFile> files,
                            @RequestParam("fileGroupName") String fileGroupName,
                            @RequestParam(value = "description", required = false) String description) throws IOException, SQLException {
        try{
            fileService.saveUploadedFiles(files, fileGroupName, description);
        } catch (IOException e){
            return 0;
        }

        return 1;
    }

    @GetMapping(value= "/getObject")
    public byte[] getObject(@RequestParam("fileName")String fileName){
        try{
            byte[] data = fileService.getObject(fileName);
            return data;
        } catch (IOException e){
            return null;
        }
    }

    @GetMapping(value= "/getMaterial")
    public byte[] getMaterial(@RequestParam("fileName")String fileName){
        try{
            byte[] data = fileService.getObject(fileName);
            return data;
        } catch (IOException e){
            return null;
        }
    }

    @GetMapping(value= "/getTexture")
    public byte[] getTexture(@RequestParam("fileName")String fileName) {
        try {
            byte[] data = fileService.getObject(fileName);
            return data;
        } catch (IOException e) {
            return null;
        }
    }

    @GetMapping(value = "/getFileNames")
    public List<String> getFileNames(@RequestParam("id")Long modelId){
        return fileService.getFileNamesForModelId(modelId);
    }

    @GetMapping(value= "getModelById")
    public Model getModelById(@RequestParam("id") Long modelId){
        Model model = fileService.findModelById(modelId);
        model.setFiles(fileService.getFilesForModelId(modelId));
        return model;
    }

    @GetMapping(value = "/getUserObjects")
    public List<Model> getUserObjects(){
        User user = userService.getUserWithAuthorities();
        return fileService.getModels(user.getId());
    }

    @GetMapping(value = "/getRank")
    public List<Model> getRank(){
        return fileService.getAllModels();
    }
}
