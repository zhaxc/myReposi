package com.zha;

import com.zha.util.RedisUtil;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;

/**
 * Created by java on 2016/11/24.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations= { "classpath*:/application-context*.xml"})
public class BaseTest {
    /*@Autowired
    protected Jedis jedis;*/

    @Qualifier("redisUtil")
    @Autowired
    protected RedisUtil redisUtil;
}
