package com.proshape.domain;

import com.proshape.domain.User;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.Instant;

import javax.persistence.*;
import javax.validation.constraints.Size;


/**
 * Created by Katarzyna on 2017-10-24.
 */
@Entity
@Table(name = "files")
public class File {
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

    private String path;

    @Column(name = "upload_date")
    private Instant uploadDate;

    public File(){

    }

    public File(User user, String fileName, String fileGroup, String fileExtension, String path, Instant uploadDate) {
        this.user = user;
        this.fileName = fileName;
        this.fileGroup = fileGroup;
        this.fileExtension = fileExtension;
        this.path = path;
        this.uploadDate = uploadDate;
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
}
