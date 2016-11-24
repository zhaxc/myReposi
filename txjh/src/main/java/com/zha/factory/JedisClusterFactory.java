package com.zha.factory;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;

import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Created by java on 2016/11/24.
 */
public class JedisClusterFactory implements FactoryBean<JedisCluster>, InitializingBean {

    private Resource addressConfig;
    private String addressKeyPrefix; //"address"
    private JedisCluster jedisCluster;
    private Integer timeout;
    private Integer maxRedirections;
    private GenericObjectPoolConfig genericObjectPoolConfig;

    private Pattern p = Pattern.compile("^.+[:]\\d{1,5}\\s*$");

    /**
     * 工厂生产的对象
     *
     * @return
     * @throws Exception
     */
    public JedisCluster getObject() throws Exception {
        return jedisCluster;
    }

    /**
     * 工厂生产对象类型
     *
     * @return
     */
    public Class<? extends JedisCluster> getObjectType() {
        return (this.jedisCluster != null ? this.jedisCluster.getClass() : JedisCluster.class);
    }

    /**
     * 指定是否单例
     *
     * @return
     */
    public boolean isSingleton() {
        return true;
    }

    /**
     * Invoked by a BeanFactory after it has set all bean properties supplied
     * bean工厂在所有属性设值完成后调用该方法
     * @throws Exception
     */
    public void afterPropertiesSet() throws Exception {
        //System.out.println("Jedis工厂初始化==============================================");
        Set<HostAndPort> haps = this.parseHostAndPort();
        jedisCluster = new JedisCluster(haps, timeout, maxRedirections, genericObjectPoolConfig);
    }

    private Set<HostAndPort> parseHostAndPort() throws Exception {

        try {
            Properties prop = new Properties();
            prop.load(this.addressConfig.getInputStream());

            HashSet<HostAndPort> hostAndPorts = new HashSet<HostAndPort>();
            for (Object key : prop.keySet()) {
                if (!((String) key).startsWith(addressKeyPrefix)) {//配置文件的key不以"address"开头，则跳过
                    continue;
                }
                String value = (String) prop.get(key);
                boolean isIpPort = p.matcher(value).matches();//正则校验配置文件的value值
                if (!isIpPort) {
                    throw new IllegalArgumentException("ip 或 port 不合法");
                }
                String[] ipAndPort = value.split(":");
                HostAndPort hostAndPort = new HostAndPort(ipAndPort[0], Integer.parseInt(ipAndPort[1]));
                //System.out.println(ipAndPort[0]+":"+ipAndPort[1]);
                hostAndPorts.add(hostAndPort);
            }

            return hostAndPorts;
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception e) {
            throw new Exception("解析 jedis 配置文件失败", e);
        }

    }

    //==================================setter 方法，用于application-context.xml文件注入值=================================

    public void setAddressConfig(Resource addressConfig) {
        this.addressConfig = addressConfig;
    }

    public void setAddressKeyPrefix(String addressKeyPrefix) {
        this.addressKeyPrefix = addressKeyPrefix;
    }

    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }

    public void setMaxRedirections(Integer maxRedirections) {
        this.maxRedirections = maxRedirections;
    }

    public void setGenericObjectPoolConfig(GenericObjectPoolConfig genericObjectPoolConfig) {
        this.genericObjectPoolConfig = genericObjectPoolConfig;
    }
}
