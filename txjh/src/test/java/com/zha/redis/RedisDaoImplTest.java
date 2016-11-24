package com.zha.redis;

import com.zha.BaseTest;
import com.zha.util.RedisUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;

import static org.junit.Assert.*;

/**
 * Created by java on 2016/11/23.
 */
public class RedisDaoImplTest extends BaseTest{

    @Autowired
    private RedisDao redisDao;

  /*  @Autowired
    private Jedis jedis;*/

    private Jedis jedis = redisUtil.getConnection();

    @Test
    public void testSaveString() throws Exception {
        redisDao.saveString("name","张三");
    }

    @Test
    public void testGetByKey() throws Exception {
        String name = redisDao.getByKey("name");
        System.out.println("name = " + name);
    }

    @Test
    public void testHyperLogLog() {
        Long pfadd = jedis.pfadd("pf", "zha", "dd", "cc");
        System.out.println("pfadd = " + pfadd);
        Long pfadd1 = jedis.pfadd("pf", "zha", "aa");
        System.out.println("pfadd1 = " + pfadd1);
        long pf = jedis.pfcount("pf");
        System.out.println("pf = " + pf);
        
    }
}