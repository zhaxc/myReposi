package com.zha.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by java on 2016/11/21.
 */
@Controller
@RequestMapping("/view")
public class ViewController {

    @RequestMapping("/{par1}")
    public String showPage(@PathVariable("par1") String par1) {
        return par1;
    }
}
