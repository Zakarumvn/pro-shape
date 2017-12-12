package com.proshape.repository;

import com.proshape.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Katarzyna on 2017-12-03.
 */
@Repository
public interface CustomGroupRepository extends JpaRepository<Group, Long> {


}
