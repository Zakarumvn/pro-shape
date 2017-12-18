package com.proshape.repository;

import com.proshape.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Katarzyna on 2017-12-16.
 */

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findAllByGroupId(Pageable pageable, Long groupId);
}
