package com.proshape.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

/**
 * Created by Katarzyna on 2017-11-29.
 */

@Entity(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    private String groupName;

    private byte[] groupImage;

    @Size(max = 500)
    private String groupDescription;

    private Long ownerId;

    @OneToMany
    private Set<User> members;

    @OneToMany(mappedBy = "group")
    private Set<Exhib> groupExhibitions;

    @OneToMany(mappedBy = "group")
    private Set<Model> groupModels;

    private int active;

    public Group(){
        this.active = 1;
    }

    public Group(String groupName, byte[] groupImage, String groupDescription, Long ownerId, Set<User> members, Set<Exhib> groupExhibitions, Set<Model> groupModels) {
        this.groupName = groupName;
        this.groupImage = groupImage;
        this.groupDescription = groupDescription;
        this.ownerId = ownerId;
        this.members = members;
        this.groupExhibitions = groupExhibitions;
        this.groupModels = groupModels;
    }


    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setGroupId(Long groupId) {
        this.id = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public byte[] getGroupImage() {
        return groupImage;
    }

    public void setGroupImage(byte[] groupImage) {
        this.groupImage = groupImage;
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    public Set<Exhib> getGroupExhibitions() {
        return groupExhibitions;
    }

    public void setGroupExhibitions(Set<Exhib> groupExhibitions) {
        this.groupExhibitions = groupExhibitions;
    }

    public Set<Model> getGroupModels() {
        return groupModels;
    }

    public void setGroupModels(Set<Model> groupModels) {
        this.groupModels = groupModels;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }


}

