package com.proshape.controller;

import com.codahale.metrics.annotation.Timed;
import com.proshape.domain.Group;
import com.proshape.domain.Message;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.service.GroupService;
import com.proshape.service.UserService;
import com.proshape.web.rest.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Set;

/**
 * Created by Katarzyna on 2017-11-29.
 */

@RestController
@RequestMapping("api/group")
public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @GetMapping("/getAllGroups")
    public Set<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @Transactional
    @PostMapping("/createGroup")
    public ResponseEntity createGroup(@RequestParam("groupName") String groupName, @RequestParam("groupDescription") String groupDescription) throws IOException {
        Group group = new Group();
        group.setGroupName(groupName);
        group.setGroupDescription(groupDescription);
        if (groupService.createGroup(group) == 1) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/getGroup")
    public Group getGroup() {
        return groupService.getGroupByUserId();
    }


    @GetMapping("/getGroupById")
    public Group getGroupById(@RequestParam("groupId") String id) {
        return groupService.getGroupById(Long.parseLong(id));
    }

    @PostMapping("/updateGroup")
    public void updateGroup(@RequestParam("id") String groupId,
                            @RequestParam("groupDescription") String groupDescription,
                            @RequestParam("groupName") String groupName) {
        groupService.updateGroup(Long.parseLong(groupId), groupName, groupDescription);
    }

    @PutMapping("/acceptMember")
    public void acceptUser(@RequestParam("member") String memberId) {
        groupService.acceptUserInGroup(Long.parseLong(memberId));
    }

    @PutMapping("/deleteMember")
    public void deleteMember(@RequestParam("member") String memberId) {
        groupService.deleteMemberFromGroup(Long.parseLong(memberId));
    }

    @DeleteMapping("/deleteGroup")
    public void deleteGroup(@RequestParam String groupId) {
        groupService.deleteGroup(Long.parseLong(groupId));
    }

    @PostMapping("/joinGroup")
    public void joinGroup(@RequestParam("groupId") String groupId) {
        groupService.joinGroup(Long.parseLong(groupId));
    }

    @PostMapping("/leaveGroup")
    public void leaveGroup(@RequestParam("groupId") String groupId) {
        groupService.leaveGroup(Long.parseLong(groupId));
    }

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestParam("content")String content, @RequestParam("groupId") Long groupId, @RequestParam("userId") Long userId) {
        groupService.sendMessage(content, groupId, userId);
    }

    @GetMapping("/getMessages")
    @Timed
    public ResponseEntity<List<Message>> getMessages(@RequestParam("size") Integer size, @RequestParam("sort") String sort, @RequestParam("page") Integer pageNr, @RequestParam("groupId") String groupId) {
        Pageable pageable = new PageRequest(pageNr, size, Sort.Direction.DESC, "postDate");
        final Page<Message> page = groupService.getMessages(pageable, Long.parseLong(groupId));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/group/getMessages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping("/editMessage")
    public void editMessage(@RequestParam("messageId")String messageId, @RequestParam("content")String content) {
        groupService.editMessage(content, Long.parseLong(messageId));
    }

    @DeleteMapping("/deleteMessage")
    public void deleteMessage(String messageId){
        groupService.deleteMessage(Long.parseLong(messageId));
    }
}

