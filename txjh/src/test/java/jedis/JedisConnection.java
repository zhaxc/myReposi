package jedis;


import com.google.common.collect.Maps;
import org.junit.Before;
import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by java on 2016/11/22.
 */
public class JedisConnection {

    Jedis jedis = null;

    @Before()
    public void init() {
        jedis = new Jedis("192.168.126.19", 6379);
    }

    @Test
    public void testSet1() {
        String set = jedis.set("age", "20", "xx");
        System.out.println(set);

    }

    @Test
    public void testGet() {
        String name = jedis.get("name");
        System.out.println("name = " + name);
    }

    @Test
    public void testString() {
        jedis.set("name", "tom");
        System.out.println(jedis.get("name"));
        jedis.append("name", " is my lover"); //拼接
        System.out.println(jedis.get("name"));
        jedis.del("name");
        System.out.println(jedis.get("name"));
        jedis.mset("name", "liuling", "age", "23", "qq", "476777XXX");
        jedis.incr("age");
        System.out.println(jedis.get("name") + "-" + jedis.get("age") + "-" + jedis.get("qq"));
    }


    @Test
    public void testMap() {
        //-----添加数据----------
        HashMap<String, String> map = Maps.newHashMap();
        map.put("name", "xinxin");
        map.put("age", "22");
        map.put("qq", "123456");
        jedis.hmset("user", map);
        //取出user中的name，执行结果:[minxr]-->注意结果是一个泛型的List
        //第一个参数是存入redis中map对象的key，后面跟的是放入map中的对象的key，后面的key可以跟多个，是可变
        List<String> hmget = jedis.hmget("user", "name", "age", "qq", "city");
        System.out.println("hmget = " + hmget);
        //删除map中的某个键值
        jedis.hdel("user", "age");
        System.out.println(jedis.hmget("user", "age")); //因为删除了，所以返回的是null
        System.out.println(jedis.hlen("user")); //返回key为user的键中存放的值的个数2
        System.out.println(jedis.exists("user"));//是否存在key为user的记录 返回true
        System.out.println(jedis.hkeys("user"));//返回map对象中的所有key
        System.out.println(jedis.hvals("user"));//返回map对象中的所有value
        Set<String> user = jedis.hkeys("user");
        for (String s : user) {
            System.out.println(s + ":" + jedis.hmget("user", s));
        }

        Iterator<String> iter = jedis.hkeys("user").iterator();
        while (iter.hasNext()) {
            String key = iter.next();
            System.out.println(key + ":" + jedis.hmget("user", key).get(0));
        }
    }

    @Test
    public void testList() {
        //开始前，先移除所有的内容
        jedis.del("java");
        System.out.println(jedis.lrange("java",0,-1));
        //先向key java framework中存放三条数据
        jedis.lpush("java", "spring");
        jedis.lpush("java", "struts");
        jedis.lpush("java", "mybatis");
        //再取出所有数据jedis.lrange是按范围取出，
        // 第一个是key，第二个是起始位置，第三个是结束位置，jedis.llen获取长度 -1表示取得所有(0第一个，1第二个，-1最后一个，-2倒数第二个。。。)
        System.out.println(jedis.lrange("java",0,-1));
        jedis.del("java");
        jedis.rpush("java","spring");
        jedis.rpush("java","struts");
        jedis.rpush("java","hibernate");
        System.out.println(jedis.lrange("java",0,-1));
    }

    @Test
    public void testSet() {
        //添加
        String key = "userSet";
        jedis.sadd(key, "liuling");
        jedis.sadd(key, "小三");
        jedis.sadd(key, "小四");
        jedis.sadd(key, "小五");
        jedis.sadd(key, "小四");
        jedis.sadd(key, "小删");
        //移除
        jedis.srem(key, "小删");
        System.out.println(jedis.smembers(key));//获取所有加入的value
        System.out.println(jedis.sismember(key,"小四"));//判断 xx 是否是user集合的元素
        System.out.println(jedis.srandmember(key));//随机获取集合中的一个元素
        System.out.println(jedis.scard(key));//返回集合中的元素个数

    }
}
