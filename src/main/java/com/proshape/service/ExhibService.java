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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ExhibService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ExhibRepository exhibRepository;

    @Autowired
    ModelRepository modelRepository;

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

    public void deleteExhib(Long id){
        Exhib exhib = exhibRepository.findById(id);
        if(exhib != null) {
            exhibRepository.delete(exhib);
        }
    }

    public List<Exhib> getAllExhibs() { return exhibRepository.findAll(); }

    public List<Exhib> getUserExhibs(Long userId){
        return exhibRepository.findAllByUserId(userId);
    }

    public Exhib findById(Long id){
        return exhibRepository.findById(id);
    }

    //public List<Model> findModelsById(Long id){ return modelRepository.findModelsById(id); }

    public void setExhibModels(Long id, Long[] exhibModels){
        List<Model> modelList = new ArrayList<Model>();
        for (Long i : exhibModels) {
            modelList.add(modelRepository.findModelById(i));
        }
        Exhib exhib = exhibRepository.findById(id);
        if(exhib != null){
            exhib.setModels(modelList);
            exhibRepository.save(exhib);
        }
    }

}
