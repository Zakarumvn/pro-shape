package com.proshape.controller;

import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.domain.User;
import com.proshape.service.ExhibService;
import com.proshape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/exhib")
public class ExhibController {

    @Autowired
    UserService userService;

    @Autowired
    ExhibService exhibService;

    //@GetMapping(value = "/getName")

    @GetMapping(value = "/getAllExhibs")
    public List<Exhib> getAllExhibs(){
        return exhibService.getAllExhibs();
    }

    @GetMapping(value = "/getUserExhibs")
    public Set<Exhib> getUserExhibs(){
        User user = userService.getUserWithAuthorities();
        return exhibService.getUserExhibs(user.getId());
    }

    @PostMapping(value = "/createExhibUser")
    public void createExhib(@RequestBody Exhib newExhib) throws IOException, SQLException {
        exhibService.userCreateExhib(newExhib.getName(), newExhib.getDescription());
    }

    @GetMapping(value = "/getExhibById")
    public Exhib findById(@RequestParam("id") Long id){
        return exhibService.findById(id);
    }

    /*@GetMapping(value = "/getExhibModels")
    public List<Model> findModelsById(@RequestParam("id") Long id){
        return exhibService.findModelsById(id);
    }*/

    @PostMapping(value = "/setExhibModels")
    public void setExhibModels(@RequestParam("id") Long id, @RequestParam(value = "models") Long[] models) throws IOException, SQLException{
        exhibService.setExhibModels(id, models);
    }

}
