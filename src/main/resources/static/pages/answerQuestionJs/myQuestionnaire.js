/**
 * Created by Amy on 2018/8/7.
 */
var questIdModal = '';
let questionText = "";

$(function () {
    isLoginFun();
    var userName = getCookie('userName');
    header();
    $("#ctl01_lblUserName").html(userName);
    getProjectQuest();
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getProjectQuest();
    }
});

// 查看项目及其包含的问卷列表
function getProjectQuest() {
    var keyWord = $("#keyWord").val();
    var userName = getCookie("userName");
    var url = '/queryProjectList';
    var data = {
        "projectName": keyWord,
        "createdBy": userName
    };
    commonAjaxPost(true, url, data, getProjectQuestSuccess);
    //  var rr = JSON.parse('{"code":"666","data":[{"projectContent":"项目名","id":"708a580ce83c49c0a0cfc65b151d690e","projectName":"静态测试数据","createDate":"2022-05-13T15:05:40"}],"message":null}')
    //  getProjectQuestSuccess(rr)
}

// 查看项目及其包含的问卷列表成功回调
function getProjectQuestSuccess(result) {
    console.log(result.code);
    if (result.code == "666") {
        var data = result.data;
        $("#panel-23802").empty();

        //遍历多个项目
        var text = "";

        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                var projectInfo = data[i];
                var projectName = projectInfo.projectName;
                //项目名字
                if (projectName.length >= 25) {
                    projectName = projectName.substring(0, 26) + "...";
                }

                text += " <div class=\"panel panel-default\" id=\"projectOne" + i + "\" >";
                text += "     <div class=\"panel-heading\">";
                text += "         <a class=\"panel-title\" data-toggle=\"collapse\" id=\"projcetNumber" + i + "\" data-parent=\"#panel-23802\" href=\"#panel-element-" + projectInfo.id + "\">" + projectName + "</a>";
                text += "";
                text += "         <div class=\"operation-box pull-right\" style=\"font-size: 16px;\">";
                text += "             <a class=\"pull-left release-items\" title=\"创建问卷\" onclick=\"createGetProjectInfo(" + "'" + projectInfo.id + "'" + "," + "'" + projectInfo.projectName + "'" + ")\">";
                text += "                 <i class=\"icon release-icon\"></i>创建问卷</a>";
                text += "             <a href=\"javascript:void(0)\" id=\"projcetShow" + i + "\" class=\"pull-left copy-items\" onclick=\"getProjectInfo(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon copy-icon\"></i>查看</a>";
                text += "             <a class=\"pull-left item-remind\" id=\"projcetUpdate" + i + "\" href=\"javascript:void(0)\" onclick=\"editProject(" + "'" + projectInfo.id + "'" + "," + "'" + projectInfo.projectName + "'" + "," + "'" + projectInfo.projectContent + "'" + ")\"><i class=\"icon remind-icon\"></i>编辑</a>";
                text += "             <a href=\"javascript:void(0)\" class=\"pull-left cutout-items\" title=\"删除此项目\" onclick=\"deleteProject(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon cutout-icon\"></i>删除 </a>";
                text += "         </div>";
                text += "";
                text += "     </div>";

                if (i == 0) {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse in\">";

                } else {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse\">";

                }
                // 问卷列表

                getQuestionnaireList(projectInfo.id);
                text += questionText;

                text += "     </div>";
                text += " </div>";
                // }
            }
            //for循环结束
            $("#panel-23802").append(text);

        } else {
            layer.msg("暂无符合条件的项目", {icon: 0})
        }

    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }

}


function getQuestionnaireListSuccess(result) {
    questionText = "";
    if (result.code == "666" && result.data.length) {
        // debugger;
        for (let i = 0; i < result.data.length; i++) {
            let questionnaire = result.data[i];
            let name = questionnaire.questionName;
            // debugger;
            questionText += "<div class=\"panel-body\">";
            questionText += "<!--" + questionnaire.id + "-->";
            questionText += "<span style=\"font-size: 16px;\">" + questionnaire.questionName + "</span>";

            questionText += "<span style=\"font-size: 14px;float: right;color:#0e527a;display: block;margin: 3px;\" onclick=\"designQuestion(" + "'" + questionnaire.id + "'" + ")\">" + "修改问卷" + "</span>";
            questionText += "<span style=\"font-size: 14px;float: right;color:#0e527a;display: block;margin: 3px;\" onclick=\"deleteQuestion(" + "'" + questionnaire.id + "'" + ")\" >" + "删除问卷" + "</span>";
            //预览问卷
            questionText += "<span style=\"font-size: 14px;float: right;color:#0e527a;display: block;margin: 3px;\" onclick=\"previewQuestion(" + "'" + questionnaire.id + "'" + ")\" >" + "预览问卷" + "</span>";

            questionText += "<span style=\"font-size: 14px;float: right;color:#0e527a;display: block;margin: 3px;\" onclick=\"sendQuestionnaire(" + "'" + questionnaire.id + "'," + "'" + name + "'" + ")\" >" + "发布问卷" + "</span>";

            questionText += "<span style=\"font-size: 14px;float: right;color:#0e527a;display: block;margin: 3px;\" onclick=\"countQuestionnaire(" + "'" + questionnaire.id + "'," + "'" + name + "'" + ")\" >" + "统计问卷" + "</span>";

            // countQuestionnaire

            questionText += "</div>";
        }
    } else {
        questionText += "         <div class=\"panel-body\">";
        questionText += "";
        questionText += "<span style=\"color:#EF5D4A;font-size:16px\">暂无调查问卷或问卷已过期</span>";
        questionText += "";
        questionText += "         </div>";
    }
}

function getQuestionnaireList(projectId) {
    var url = '/queryQuestionListByProjectId';
    var data = {
        "projectId": projectId
    };
    commonAjaxPost(false, url, data, getQuestionnaireListSuccess);
}

// 删除项目
function deleteProject(projectId) {
    layer.confirm('您确认要删除此项目吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteProjectById';
        var data = {
            "id": projectId,
            "projectName": projectId,
            "ID": projectId,
            "iD": projectId,
            "Id": projectId,
        };
        commonAjaxPost(true, url, data, function (result) {
            // //console.log(result);
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectQuest();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
    }, function () {
    });
}

function deleteQuestion(questionId) {
    layer.confirm('您确认要删除此问卷吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteQuestionnaire';
        var data = {
            "id": questionId,
            "questionName": questionId,
            "ID": questionId,
            "iD": questionId,
            "Id": questionId,
        };
        commonAjaxPost(true, url, data, function (result) {
            // //console.log(result);
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectQuest();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
    }, function () {
    });
}


function previewQuestion(questionId) {
    setCookie("questionId", questionId);
    window.location.href = 'previewQuestionnaire.html?i=' + questionId;
}

function designQuestion(questionId) {
    setCookie("QuestionId", questionId);
    window.location.href = 'designQuestionnaire.html';
}

// 编辑项目，在问卷未发布的状态下才可以编辑项目信息
function editProject(id, name, content) {
    deleteCookie("projectId");
    deleteCookie("projectName");
    deleteCookie("projectContent");
    setCookie("projectId", id);
    setCookie("projectName", name);
    setCookie("projectContent", content);
    window.location.href = 'editProject.html'
}

// 查看项目详细信息
function getProjectInfo(id) {
    deleteCookie("projectId");
    setCookie("projectId", id);
    window.location.href = 'projectInfo.html'
}

function sendQuestionnaire(id, name) {
    // var questionId = getCookie("questionId");
    // var dataId = getCookie("dataId");  // 在校生：2；毕业生：3；教师：4；用人单位：5
    // var nameOfQuestionnaire = getCookie("nameOfQuestionnaire");
    setCookie("questionId", id);
    // setCookie("dataId", 2);
    setCookie("nameOfQuestionnaire", name);
    window.location.href = '/pages/sendQuestionnaire.html';
}


function countQuestionnaire(id, name) {
    setCookie("questionId", id);
    setCookie("nameOfQuestionnaire", name);
    window.location.href = '/pages/countQuestionnaire.html';
}

// 为了创建问卷而获取项目id、项目名称
function createGetProjectInfo(id, name) {
    //alert("创建问卷")
    deleteCookie("projectId");
    deleteCookie("projectName");
    setCookie("projectId", id);
    setCookie("projectName", name);
    setCookie("projectIdForCreate", id);
    window.location.href = "createQuestionnaire.html"
}






