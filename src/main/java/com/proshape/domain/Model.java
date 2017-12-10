package com.proshape.domain;

import org.joda.time.Instant;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private String uploadDate;

    @OneToMany(mappedBy = "model")
    private Set<File> files;

    @ManyToMany(mappedBy = "models", fetch=FetchType.EAGER)
    private Set<Exhib> exhibitions;

    @ManyToOne
    @JoinColumn(name="groupId")
    private Group group;

    public Model() {}

    public Model(String modelName, String modelDescription, byte[] modelImage, User user, String uploadDate, Set<File> files, Set<Exhib> exhibitions) {
        this.modelName = modelName;
        this.modelDescription = modelDescription;
        this.modelImage = modelImage;
        this.user = user;
        this.uploadDate = uploadDate;
        this.files = files;
        this.exhibitions = exhibitions;
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

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Set<File> getFiles() {
        return files;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }

    public Set<Exhib> getExhibitions() {
        return exhibitions;
    }

    public void setExhibitions(Set<Exhib> exhibitions) {
        this.exhibitions = exhibitions;
    }
}
