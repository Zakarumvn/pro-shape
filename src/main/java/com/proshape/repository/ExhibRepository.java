package com.proshape.repository;

import com.proshape.domain.Category;
import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExhibRepository extends JpaRepository<Exhib, Long> {
    List<Exhib> findAllByUserId(Long userId);
    Exhib findById(Long id);
    Page<Exhib> findAllByCategory(Category category, Pageable pageable);
}
