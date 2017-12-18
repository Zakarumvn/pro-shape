package com.proshape.service;

import com.proshape.domain.Authority;
import com.proshape.domain.Group;
import com.proshape.domain.Message;
import com.proshape.domain.User;
import com.proshape.repository.GroupRepository;
import com.proshape.repository.MessageRepository;
import com.proshape.repository.UserRepository;
import com.proshape.security.AuthoritiesConstants;
import org.joda.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.proshape.domain.User_.authorities;

/**
 * Created by Katarzyna on 2017-11-29.
 */

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    public Set<Group> getAllGroups(){
        return groupRepository.findByActive(1);
    }

    @Transactional
    public int createGroup(Group group){
        User user = userService.getUserWithAuthorities();
        if(!checkIfUserIsModerator(user.getId())){
            Set<User> members = new HashSet<>();
            members.add(user);
            group.setOwnerId(user.getId());
            group.setMembers(members);
            group.setActive(1);
            groupRepository.save(group);

            Set<Authority> authorities = user.getAuthorities();
            Authority authority = new Authority();
            authority.setName(AuthoritiesConstants.MODERATOR);
            authorities.add(authority);
            user.setGroupOwner(true);
            user.setAuthorities(authorities);
            user.setGroup(group);
            user.setAcceptedInGroup(true);

            userRepository.save(user);

            return 1;
        } else {
            return 0;
        }

    }

    private boolean checkIfUserIsModerator(Long userId){
        Group group= groupRepository.findOneByOwnerIdAndActive(userId, 1);
        if(group != null){
            if(group.getId() == 0)
                return false;
            else return true;
        } else
            return false;
    }

    public Group getGroupByUserId(){
        User user = userService.getUserWithAuthorities();
        Group group = groupRepository.findOneByOwnerIdAndActive(user.getId(), 1);
        group.setMembers(userRepository.findByGroupId(group.getId()));
        return group;

    }

    @Transactional
    public void deleteMemberFromGroup(Long memberId){
        User user = userService.getUserWithAuthorities(memberId);
        Group group = getGroupById(user.getGroup().getId());
        Set<User> members = group.getMembers();
        if(members.contains(user)){
            members.remove(user);
        }
        user.setGroup(getGroupById((long)0));
        user.setAcceptedInGroup(false);
        group.setMembers(members);

        groupRepository.save(group);
        userRepository.save(user);
    }

    public void acceptUserInGroup(Long memberId){
        User user = userService.getUserWithAuthorities(memberId);
        user.setAcceptedInGroup(true);

        userRepository.save(user);
    }

    public Group getGroupById(Long id){

        Group group = groupRepository.findOneById(id);
        group.setMembers(userRepository.findByGroupId(group.getId()));
        return group;
    }


    @Transactional
    public void updateGroup(Long groupId, String groupName, String groupDescription){
        Group group = groupRepository.findOneById(groupId);
        group.setGroupName(groupName);
        group.setGroupDescription(groupDescription);

        groupRepository.save(group);
    }

    @Transactional
    public void deleteGroup(Long groupId){
        Group group = groupRepository.findOneById(groupId);
        group.setActive(0);
        group.setMembers(null);
        User user = userService.getUserWithAuthorities(group.getOwnerId());
        user.setAcceptedInGroup(false);
        user.setGroup(getGroupById((long)0));
        user.setGroupOwner(false);

        Set<Authority> authorities = user.getAuthorities();
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.MODERATOR);
        authorities.remove(authority);
        user.setAuthorities(authorities);

        userRepository.save(user);
        groupRepository.save(group);

    }

    @Transactional
    public void joinGroup(Long groupId){
        User user = userService.getUserWithAuthorities();
        Group group = groupRepository.findOneById(groupId);
        user.setGroup(group);
        Set<User> members = group.getMembers();
        members.add(user);

        userRepository.save(user);
        groupRepository.save(group);

    }

    @Transactional
    public void leaveGroup(Long groupId){
        User user = userService.getUserWithAuthorities();
        Group group = groupRepository.findOneById(groupId);
        Set<User> members = group.getMembers();
        members.remove(user);
        user.setGroup(null);
        group.setMembers(members);

        userRepository.save(user);
        groupRepository.save(group);
    }

    public Page<Message> getMessages(Pageable pageable, Long groupId){
        return messageRepository.findAllByGroupId(pageable, groupId);
    }

    public void sendMessage(String content, Long groupId, Long userId){
        Message message = new Message();
        message.setMessageContent(content);
        message.setGroup(groupRepository.findOneById(groupId));
        message.setUser(userRepository.findOne(userId));
        message.setPostDate(Instant.now().toString());

        messageRepository.save(message);
    }

    public void editMessage(String content, Long messageId){
        Message message = messageRepository.findOne(messageId);
        message.setMessageContent(content);

        messageRepository.save(message);
    }

    public void deleteMessage(Long messageId){
        messageRepository.delete(messageId);
    }

}
