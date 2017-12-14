package com.proshape.domain;

import org.joda.time.Instant;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = "exhibs")
public class Exhib implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 150)
    @Column(name = "name", length = 150, nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    /*@JoinTable(name = "exhib_model",
        joinColumns = @JoinColumn(name = "exhib_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "model_id", referencedColumnName = "id"))*/
    private List<Model> models;

    @ManyToOne
    @JoinColumn(name="groupId")
    private Group group;

    public Exhib(){}

    public Exhib(String name, String description, User user, List<Model> models) {
        this.name = name;
        this.description = description;
        this.user = user;
        this.models = models;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Model> getModels() {
        return models;
    }

    public void setModels(List<Model> models) {
        this.models = models;
    }
}
