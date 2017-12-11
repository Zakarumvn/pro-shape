package com.proshape.domain;

import org.joda.time.Instant;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Katarzyna on 2017-11-21.
 */
@Entity
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modelName;
    private String modelDescription;
    private byte[] modelImage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")

    private User user;
    private Instant uploadDate;

    @OneToMany(mappedBy = "model")
    private List<File> files;

    @ManyToMany(mappedBy = "models")
    private List<Exhib> exhibitions;

    public Model() {}

    public Model(String modelName, String modelDescription, byte[] modelImage, User user, Instant uploadDate, List<File> files) {
        this.modelName = modelName;
        this.modelDescription = modelDescription;
        this.modelImage = modelImage;
        this.user = user;
        this.uploadDate = uploadDate;
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getModelDescription() {
        return modelDescription;
    }

    public void setModelDescription(String modelDescription) {
        this.modelDescription = modelDescription;
    }

    public byte[] getModelImage() {
        return modelImage;
    }

    public void setModelImage(byte[] modelImage) {
        this.modelImage = modelImage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Instant uploadDate) {
        this.uploadDate = uploadDate;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }
}
