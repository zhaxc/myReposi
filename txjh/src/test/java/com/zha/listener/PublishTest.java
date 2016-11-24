package com.zha.listener;

import com.zha.BaseTest;
import com.zha.util.RedisUtil;
import org.junit.Test;
import redis.clients.jedis.Jedis;

import static org.junit.Assert.*;

/**
 * Created by java on 2016/11/24.
 */
public class PublishTest extends BaseTest{



    @Test
    public void testOnMessage() throws Exception {
        Jedis connection = redisUtil.getConnection();
        connection.publish("channel1", "今天很冷");
        redisUtil.closeConnection(connection);
    }
}