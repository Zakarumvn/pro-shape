package com.proshape.repository;

import com.proshape.domain.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Katarzyna on 2017-11-21.
 */

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
    List<Model> findALlByUserId(Long userId);
    Model findModelById(Long modelId);
    List<Model> findAll();
}
