package com.proshape.controller;

import com.proshape.domain.test.Request;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Katarzyna on 2017-10-09.
 */
@RestController
@RequestMapping("api/test")
public class TestController {

    @GetMapping(value = "/testujemy")
    public Request getTest(){
        return new Request("desc", "201804");
    }
}
