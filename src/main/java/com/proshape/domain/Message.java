package com.proshape.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 * Created by Katarzyna on 2017-12-16.
 */

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "userId")
    User user;

    @Size(max = 500)
    @Column(name = "message_content", length = 500)
    String messageContent;

    String postDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    Group group;

    public Message(){}

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public String getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        this.postDate = postDate;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}

