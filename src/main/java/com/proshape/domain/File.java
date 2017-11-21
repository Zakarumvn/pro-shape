package com.proshape.domain;

import com.proshape.domain.User;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.Instant;

import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;


/**
 * Created by Katarzyna on 2017-10-24.
 */
@Entity
@Table(name = "files")
public class File implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Size(max = 150)
    @Column(name = "file_name", length = 150)
    private String fileName;

    @Size(max = 150)
    @Column(name = "file_group", length = 150)
    private String fileGroup;

    private String fileExtension;

    private String description;

    private String path;

    @Column(name = "upload_date")
    private Instant uploadDate;

    private byte[] miniature;

    @ManyToOne
    @JoinColumn(name="modelId")
    private Model model;

    public File(){

    }

    public File(User user, String fileName, String fileGroup, String fileExtension, String description, String path, Instant uploadDate, byte[] miniature, Model model) {
        this.user = user;
        this.fileName = fileName;
        this.fileGroup = fileGroup;
        this.fileExtension = fileExtension;
        this.description = description;
        this.path = path;
        this.uploadDate = uploadDate;
        this.miniature = miniature;
        this.model = model;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileGroup() {
        return fileGroup;
    }

    public void setFileGroup(String fileGroup) {
        this.fileGroup = fileGroup;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Instant getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Instant uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getMiniature() {
        return miniature;
    }

    public void setMiniature(byte[] miniature) {
        this.miniature = miniature;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }
}
