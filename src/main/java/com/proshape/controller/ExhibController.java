package com.proshape.controller;

import com.proshape.domain.Exhib;
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

    @GetMapping(value = "/createExhibUser")
    public void createExhib(@RequestParam("name") String exhibName,
                            @RequestParam(value = "description", required = false) String description) throws IOException, SQLException {
        exhibService.userCreateExhib(exhibName, description);
    }
}
