package com.proshape.controller;

import com.proshape.domain.Group;
import com.proshape.domain.User;
import com.proshape.service.GroupService;
import com.proshape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

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
    public List<Group> getAllGroups(){
        return groupService.getAllGroups();
    }

    @Transactional
    @PostMapping("/createGroup")
    public ResponseEntity createGroup(@RequestParam(value =  "file", required = false) MultipartFile file, @RequestParam("groupName") String groupName, @RequestParam("groupDescription") String groupDescription ) throws IOException {
        Group group =  new Group();
        group.setGroupImage(file.getBytes());
        group.setGroupName(groupName);
        group.setGroupDescription(groupDescription);
        if(groupService.createGroup(group) == 1){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/getGroup")
    public Group getGroup(){
        return  groupService.getGroupByUserId();
    }


    @GetMapping("/getGroupById")
    public Group getGroupById(@RequestParam("groupId") Long id){
        return  groupService.getGroupById(id);
    }

    @PostMapping("/updateGroup")
    public void updateGroup(Group group){
        groupService.updateGroup(group);
    }

    @PutMapping("/acceptMember")
    public void acceptUser(@RequestParam("member") User member){
        member.setAcceptedInGroup(true);
        groupService.updateMember(member, false);
    }

    @PutMapping("/deleteMember")
    public void deleteMember(@RequestParam("member") User member){
        member.setAcceptedInGroup(false);
        member.setGroup(null);
        groupService.updateMember(member, false);
        groupService.deleteMemberFromGroup(member);
    }

    @DeleteMapping("/deleteGroup")
    public void deleteGroup(Group group){
        group.setMembers(null);
        group.setActive(0);
        groupService.updateGroup(group);
        groupService.updateMember(userService.getUserWithAuthorities(group.getOwnerId()), true);

    }

}
