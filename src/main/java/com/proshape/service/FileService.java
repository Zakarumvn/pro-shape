package com.proshape.service;

import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.repository.FileRepository;
import com.proshape.repository.ModelRepository;
import org.joda.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Katarzyna on 2017-10-24.
 */
@Service
public class FileService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ModelRepository modelRepository;

    @Autowired
    UserService userService;

    public List<String> getFileNamesForModelId(Long modelId){
        return fileRepository.findAllByModelId(modelId).stream().map(file -> file.getFileName()).collect(Collectors.toList());
    }

    public List<com.proshape.domain.File> getFilesForModelId(Long modelId){
        return fileRepository.findAllByModelId(modelId);
    }

    public List<Model> getAllModels(){
        return modelRepository.findAll();
    }

    public Model findModelById(Long modelId){
        return modelRepository.findModelById(modelId);
    }

    @Transactional
    public void saveUploadedFiles(List<MultipartFile> files, String fileGroupName, String description) throws IOException{
        User user = userService.getUserWithAuthorities();
        String uploadDirectoryPath = System.getProperty("upload.location");
        Path userDirPath = Paths.get(uploadDirectoryPath + "\\" + user.getId().toString());
        String originalFilename = "";
        String fileExtension = "";
        Instant currentDate = Instant.now();

        try{
            if(!Files.exists(userDirPath)){
                Files.createDirectory(userDirPath);
            }
        } catch (IOException e){
            e.printStackTrace();
        }

        Model model = new Model();
        model.setUploadDate(currentDate.toString());
        model.setUser(user);
        model.setModelDescription(description);
        model.setModelName(fileGroupName);
        modelRepository.save(model);
        List<com.proshape.domain.File> fileList = new ArrayList<>();


        for (int i = 0; i < files.size(); i++) {
            originalFilename = files.get(i).getOriginalFilename();
            fileExtension = originalFilename.substring(originalFilename.length() - 4);
            File convertedFile = new File(userDirPath.toString(), originalFilename);
            convertedFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convertedFile);
            fos.write(files.get(i).getBytes());
            fos.close();

            com.proshape.domain.File fileDB = new com.proshape.domain.File();
            fileDB.setUser(user);
            fileDB.setFileName(originalFilename);
            fileDB.setFileExtension(fileExtension);
            fileDB.setPath(user.getId().toString() + "\\" + originalFilename);
            fileDB.setFileGroup(fileGroupName);
            fileDB.setUploadDate(currentDate.toString());
            fileDB.setModel(model);
            fileList.add(fileDB);
            fileRepository.save(fileDB);
        }

        model.setFiles(fileList);
        modelRepository.save(model);

    }

    public List<com.proshape.domain.File> getFilesForUserId(Long userId){
        return fileRepository.findAllByUserId(userId);
    }

    public byte[] getObject(String fileName) throws IOException {
        User user = userService.getUserWithAuthorities();
        Path path = Paths.get(System.getProperty("upload.location") + "/" + user.getId() + "/" + fileName);
        byte[] data = Files.readAllBytes(path);
        return data;
    }

    public List<com.proshape.domain.Model> getModels(Long userId) {
        return modelRepository.findALlByUserId(userId);
    }
}
