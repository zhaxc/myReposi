package com.zha.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Created by java on 2016/11/24.
 */
@Component
public class ApplicationContextUtil implements ApplicationContextAware {

    private static ApplicationContext context;

    public void setApplicationContext(ApplicationContext contex) throws BeansException {
        context = contex;
    }

    public static ApplicationContext getContext() {
        return context;
    }

    public static Object getBean(String beanName){
        return getContext().getBean(beanName);
    }

    @SuppressWarnings("unchecked")
    public static <T> T getBean(String beanName,Class<T> clazz){
        return (T)getContext().getBean(beanName);
    }
}
