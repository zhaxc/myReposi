package com.zha.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * Created by java on 2016/11/24.
 */
@Component("redisUtil")
public class RedisUtil {

    /**
     * 数据源
     */
    @Autowired
    private JedisPool jedisPool;

    public Jedis getConnection() {

        Jedis jedis= null;

        try {
            jedis=jedisPool.getResource();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jedis;

    }

    public  void closeConnection(Jedis jedis) {
        if (null != jedis) {
            try {
                //jedisPool.returnResource(jedis);
                jedis.close();//form 3.0
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public  JedisPool getJedisPool() {
        return jedisPool;
    }

    public void setJedisPool(JedisPool jedisPool) {
        this.jedisPool = jedisPool;
    }
}
