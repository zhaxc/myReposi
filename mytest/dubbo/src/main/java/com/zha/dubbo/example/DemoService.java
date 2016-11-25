package com.zha.dubbo.example;

/**
 * Created by java on 2016/11/25.
 */
public interface DemoService {
    public void sayHello();

    public String returnHello();

    public MsgInfo returnMsgInfo(MsgInfo info);
}
