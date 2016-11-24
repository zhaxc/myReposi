package com.zha.controller;

import com.zha.util.CustomDateEditor;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.util.Date;

/**
 * Created by java on 2016/11/21.
 */
public class BaseController {

    @InitBinder
    public void initBinder(ServletRequestDataBinder binder) {
        binder.registerCustomEditor(Date.class, new CustomDateEditor());
    }
}
