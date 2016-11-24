package com.zha.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import redis.clients.jedis.Jedis;

/**
 * Created by java on 2016/11/23.
 */
@Repository("redisDao")
public class RedisDaoImpl implements RedisDao {

    @Autowired
    private Jedis jedis;

    public void saveString(String key, String value) {
        jedis.set(key, value);
    }

    public String getByKey(String key) {
        return jedis.get(key);
    }
}
