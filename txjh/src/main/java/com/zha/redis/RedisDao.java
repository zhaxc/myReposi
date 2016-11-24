package com.zha.redis;



/**
 * Created by java on 2016/11/23.
 */
public interface RedisDao {
    void saveString(String key,String value);

    String getByKey(String key);
}
