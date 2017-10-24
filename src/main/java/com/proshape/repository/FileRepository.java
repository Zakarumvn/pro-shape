package com.proshape.repository;

import com.proshape.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Katarzyna on 2017-10-24.
 */

@Repository
public interface FileRepository extends JpaRepository<File, Long> {


}
