package com.proshape.repository;

import com.proshape.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Created by Katarzyna on 2017-10-24.
 */

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
   Set<File> findAllByUserId(Long userId);
   Set<com.proshape.domain.File> findAllByModelId(Long modelId);
}
