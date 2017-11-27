package com.proshape.service;

import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.repository.ModelRepository;
import com.proshape.repository.UserRepository;
import com.proshape.repository.ExhibRepository;
import com.proshape.service.ExhibService;
import org.joda.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ExhibService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExhibRepository exhibRepository;

    @Autowired
    UserService userService;

    public Exhib userCreateExhib (String name, String description){
        User user = userService.getUserWithAuthorities();
        Exhib newExhib = new Exhib();
        newExhib.setName(name);
        newExhib.setDescription(description);
        newExhib.setUser(user);
        //log.debug("Created Information for Exhib: {}", newExhib);
        exhibRepository.save(newExhib);
        return newExhib;
    }

    public void deleteExhib(Long exhibId){
        /*exhibRepository.findOnyById(exhibId).isPresent(exhib -> {
           exhibRepository.delete(exhib);
        });*/
    }

    public List<Exhib> getAllExhibs() { return exhibRepository.findAll(); }

    public List<Exhib> getUserExhibs(Long userId){
        return exhibRepository.findAllByUserId(userId);
    }
}
