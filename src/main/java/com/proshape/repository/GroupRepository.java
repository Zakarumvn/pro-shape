package com.proshape.repository;

import com.proshape.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Created by Katarzyna on 2017-11-29.
 */

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Group findOneByOwnerIdAndActive(Long ownerId, int active);
    Set<Group> findByActive(int active);
    Group findOneById(Long groupId);

/*    @Query("UPDATE groups g SET g.groupDescription = :gD, g.groupName = :gN WHERE g.id = :id")
    void updateGroupNameAndDescription(
        @Param("id") Long groupId,
        @Param("gD") String description,
        @Param("gN") String groupName);*/

}
