package com.proshape.service;

import com.proshape.domain.*;
import com.proshape.repository.ExhibRepository;
import com.proshape.repository.CategoryRepository;
import com.proshape.repository.FileRepository;
import com.proshape.repository.ModelRepository;
import org.apache.commons.io.IOUtils;
import org.hibernate.Hibernate;
import org.joda.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.*;
import java.io.File;
import java.net.URL;
import java.sql.Blob;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    @Autowired
    ExhibRepository exhibRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public List<String> getFileNamesForModelId(Long modelId){
        return fileRepository.findAllByModelId(modelId).stream().map(file -> file.getFileName()).collect(Collectors.toList());
    }

    public List<com.proshape.domain.File> getFilesForModelId(Long modelId){
        return fileRepository.findAllByModelId(modelId);
    }

    public List<Model> getAllModels(){
        return modelRepository.findAll();
    }

    public Page<Model> getAllModels(Pageable pageable){
        return modelRepository.findAll(pageable);
    }

    public Model findModelById(Long modelId){
        return modelRepository.findModelById(modelId);
    }

    @Transactional
    public int saveUploadedFiles(List<MultipartFile> files, String fileGroupName, String description) throws IOException{
        int resultCode = 1;
        User user = userService.getUserWithAuthorities();
        String uploadDirectoryPath = System.getProperty("user.home") + "\\uploadResources";

        Path userDirPath = Paths.get(uploadDirectoryPath + "\\" + user.getId().toString());
        String fileExtension, filePath, originalFilename = "";
        String currentDate = Instant.now().toString();

        try{
            if(!Files.exists(userDirPath)){
                Files.createDirectory(userDirPath);
            }
        } catch (IOException e){
            e.printStackTrace();
        }

        InputStream in = getClass().getResourceAsStream("/img/default.jpg");
        byte[] image = IOUtils.toByteArray(in);
        Model model = new Model(fileGroupName, description, image, user, currentDate, null, null);
        modelRepository.save(model);

        Set<com.proshape.domain.File> fileList = new HashSet<>();
        for (MultipartFile file : files) {
            originalFilename = file.getOriginalFilename();
            fileExtension = originalFilename.substring(originalFilename.length() - 4);
            File convertedFile = new File(userDirPath.toString(), originalFilename);

            if (!convertedFile.exists()) {
                saveUploadedFileOnFileSystem(file, convertedFile);

                filePath = user.getId().toString() + "\\" + originalFilename;

                com.proshape.domain.File fileDB = new com.proshape.domain.File(user, originalFilename, fileGroupName, fileExtension, description, filePath, currentDate, null, model);
                fileList.add(fileDB);
                fileRepository.save(fileDB);
            }
        }

        model.setFiles(fileList);
        modelRepository.save(model);
        return resultCode;
    }

    private void saveUploadedFileOnFileSystem(MultipartFile file, File convertedFile ) throws IOException {
            convertedFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convertedFile);
            fos.write(file.getBytes());
            fos.close();
    }

    @Transactional
    public void saveModelPicture(Long id, byte[] picture){
        Model model = modelRepository.findModelById(id);
        model.setModelImage(picture);
        modelRepository.save(model);
    }

    public Set<com.proshape.domain.File> getFilesForUserId(Long userId){
        return fileRepository.findAllByUserId(userId);
    }

    public byte[] getObject(String fileName, Long authorId) throws IOException {
        Path path = Paths.get(System.getProperty("user.home") + "/uploadResources" + "/" + authorId + "/" + fileName);
        byte[] data = Files.readAllBytes(path);
        return data;
    }

    public List<com.proshape.domain.Model> getModels(Long userId) {
        return modelRepository.findALlByUserId(userId);
    }

    @Transactional
    public boolean deleteModel(Long modelId){
        String uploadDirectoryPath = System.getProperty("user.home") + "\\uploadResources";
        Model model = modelRepository.findModelById(modelId);
        List<com.proshape.domain.File> files = fileRepository.findAllByModelId(modelId);
        boolean result = false;

        for(com.proshape.domain.File file: files){
            File f = new File(uploadDirectoryPath + "\\"+ file.getPath());
            result = f.delete();
        }
        List<Exhib> exhibs = model.getExhibitions();
        for(Exhib exhib: exhibs){
            List<Model> models = exhib.getModels();
            models.remove(model);
            exhibRepository.save(exhib);
        }
        model.setExhibitions(null);

        fileRepository.delete(files);
        modelRepository.delete(model);

        return result;

    }

    public List<Model> getThreeRecentModels(Pageable pageable){
        return modelRepository.findAll(pageable).getContent();
    }

    public List<String> getUserFileNames(Long id) {
        Set<com.proshape.domain.File> files = fileRepository.findAllByUserId(id);
        List<String> fileNames = new ArrayList<>();
        if (files.size() > 0) {
            files.forEach(f -> fileNames.add(f.getFileName()));
        }

        return fileNames;
    }

    public void updateModel(Long modelId, String modelName, String modelDescription, Long categoryId){
        Model model = modelRepository.findModelById(modelId);
        model.setModelName(modelName);
        model.setModelDescription(modelDescription);

        Category category = categoryRepository.findByCategoryId(categoryId);
        model.setCategory(category);
        modelRepository.save(model);
    }

}
