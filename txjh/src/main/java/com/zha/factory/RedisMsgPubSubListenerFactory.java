package com.zha.factory;

import com.zha.listener.RedisMsgPubSubListener;

/**
 * Created by java on 2016/11/24.
 */
public class RedisMsgPubSubListenerFactory {
    private static RedisMsgPubSubListener listener = null;

    private RedisMsgPubSubListenerFactory() {
    }

    public static RedisMsgPubSubListener getInstance() {
        if (listener == null) {
            listener = new RedisMsgPubSubListener();
        }
        return listener;
    }
}
