package com.proshape.repository;

import com.proshape.domain.Exhib;
import com.proshape.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ExhibRepository extends JpaRepository<Exhib, Long> {
    Optional<Exhib> findOnyById(Long id);
    Set<Exhib> findAllByUserId(Long userId);
}
