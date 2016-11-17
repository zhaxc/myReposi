package com.zha.boss.controller;

import com.zha.core.util.ApplicationContextHelper;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2016/11/17.
 */
@Controller
@RequestMapping("/view")
public class ViewController {

    @RequestMapping("/vaild")
    public void vaild() {
        ApplicationContext context = ApplicationContextHelper.getContext();
        System.out.println(context);
    }

}
