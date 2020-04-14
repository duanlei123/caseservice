/**=========================================================
 * Module: auto-task-caselog.js
 * JS for AutoTaskCaseLog
 =========================================================*/

App.controller("AutoTaskCaseLogControllerDtp", ["$rootScope", "$scope", "$stateParams", "$http", '$modal', 'toaster', 'ngDialog', '$sce',
    function ($rootScope, $scope, $stateParams, $http, $modal, toaster, ngDialog, $sce) {

        // 任务id
        $scope.autoTaskExecId = $stateParams.eid;
        $scope.autoTaskCaseUuid = $stateParams.uuid;
        $scope.autoTaskExec = {};
        $scope.autoTaskInfo = {};
        $scope.autoTaskCaseResult = {};

        $scope.hasFailMessage = false;
        $scope.autoTaskCaseImgs = [];
        
        $scope.inBusy = false;


        //$scope.vm.sendResult = $scope.SEND_STATE.SendOk;

        // 获取用户
        $scope.getUsers = function () {
            var usersData = $rootScope.allUsers;
            for (var i = 0; i < usersData.length; i++) {
                $scope.users.push({value: usersData[i].displayname, data: usersData[i].username, id: usersData[i].id});// + "(" + json[i].username + ")"
            }
        };
        $scope.users = [];
        $scope.getUsers();
        $scope.clearSelectedUsers = function () {
            $scope.vm.receiveUsers = [];
        };

        // 获取任务基本信息
        $scope.getAutoTaskExecInfo = function () {

            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskExec", {
                params: {
                    autoTaskExecId: $scope.autoTaskExecId
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    $scope.autoTaskExec = data;
                    $scope.getAutoTaskInfo($scope.autoTaskExec.autoTaskId);
                } else {
                    toaster.pop("error", "获取测试任务执行信息失败");
                }

            }).error(function (data, status) {
                toaster.pop("error", "获取测试任务执行信息失败");
                $scope.inBusy = false;
            });
        };
        // 获取任务基本信息
        $scope.getAutoTaskExecInfo();
        $scope.getAutoTaskInfo = function (autoTaskId) {
            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskSummary", {
                params: {
                    autoTaskId: autoTaskId
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    $scope.autoTaskInfo = data;
                    $scope.getAutoTaskCaseResult($scope.autoTaskExecId, $scope.autoTaskCaseUuid);
                } else {
                    toaster.pop("error", "获取测试任务信息失败");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试任务信息失败");
            });

        };

        var caseSplitUrlArray = null;
        var caseSrcIndex = 0;
        var prepareCaseSplitUrlArray = function() {
            if (caseSrcIndex ==0) {
                caseSplitUrlArray = $scope.autoTaskCaseResult.gitUrl.split("/");
                if (caseSplitUrlArray.length<6) {
                    caseSrcIndex = -1;
                    return null;
                }
                for(var i = 0; i<caseSplitUrlArray.length;i++) {
                    if(caseSplitUrlArray[i] =="src" &&
                        caseSplitUrlArray[i +1] =="main" &&
                        caseSplitUrlArray[i +2] =="java") {
                        caseSrcIndex = i+3;
                        break;
                    }
                    caseSrcIndex = -1;
                }
            }
        };

        var parseLineNumber = function(fullLineNum) {
            var ret = {};
            ret.lineNum = null;
            ret.methodName =null;
            ret.gitUrl = null;

            var begin = fullLineNum.indexOf('(');
            var end = fullLineNum.indexOf(')');
            ret.lineNum = fullLineNum.substring(begin+1, end);

            var fullMethod =fullLineNum.substring(0, begin);

            var methodArray = fullMethod.split('.');
            ret.methodName = methodArray[methodArray.length-1];
            ret.fullMethodName = fullMethod;
            ret.gitUrl = null;

            prepareCaseSplitUrlArray();
            if (caseSrcIndex == -1 ) {
                return ret;
            }

            if(methodArray.lenth < 5) {
                return ret;
            }
            if(methodArray[0]== caseSplitUrlArray[caseSrcIndex] &&
                methodArray[1]== caseSplitUrlArray[caseSrcIndex + 1] &&
                methodArray[2]== caseSplitUrlArray[caseSrcIndex + 2] ) {
                urlArray = caseSplitUrlArray.slice(0, caseSrcIndex + 3);
                for(var i = 3; i< (methodArray.length -2);i++ ) {
                    urlArray.push(methodArray[i]);
                }
                var classNum = ret.lineNum.replace(":", "#L");
                urlArray.push(classNum);
                ret.gitUrl = urlArray.join("/");
            }
            return ret;
        };

        var pareLogLine = function(line) {

           // line.line = $sce.trustAsHtml(line.line);

            var lineNumInfo = parseLineNumber(line.fullLineNum);

            line.lineNum = lineNumInfo.lineNum;
            line.methodName =lineNumInfo.methodName;
            line.gitUrl = lineNumInfo.gitUrl;
        };

        var pareLog = function(logInfo) {
            for (var key in logInfo.lines) {
                var line = logInfo.lines[key];
                pareLogLine(line);
            }
        };

        var parseResultErrorMessage = function(caseResult) {
            if(caseResult ==null  || caseResult.failFullMessage ==null) {
                return;
            }
            caseResult.failFullMessage = jQuery.trim(caseResult.failFullMessage);

            if(caseResult.failFullMessage == null || caseResult.failFullMessage.length<=0 ) {
                //caseResult.failFullMessage = $sce.trustAsHtml(caseResult.failFullMessage);
                return;
            }
            var failFullMessageArray = caseResult.failFullMessage.split('\n');
            var bHasGitUrl = false;
            for(var i = 0; i< failFullMessageArray.length;i++) {
                var failMessageLine = failFullMessageArray[i];
                if (failMessageLine.length < 3) {
                    continue;
                }
                var indexAt = -1;
                for (var j = 0; j< failMessageLine.length-2; j++) {
                    if (failMessageLine[j] == '\t' || failMessageLine[j] == ' ') {
                        continue;
                    }
                    if (failMessageLine[j] =='a' && failMessageLine[j+1] == 't' && failMessageLine[j+2] == ' ') {
                        indexAt = j+3;
                    }
                    break;
                }
                if (indexAt == -1) {
                    continue;
                }
                var numberLine = jQuery.trim(failMessageLine.substring(indexAt));
                var lineNumInfo = parseLineNumber(numberLine);
                if ( lineNumInfo.gitUrl !=null &&  lineNumInfo.gitUrl.length>0 ) {
                    failFullMessageArray[i] = failMessageLine.substring(0,indexAt) + lineNumInfo.fullMethodName + "(<a  class='text-underline' target='_blank' href='"+ lineNumInfo.gitUrl +"'>" + lineNumInfo.lineNum   +"</a>)";
                    bHasGitUrl = true;
                }
            }
            if (bHasGitUrl) {
                caseResult.failFullMessage = failFullMessageArray.join('\n');
            }
            //caseResult.failFullMessage = $sce.trustAsHtml(caseResult.failFullMessage);
        };

        // 获取用例信息
        $scope.getAutoTaskCaseResult = function (autoTaskExecId, uuid) {
            //$scope.autoTaskId
            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskCaseResultByUuid", {
                params: {
                    autoTaskExecId: autoTaskExecId,
                    uuid: uuid,
                    isConfig: false
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    $scope.autoTaskCaseResult = data;
                    $scope.autoTaskCaseResult.className = getSimpleClassName($scope.autoTaskCaseResult.className);
                    loadResultImage($scope.autoTaskCaseResult);
                    parseResultErrorMessage($scope.autoTaskCaseResult);
                    $scope.getAutoTaskConfigResults($scope.autoTaskCaseResult);
                    $scope.getAutoTaskCaseLog($scope.autoTaskCaseResult);

                } else {
                    toaster.pop("error", "获取测试结果失败");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试结果失败");
            });
        };

        var loadResultImage = function (autoTaskCaseResult) {
            if (autoTaskCaseResult.images.length > 0) {
                for (var i = 0; i < autoTaskCaseResult.images.length; i++) {
                    $scope.autoTaskCaseImgs.push({
                        image: "../autotask/getAutoTaskCaseAttach/"+ autoTaskCaseResult.autoTaskExecId +"/"+ autoTaskCaseResult.uuid +"/img/"+autoTaskCaseResult.images[i] ,
                        desc: autoTaskCaseResult.images[i]
                    })
                }
            }
        };
        var getSimpleClassName = function (className) {
            var begin = className.indexOf(".testcase.");
            if (begin >= 0) {
                return className.substr(begin + ".testcase.".length);
            }
            return className;
        };

        var getAutoTaskConfigResult = function (autoTaskExecId, configs, key) {

            var config = configs[key];
            config.key = key;
            $http.get("../autotask/getAutoTaskCaseResultByUuid", {
                params: {
                    autoTaskExecId: autoTaskExecId,
                    uuid: config.uuid,
                    isConfig: true
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    parseResultErrorMessage(data);
                    configs[config.key] = data;
                    $scope.getAutoTaskConfigLog(data);
                } else {
                    toaster.pop("error", "获取测试结果失败");
                }
                autoTaskNeedGetResult --;
                //
                if(autoTaskNeedGetResult ==0) {
                    var failIndex = 0;
                    for (var key0 in $scope.autoTaskCaseResult.beforeConfigs) {
                        var configResult0 = $scope.autoTaskCaseResult.beforeConfigs[key0];
                        if (configResult0.failFullMessage != null && (configResult0.failFullMessage =jQuery.trim(configResult0.failFullMessage)).length > 0) {
                            configResult0.failIndex = failIndex++;
                        }
                    }
                    $scope.autoTaskCaseResult.failIndex = failIndex++;
                    for (var key1 in $scope.autoTaskCaseResult.afterConfigs) {
                        var configResult1 = $scope.autoTaskCaseResult.afterConfigs[key1];
                        if (configResult1.failFullMessage != null && (configResult1.failFullMessage =jQuery.trim(configResult1.failFullMessage)).length > 0) {
                            configResult1.failIndex = failIndex++;
                        }
                    }
                    if (failIndex > 1 ||
                        (failIndex == 1 && $scope.autoTaskCaseResult.failFullMessage != null && ($scope.autoTaskCaseResult.failFullMessage =jQuery.trim($scope.autoTaskCaseResult.failFullMessage)).length > 0)) {
                        $scope.hasFailMessage = true;
                    }
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试结果失败");
                autoTaskNeedGetResult --;
            });
        };
        var autoTaskNeedGetResult = 0;
        $scope.getAutoTaskConfigResults = function (autoTaskConfigResult) {
            for (var key1 in autoTaskConfigResult.beforeConfigs) {
                autoTaskNeedGetResult++;
                getAutoTaskConfigResult(autoTaskConfigResult.autoTaskExecId, autoTaskConfigResult.beforeConfigs, key1);
            }
            for (var key2 in autoTaskConfigResult.afterConfigs) {
                autoTaskNeedGetResult++;
                getAutoTaskConfigResult(autoTaskConfigResult.autoTaskExecId, autoTaskConfigResult.afterConfigs, key2);
            }
        };
        // 获取用例日志信息
        $scope.getAutoTaskCaseLog = function (autoTaskConfigResult) {
            //$scope.autoTaskId
            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskCaseLogInfoByUuid", {
                params: {
                    autoTaskExecId: autoTaskConfigResult.autoTaskExecId,
                    uuid: autoTaskConfigResult.uuid
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    //$scope.autoTaskCaseLog = data;
                    pareLog(data);
                    $scope.autoTaskCaseResult.log = data;
                } else {
                    toaster.pop("warning", "没有日志信息");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取日志信息失败");
            });
        };

        // 获取用例日志信息
        $scope.getAutoTaskConfigLog = function (autoTaskConfigResult) {
            //$scope.autoTaskId
            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskCaseLogInfoByUuid", {
                params: {
                    autoTaskExecId: autoTaskConfigResult.autoTaskExecId,
                    uuid: autoTaskConfigResult.uuid,
                    isConfig: true
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    pareLog(data);
                    autoTaskConfigResult.log = data;
                } else {
                    //todo: 没有日志信息
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取日志信息失败");
            });
        };
        $scope.showColor = function (result) {
            switch (result) {
                case "Pass" :
                    return "rgb(39, 194, 76)";
                case "Fail" :
                    return "rgb(240, 80, 80)";
                case "Skip" :
                    return "rgb(255, 144, 43)";
                default :
                    return '#232735';//#569515
            }
        };
        $scope.showColorLevel = function (level) {
            var result = level.toLowerCase();
            switch (result) {
                case "info" :
                    return "#23b7e5";
                case "error" :
                    return "#f05050";
                case "fatal" :
                    return "#ec2121";
                case "warn" :
                    return "#ff902b";
                case "debug" :
                case "trace" :
                    return "#909fa7";
                default :
                    return '#000';//#569515
            }
        };

        /** 将秒转化为时分秒 **/
        $scope.formatDuration = function (second) {
            var float = second - Math.floor(second); // 小数
            var duration = Math.floor(second); // 整数
            var h; // 时
            var m; // 分
            var s; // 秒
            var temp = duration % 3600;
            if (duration > 3600) {
                h = Math.floor(duration / 3600);
                if (temp != 0) {
                    if (temp > 60) {
                        m = Math.floor(temp / 60);
                        if (temp % 60 != 0) {
                            s = temp % 60;
                        }
                    } else {
                        s = temp;
                    }
                }
            } else {
                m = Math.floor(duration / 60);
                if (duration % 60 != 0) {
                    s = duration % 60;
                }
            }

            s = (s ? s : 0) + float;

            return (h ? (h + "小时") : "") + (m ? (m + "分") : "") + ((s ? s.toFixed(3) : 0) + "秒");
        };
        //todo: image

    }]);
App.controller('AutoTaskCaseLogControllerDtpBack', ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {

        $scope.exec_id = $stateParams.eid;
        $scope.task_id = $stateParams.tid;
    }]);