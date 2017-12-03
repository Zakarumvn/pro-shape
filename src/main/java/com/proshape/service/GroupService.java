package com.proshape.service;

import com.proshape.domain.Authority;
import com.proshape.domain.Group;
import com.proshape.domain.User;
import com.proshape.repository.GroupRepository;
import com.proshape.repository.UserRepository;
import com.proshape.security.AuthoritiesConstants;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Group> getAllGroups(){
        return groupRepository.findByActive(1);
    }

    @Transactional
    public int createGroup(Group group){
        User user = userService.getUserWithAuthorities();
        if(!checkIfUserIsModerator(user.getId())){
            List<User> members = new ArrayList<>();
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
            userRepository.save(user);

            return 1;
        } else {
            return 0;
        }

    }

    private boolean checkIfUserIsModerator(Long userId){
        if(groupRepository.findOneByOwnerIdAndActive(userId, 1).equals(null)){
            return false;
        } else return true;
    }

    public Group getGroupByUserId(){
        User user = userService.getUserWithAuthorities();
        Group group = groupRepository.findOneByOwnerIdAndActive(user.getId(), 1);
        group.setMembers(userRepository.findByGroupId(group.getId()));
        return group;

    }

    public void deleteMemberFromGroup(User member){
        Group group = getGroupById(member.getGroup().getId());
        List<User> members = group.getMembers();
        if(members.contains(member)){
            members.remove(member);
        }

        group.setMembers(members);
        groupRepository.save(group);
    }

    public Group getGroupById(Long id){
        return groupRepository.findOneById(id);
    }


    public void updateGroup(Group group){
        groupRepository.save(group);
    }

    public void updateMember(User member, boolean deleteGroup){
        Set<Authority> authorities = member.getAuthorities();
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.MODERATOR);


        if(authorities.contains(authority) && deleteGroup){
            authorities.remove(authority);
        }

        member.setAuthorities(authorities);
        userRepository.save(member);
    }

}
