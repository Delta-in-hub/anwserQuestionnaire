package com.aim.questionnaire.controller;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.service.ProjectService;
import com.aim.questionnaire.service.QuestionnaireService;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class QuestionnaireController {
  private final Logger logger = LoggerFactory.getLogger(QuestionnaireController.class);

  @Autowired private QuestionnaireService questionnaireService;

  @RequestMapping(
      value = "/addQuestionnaire",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity addQuestionnaire(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getQuestionName());
    logger.info(entity.getQuestionContent());
    questionnaireService.addQuestionnaire(entity);
    httpResponseEntity.setCode(Constans.SUCCESS_CODE);
    httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
    return httpResponseEntity;
  }

  // queryQuestionListByProjectId
  @RequestMapping(
      value = "/queryQuestionListByProjectId",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity queryQuestionListByProjectId(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getProjectId());
    List<Map<String, Object>> result =
        questionnaireService.queryQuestionListByProjectId(entity.getProjectId());
    httpResponseEntity.setCode(Constans.SUCCESS_CODE);
    httpResponseEntity.setData(result);
    return httpResponseEntity;
  }

  // deleteQuestionnaire
  @RequestMapping(
      value = "/deleteQuestionnaire",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity deleteQuestionnaire(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getId());
    int res = questionnaireService.deleteQuestionnaire(entity.getId());
    logger.info(String.valueOf(res));
    if (res == 1) {
      httpResponseEntity.setCode(Constans.SUCCESS_CODE);
      httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
    } else {
      httpResponseEntity.setCode(Constans.QUESTIONNAIRE_NO_CODE);
      httpResponseEntity.setMessage(Constans.MODEL_DELETE_FAIL);
    }
    return httpResponseEntity;
  }

  // queryQuestionnaireAll
  @RequestMapping(
      value = "/queryQuestionnaireAll",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity queryQuestionnaireAll(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getId());
    QuestionnaireEntity result = questionnaireService.queryQuestionnaireById(entity.getId());
    if (result != null) {
      httpResponseEntity.setCode(Constans.SUCCESS_CODE);
      httpResponseEntity.setData(result);
    } else {
      httpResponseEntity.setCode(Constans.LOGOUT_NO_CODE);
      httpResponseEntity.setMessage(Constans.QUESTIONNAIRE_NO_MESSAGE);
      httpResponseEntity.setData(entity.getId());
    }
    return httpResponseEntity;
  }

  // modifyQuestionnaire
  @RequestMapping(
      value = "/modifyQuestionnaire",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity modifyQuestionnaire(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getId());
    int res = questionnaireService.modifyQuestionnaire(entity);
    if (res == 1) {
      httpResponseEntity.setCode(Constans.SUCCESS_CODE);
      httpResponseEntity.setMessage(Constans.UPDATE_MESSAGE);
    } else {
      httpResponseEntity.setCode(Constans.LOGOUT_NO_CODE);
      httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
    }
    httpResponseEntity.setData(entity.getId());
    return httpResponseEntity;
  }

  // queryQuestionnaireById
  // questionName
  // questionContent
  //  questionList (question)
  @RequestMapping(
      value = "/queryQuestionnaireById",
      method = RequestMethod.POST,
      headers = "Accept=application/json")
  public HttpResponseEntity queryQuestionnaireById(@RequestBody QuestionnaireEntity entity) {
    HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
    logger.info(entity.getId());
    QuestionnaireEntity result = questionnaireService.queryQuestionnaireById(entity.getId());
    if (result != null) {
      httpResponseEntity.setCode(Constans.SUCCESS_CODE);
      httpResponseEntity.setData(result);
    } else {
      httpResponseEntity.setCode(Constans.LOGOUT_NO_CODE);
      httpResponseEntity.setMessage(Constans.QUESTIONNAIRE_NO_MESSAGE);
      httpResponseEntity.setData(entity.getId());
    }
    return httpResponseEntity;
  }
}
