package jedis;

import com.zha.BaseTest;
import com.zha.factory.JedisClusterFactory;
import com.zha.util.ApplicationContextUtil;
import org.junit.Before;
import org.junit.Test;
import redis.clients.jedis.JedisCluster;

import javax.lang.model.SourceVersion;

/**
 * Created by java on 2016/11/24.
 */
public class ClusterConnection extends BaseTest {

    private JedisClusterFactory jedisClusterFactory;

    private JedisCluster jedisCluster = null;

    @Before()
    public void getJedis() throws Exception {
        jedisCluster = (JedisCluster) ApplicationContextUtil.getBean("jedisCluster");//从spring容器中获得的直接是工厂生产的对象而不是工厂
        jedisClusterFactory = (JedisClusterFactory) ApplicationContextUtil.getBean("&jedisCluster");//id前面加&获取的是工厂对象
        JedisCluster jedisCluster2 = (JedisCluster) ApplicationContextUtil.getBean("jedisCluster");
        System.out.println(jedisCluster2.equals(jedisCluster));//true
        System.out.println("jedisCluster = " + jedisCluster);
        System.out.println("jedisCluster2 = " + jedisCluster2);
        //JedisCluster jedisCluster = this.jedisClusterFactory.getObject();
    }

    @Test
    public void testString() {
        String set = jedisCluster.set("zha", "wang");
        System.out.println("set = " + set);
        String zha = jedisCluster.get("zha");
        System.out.println("zha = " + zha);

    }

    @Test
    public void testMap() {

    }

}
