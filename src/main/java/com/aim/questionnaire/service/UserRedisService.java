package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
// import com.aim.questionnaire.config.shiro.SysUserService;
// import com.aim.questionnaire.config.shiro.entity.UserOnlineBo;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.UserEntity;
// import com.alibaba.fastjson.JSONArray;

import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import javax.xml.ws.Action;
import java.time.LocalDateTime;
import java.util.*;

// redis
import redis.clients.jedis.Jedis;

import javax.annotation.PostConstruct;

@Service
public class UserRedisService {

  private final Logger logger = LoggerFactory.getLogger(UserRedisService.class);
  private final String host = "localhost";
  private final int port = 6379;
  private final String password = "";

  private Jedis jedis;

  @Autowired private UserEntityMapper userEntityMapper;

  UserRedisService() {
    try {
      jedis = new Jedis(host, port);
      logger.info("Connected to Redis server successfully");
      //      cacheMysqlUserTable();  // ; bug here
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @PostConstruct
  void init() {
    cacheMysqlUserTable();
  }

  private void cacheMysqlUserTable() {
    //     List<Map<String, Object>> queryUserList(Map<String, Object> map);
    // SELECT id,username,`password`,start_time as startTime,stop_time as endTime
    Map<String, Object> map = new HashMap<>();
    if (userEntityMapper == null) {
      logger.info("userEntityMapper is null");
      return;
    }
    List<Map<String, Object>> userList = userEntityMapper.queryUserList(map);
    for (Map<String, Object> user : userList) {
      String username = (String) user.get("username");
      String id = (String) user.get("id");
      String password = (String) user.get("password");

      LocalDateTime startTimed = (LocalDateTime) user.get("startTime");
      LocalDateTime endTimed = (LocalDateTime) user.get("endTime");

      String startTime = startTimed.toString();
      String endTime = endTimed.toString();

      if (jedis.exists(username)) {
        jedis.del(username);
        jedis.del(id);
      }

      jedis.set(id, username);

      jedis.lpush(username, endTime); // 3
      jedis.lpush(username, startTime); // 2
      jedis.lpush(username, id); // 1
      jedis.lpush(username, password); // 0
    }
  }

  /**
   * 查询用户列表（模糊搜索）
   *
   * @param map
   * @return
   */
  public PageInfo queryUserList(Map<String, Object> map) {
    List<UserEntity> userList = new ArrayList<UserEntity>();

    logger.info("queryUserList via redis");
    // redis scan all keys
    Set<String> keys = jedis.keys("*");
    for (String key : keys) {
      String type = jedis.type(key);
      if (!type.equals("list")) {
        continue;
      }
      List<String> values = jedis.lrange(key, 0, -1);
      if (values.size() == 4) {
        UserEntity user = new UserEntity();
        user.setUsername(key);
        user.setPassword(values.get(0));
        user.setId(values.get(1));

        String startTimes = values.get(2);
        String endTimes = values.get(3);

        //        System.out.println("startTimes: " + startTimes);
        //        System.out.println("endTimes: " + endTimes);

        LocalDateTime startTime = LocalDateTime.parse(startTimes);
        LocalDateTime endTime = LocalDateTime.parse(endTimes);

        Date sd = java.sql.Timestamp.valueOf(startTime);
        Date ed = java.sql.Timestamp.valueOf(endTime);

        user.setStartTime(sd);
        user.setStopTime(ed);

        userList.add(user);
      }
    }
    PageInfo pageInfo = new PageInfo(userList);
    return pageInfo;
  }

  /**
   * 创建用户的基本信息
   *
   * @param map
   * @return
   */
  public int addUserInfo(Map<String, Object> map) {

    if (map.get("username") != null) {
      if (jedis.exists(map.get("username").toString())) {
        // 用户名已经存在
        return 3;
      }
    }
    logger.info("addUserInfo via redis");

    String id = UUIDUtil.getOneUUID();
    map.put("id", id);
    // 创建时间
    Date date = DateUtil.getCreateTime();
    map.put("creationDate", date);
    map.put("lastUpdateDate", date);
    // 创建人
    String user = "admin";
    map.put("createdBy", user);
    map.put("lastUpdatedBy", user);
    // 前台传入的时间戳转换
    String startTimeStr = map.get("startTime").toString();
    String endTimeStr = map.get("stopTime").toString();
    Date startTime = DateUtil.getMyTime(startTimeStr);
    Date endTime = DateUtil.getMyTime(endTimeStr);
    map.put("startTime", startTime);
    map.put("stopTime", endTime);

    int result = userEntityMapper.addUserInfo(map);

    jedis.set(id, map.get("username").toString());

    jedis.lpush(map.get("username").toString(), endTimeStr);
    jedis.lpush(map.get("username").toString(), startTimeStr);
    jedis.lpush(map.get("username").toString(), id);
    jedis.lpush(map.get("username").toString(), map.get("password").toString());

    return result;
  }

  public List<UserEntity> selectUserInfo(UserEntity userEntity) {
    logger.info("selectUserInfo via redis");
    List<String> arr = jedis.lrange(userEntity.getUsername(), 0, -1);
    List<UserEntity> userList = new ArrayList<UserEntity>();
    if (arr.size() == 4) {
      UserEntity user = new UserEntity();
      user.setUsername(userEntity.getUsername());
      user.setPassword(arr.get(0));
      user.setId(arr.get(1));

      String startTimes = arr.get(2);
      String endTimes = arr.get(3);

      LocalDateTime startTime = LocalDateTime.parse(startTimes);
      LocalDateTime endTime = LocalDateTime.parse(endTimes);

      Date sd = java.sql.Timestamp.valueOf(startTime);
      Date ed = java.sql.Timestamp.valueOf(endTime);

      user.setStartTime(sd);
      user.setStopTime(ed);

      userList.add(user);
    }
    return userList;
  }

  /**
   * 编辑用户的基本信息
   *
   * @param map
   * @return
   */
  public int modifyUserInfo(Map<String, Object> map) {
    if (!jedis.exists(map.get("id").toString())) {
      return 0;
    }
    int res = userEntityMapper.modifyUserInfo(map);
    if (res == 0) return 0;
    String oldName = jedis.get(map.get("id").toString());
    jedis.del(oldName);
    cacheMysqlUserTable();
    return res;
  }

  /**
   * 修改用户状态
   *
   * @param map
   * @return
   */
  public int modifyUserStatus(Map<String, Object> map) {
    return 0;
  }

  /**
   * 根据id查询用户信息
   *
   * @param userEntity
   * @return
   */
  public Map<String, Object> selectUserInfoById(UserEntity userEntity) {
    if (userEntity.getId() == null || !jedis.exists(userEntity.getId())) {
      return null;
    }
    String username = jedis.get(userEntity.getId());
    List<String> arr = jedis.lrange(username, 0, -1);
    Map<String, Object> map = new HashMap<String, Object>();
    if (arr.size() == 4) {
      map.put("username", username);
      map.put("password", arr.get(0));
      map.put("id", arr.get(1));
      map.put("startTime", arr.get(2));
      map.put("stopTime", arr.get(3));
    }
    return map;
  }

  /**
   * 删除用户信息
   *
   * @param userEntity
   * @return
   */
  public int deleteUserInfoById(UserEntity userEntity) {
    if (!jedis.exists(userEntity.getId())) {
      return 0;
    }
    int res = userEntityMapper.deleteUserInfoById(userEntity);
    if (res == 0) return 0;
    String oldName = jedis.get(userEntity.getId());
    jedis.del(oldName);
    jedis.del(userEntity.getId());
    return res;
  }
}
