package com.proshape.repository;

import com.proshape.domain.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Created by Katarzyna on 2017-11-21.
 */

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
    Set<Model> findALlByUserId(Long userId);
    Model findModelById(Long modelId);
    List<Model> findAll();

}
