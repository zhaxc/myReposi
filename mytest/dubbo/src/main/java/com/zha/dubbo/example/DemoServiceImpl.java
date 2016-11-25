package com.zha.dubbo.example;

/**
 * Created by java on 2016/11/25.
 */
public class DemoServiceImpl implements DemoService {

    public void sayHello() {
        System.out.println("hello world!");
    }

    public String returnHello() {
        return "hello world!";
    }

    public MsgInfo returnMsgInfo(MsgInfo info) {
        info.getMsgs().add("处理完毕");
        return info;
    }

}
