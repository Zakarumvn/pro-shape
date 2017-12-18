package com.proshape.repository;

import com.proshape.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAll();
    Category findByCategoryId(Long categoryId);
    List<Category> findAllByType(String type);
}
