package com.proshape.controller;

import com.codahale.metrics.annotation.Timed;
import com.proshape.domain.File;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.service.FileService;
import com.proshape.service.UserService;
import com.proshape.service.dto.UserDTO;
import com.proshape.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
            if(fileService.saveUploadedFiles(files, fileGroupName, description) == 0) return 2;
        } catch (IOException e){
            return 0;
        }

        return 1;
    }

    @Transactional
    @PostMapping(value = "/pictureUpload")
    public void uploadPicutre(@RequestParam("id") Long id, @RequestParam("picture") MultipartFile picture)throws IOException, SQLException {

        fileService.saveModelPicture(id, picture.getBytes());
    }

    @GetMapping(value= "/getObject")
    public byte[] getObject(@RequestParam("fileName")String fileName, @RequestParam("author")String id){
        try{
            byte[] data = fileService.getObject(fileName, Long.parseLong(id));
            return data;
        } catch (IOException e){
            return null;
        }
    }

    @GetMapping(value= "/getMaterial")
    public byte[] getMaterial(@RequestParam("fileName")String fileName, @RequestParam("author")String id){
        try{
            byte[] data = fileService.getObject(fileName, Long.parseLong(id));
            return data;
        } catch (IOException e){
            return null;
        }
    }


    @GetMapping(value= "/getTexture")
    public byte[] getTexture(@RequestParam("fileName")String fileName, @RequestParam("author")String id) {
        try {
            byte[] data = fileService.getObject(fileName, Long.parseLong(id));
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
        Set f = new HashSet(fileService.getFilesForModelId(modelId));
        model.setFiles(f);
        return model;
    }

    @GetMapping(value = "/getUserObjects")
    public List<Model> getUserObjects(){
        User user = userService.getUserWithAuthorities();
        return fileService.getModels(user.getId());
    }

    @GetMapping(value = "/getUserFileNames")
    public List<String> getUserFileNames(){
        User user = userService.getUserWithAuthorities();
        return fileService.getUserFileNames(user.getId());
    }


    @GetMapping(value = "/getRank")
    public List<Model> getRank(){
        return fileService.getAllModels();
    }

    @PostMapping("/deleteModel")
    public boolean deleteModel(@RequestParam("modelId") String modelId){
        return fileService.deleteModel(Long.parseLong(modelId));
    }

    @PostMapping("/rank")
    @Timed
    public ResponseEntity<List<Model>> getAllModels(@RequestParam("size") Integer size, @RequestParam("sort") String sort, @RequestParam("page") Integer pageNr) {
        Pageable pageable = new PageRequest(pageNr, size);
        final Page<Model> page = fileService.getAllModels(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/file/rank");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/homeModels")
    public List<Model> getThreeRecentModels(){
        Pageable pageable = new PageRequest(0, 3, Sort.Direction.DESC, "uploadDate");
        return fileService.getThreeRecentModels(pageable);
    }




    @PostMapping("/updateModel")
    public void updateModel(@RequestParam("modelId") Long modelId,
                            @RequestParam("modelName") String modelName,
                            @RequestParam("modelDescription") String modelDescription,
                            @RequestParam("categoryId") Long categoryId){
        fileService.updateModel(modelId, modelName, modelDescription, categoryId);
    }
}
