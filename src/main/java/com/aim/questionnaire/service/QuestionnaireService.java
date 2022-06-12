package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
// import com.aim.questionnaire.config.shiro.ShiroService;
import com.aim.questionnaire.dao.ModelEntityMapper;
import com.aim.questionnaire.dao.RootPermissionEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.UserRootEntityMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProjectEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionnaireService {

  @Autowired private QuestionnaireEntityMapper questionnaireEntityMapper;

  public int addQuestionnaire(QuestionnaireEntity entity) {
    HashMap<String, Object> map = new HashMap<String, Object>();
    String id = UUIDUtil.getOneUUID();
    map.put("id", id);
    // 'questionName': questionName,
    if (entity.getQuestionName() != null && !entity.getQuestionName().equals("")) {
      map.put("questionName", entity.getQuestionName());
    }
    // 'questionContent': questionContent,
    if (entity.getQuestionContent() != null && !entity.getQuestionContent().equals("")) {
      map.put("questionContent", entity.getQuestionContent());
    }
    // 'startTime': dateChange(nowTimeInput),
    if (entity.getStartTime() != null) {
      map.put("startTime", entity.getStartTime());
    }
    // 'endTime': dateChange(questionendTime),
    if (entity.getEndTime() != null) {
      map.put("endTime", entity.getEndTime());
    }
    // 'questionStop': '5',
    if (entity.getQuestionStop() != null && !entity.getQuestionStop().equals("")) {
      map.put("questionStop", entity.getQuestionStop());
    }
    // 'dataId': getCookie('dataId'),
    if (entity.getDataId() != null && !entity.getDataId().equals("")) {
      map.put("dataId", entity.getDataId());
    }
    // // 'projectId': getCookie('projectIdForCreate')
    if (entity.getProjectId() != null && !entity.getProjectId().equals("")) {
      map.put("projectId", entity.getProjectId());
    }
    return questionnaireEntityMapper.addQuestionnaire(map);
  }

  public List<Map<String, Object>> queryQuestionListByProjectId(String projectId) {
    return questionnaireEntityMapper.queryQuestionListByProjectId(projectId);
  }

  // deleteByPrimaryKey
  public int deleteQuestionnaire(String id) {
    return questionnaireEntityMapper.deleteByPrimaryKey(id);
  }

  // queryQuestionnaireAll
  // selectByPrimaryKey
  public QuestionnaireEntity queryQuestionnaireById(String id) {
    return questionnaireEntityMapper.selectByPrimaryKey(id);
  }

  // modifyQuestionnaire
  // updateByPrimaryKeySelective
  public int modifyQuestionnaire(QuestionnaireEntity entity) {
    int res = questionnaireEntityMapper.updateByPrimaryKeySelective(entity);
    return res;
  }

  // queryQuestContextEnd
  public QuestionnaireEntity queryQuestContextEnd(String projectId) {
    return questionnaireEntityMapper.queryQuestContextEnd(projectId);
  }

  // queryProjectList
  public List<Map<String, Object>> queryProjectList(String projectId) {
    return questionnaireEntityMapper.queryQuestionListByProjectId(projectId);
  }
}
