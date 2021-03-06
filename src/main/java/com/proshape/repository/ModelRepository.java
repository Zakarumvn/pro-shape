package com.proshape.repository;

import com.proshape.domain.Category;
import com.proshape.domain.Model;
import com.proshape.domain.Exhib;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    List<Model> findALlByUserId(Long userId);
    Model findModelById(Long modelId);
    List<Model> findAll();
    Page<Model> findAllByCategory(Category category, Pageable pageable);
    Page<Model> findAll(Pageable pageable);

    /*
    @Query("SELECT m FROM Model m JOIN Exhib e WHERE e.id = m.ex")
    List<Model> findBy(Long id);*/
}
