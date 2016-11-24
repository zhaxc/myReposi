package com.zha.listener;

import com.zha.BaseTest;
import com.zha.factory.RedisMsgPubSubListenerFactory;
import com.zha.util.RedisUtil;
import org.junit.Before;
import org.junit.Test;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;


/**
 * Created by java on 2016/11/24.
 */
public class SubscribeTest extends BaseTest{

    private Jedis jedis = null;
    private RedisMsgPubSubListener redisMsgPubSubListener = null;

    @Before()
    public void set() {
        jedis = redisUtil.getConnection();
        redisMsgPubSubListener = RedisMsgPubSubListenerFactory.getInstance();
    }

    @Test
    public void testSubscribe() throws Exception {

        jedis.subscribe(redisMsgPubSubListener,"channel1");
        System.out.println("订阅完成==============================");
    }

   /* @Test
    public void unSubscribe() {
        redisMsgPubSubListener.unsubscribe();
    }*/
}