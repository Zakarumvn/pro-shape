package com.proshape.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Size(max = 50)
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    private String type;

    @OneToMany(mappedBy = "category")
    @Column(nullable = true)
    private List<Exhib> exhibitions;

    @OneToMany(mappedBy = "category")
    @Column(nullable = true)
    private List<Model> models;

    public Category(){}

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Exhib> getExhibitions() {
        return exhibitions;
    }

    public void setExhibitions(List<Exhib> exhibitions) {
        this.exhibitions = exhibitions;
    }

    public List<Model> getModels() {
        return models;
    }

    public void setModels(List<Model> models) {
        this.models = models;
    }
}
