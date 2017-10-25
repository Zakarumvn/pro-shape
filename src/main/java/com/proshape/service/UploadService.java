package com.proshape.service;

import com.proshape.domain.User;
import com.proshape.repository.FileRepository;
import org.joda.time.DateTime;
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
import java.sql.Date;
import java.util.List;

/**
 * Created by Katarzyna on 2017-10-24.
 */
@Service
public class UploadService {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void saveUploadedFiles(List<MultipartFile> files, String fileGroupName) throws IOException{
        User user = userService.getUserWithAuthorities();
        String uploadDirectoryPath = System.getProperty("upload.location");
        Path userDirPath = Paths.get(uploadDirectoryPath + "\\" + user.getId().toString());
        String originalFilename = "";
        String fileName = "";
        String fileExtension = "";

        try{
            if(!Files.exists(userDirPath)){
                Files.createDirectory(userDirPath);
            }
        } catch (IOException e){
            e.printStackTrace();
        }

        for (int i = 0; i < files.size(); i++) {
            originalFilename = files.get(i).getOriginalFilename();
            fileExtension = originalFilename.substring(originalFilename.length() - 4);
            fileName = fileGroupName + i;
            File convertedFile = new File(userDirPath.toString(), fileName + fileExtension);
            convertedFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convertedFile);
            fos.write(files.get(i).getBytes());
            fos.close();

            com.proshape.domain.File fileDB = new com.proshape.domain.File();
            fileDB.setUser(user);
            fileDB.setFileName(fileName);
            fileDB.setFileExtension(fileExtension);
            fileDB.setPath(user.getId().toString() + "\\" + fileName + fileExtension);
            fileDB.setFileGroup(fileGroupName);
            fileDB.setUploadDate(new DateTime());

           // fileRepository.save(fileDB);
        }


    }

}
