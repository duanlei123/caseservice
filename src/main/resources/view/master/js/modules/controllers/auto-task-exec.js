/**=========================================================
 * Module: edit-auto-task.js
 * JS for EditAutoTask
 =========================================================*/

App.controller("AutoTaskExecController", ["$rootScope", "$scope", "$stateParams", "$http", "NgTableParams", "ngDialog", "toaster", "$timeout", "$filter", "blockUI",
    function ($rootScope, $scope, $stateParams, $http, NgTableParams, ngDialog, toaster, $timeout, $filter, blockUI) {

    $scope.autoTaskId = $stateParams.tid; // 任务id

    $scope.execId = $stateParams.eid; // 执行id

    $scope.autoTaskExecList = []; // 任务执行列表

    $scope.caseResultList = []; // 用例结果列表

    $scope.caseModuleList = []; // 用例所属模块列表

    $scope.results = ["Pass", "Fail", "Skip", "Not Test"]; // 用例结果列表

    // 过滤条件
    $scope.searchOption = {
        caseName: "",
        resultList: [],
        packageName: ""
    };

    $scope.caseResultTab = {}; // 用例结果Tab页

    $http.get("../autotask/getAutoTaskSummary", {
        params: {
            autoTaskId: $scope.autoTaskId
        }
    }).success(function (data) {
        $scope.autoTaskName = data.name;
    });

    /** 获取任务所有执行列表 **/
    $scope.getAutoTaskExecList = function () {
        $http.get("../autotask/getAutoTaskExecList", {
            params: {
                autoTaskId: $scope.autoTaskId
            }
        }).success(function (data) {
            $scope.autoTaskExecList = data;
            if ($scope.autoTaskExecList.length > 0) {
                var _exec;
                for (var i = 0; i < $scope.autoTaskExecList.length; i++) {
                    if ($scope.execId == $scope.autoTaskExecList[i].id) {
                        _exec = $scope.autoTaskExecList[i];
                        break;
                    }
                }
                $scope.getAutoTaskExecInfo($scope.autoTaskId, _exec == null ? $scope.autoTaskExecList[0] : _exec);
            }
        });
    };
    $scope.getAutoTaskExecList();

    /** 获取某次执行的用例结果 **/
    $scope.getAutoTaskCaseResult = function (autoTaskExecId) {
        var myBlockUI = blockUI.instances.get("resultBlockUI");
        myBlockUI.start("数据正在加载中...");
        $http.post("../autotask/getAutoTaskCaseResult", $scope.searchOption, {
            params: {
                autoTaskExecId: autoTaskExecId
            }
        }).success(function (data) {
            myBlockUI.stop();
            $scope.caseResultList = data;
            if (typeof($scope.tableParams) == "undefined") {
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        lastPackageName: "asc"
                    }
                }, {
                    total: $scope.caseResultList.length,
                    getData: function ($defer, params) {

                        var orderedData = params.sorting() ? $filter("orderBy")($scope.caseResultList, params.orderBy()) : $scope.caseResultList;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            } else {
                $scope.caseResultList = data;
                $scope.tableParams.$params.total = $scope.caseResultList.length;
                $scope.tableParams.$params.page = 1;
                $scope.tableParams.reload();
            }
        }).error(function (data, status) {
            myBlockUI.stop();
        });
    };

    $scope.getAutoTaskExec = function (autoTaskExecId) {
        $http.get("../autotask/getAutoTaskExec", {
            params: {
                autoTaskExecId: autoTaskExecId
            }
        }).success(function (data) {
            for (var i = 0; i < $scope.autoTaskExecList.length; i++) {
                if (autoTaskExecId == $scope.autoTaskExecList[i].id) {
                    $scope.autoTaskExecList[i] = data;
                }
            }
            $scope.currentExec = data;
        });
    };

    /** 获取某次执行时任务的配置信息 **/
    $scope.getAutoTaskCfg = function (autoTaskId, autoTaskExecId) {
        $http.get("../autotask/getAutoTaskCfg", {
            params: {
                autoTaskId: autoTaskId,
                autoTaskExecId: autoTaskExecId
            }
        }).success(function (data) {
            if (!data || (Object.prototype.isPrototypeOf(data) && Object.keys(data).length === 0)) {
                toaster.pop("error", "获取任务基本信息", "失败");
            }
            $scope.autoTaskSummaryObj = data;
            $scope.autoTaskSummaryObj.confKvList = $scope.autoTaskSummaryObj.config == null ? [] : JSON.parse($scope.autoTaskSummaryObj.config);
            $scope.getTestSuite($scope.autoTaskSummaryObj.testSuiteId);
            console.log("ss:"+$scope.autoTaskSummaryObj.testSuiteId);
        });
    };

    /** 获取任务执行进度信息 **/
    $scope.getAutoTaskExecProgress = function (autoTaskExecId) {
        var myBlockUI = blockUI.instances.get("progressBlockUI");
        myBlockUI.start("数据正在加载中...");
        $http.get("../autotask/getAutoTaskExecProgress", {
            params: {
                autoTaskExecId: autoTaskExecId,
                bIncludeModule: true // 包含模块进度
            }
        }).success(function (data) {
            myBlockUI.stop();
            $scope.caseModuleList = [];
            $scope.autoTaskProgress = data;
            for (var i = 0; i < $scope.autoTaskProgress.moduleProgressList.length; i++) {
                $scope.caseModuleList.push({packageName: $scope.autoTaskProgress.moduleProgressList[i].packageName,
                    lastPackageName: $scope.autoTaskProgress.moduleProgressList[i].lastPackageName});
            }
            $scope.initGraph($scope.autoTaskProgress);
        }).error(function () {
            myBlockUI.stop();
        });
    };

    /** 获取任务执行对应jenkins job build console log **/
    $scope.getAutoTaskExecConsole = function (autoTaskId, autoTaskExecId) {
        $http.get("../autotask/getAutoTaskExecConsole", {
            params: {
                autoTaskId: autoTaskId,
                autoTaskExecId: autoTaskExecId
            }
        }).success(function (data) {
            $scope.autoTaskExecConsole = data;
        });
    };

    $scope.getAutoTaskLogFile = function (autoTaskId, autoTaskExecId) {
        var myBlockUI = blockUI.instances.get("reportBlockUI");
        myBlockUI.start("数据正在加载中...");
        $.ajax({
            url: "../autotask/getAutoTaskLogFile",
            data: {autoTaskId: autoTaskId, autoTaskExecId: autoTaskExecId},
            dataType: "text",
            success: function (data) {
                myBlockUI.stop();
                $scope.autoTaskLog = data;
            }, error: function () {
                myBlockUI.stop();
            }
        });
    };

    $scope.getTestSuite = function (id) {
        $http.get("../autotestsuit/getTestSuiteByID", {
            params: {
                id: id
            }
        }).success(function (data) {
            $scope.autoTestSuite = data;
        });
    };

    /** 获取任务执行信息 **/
    $scope.getAutoTaskExecInfo = function (autoTaskId, autoTaskExec) {
        // 当前执行记录
        $scope.currentExec = autoTaskExec;
        $scope.getAutoTaskCfg(autoTaskId, autoTaskExec.id);
        $scope.getAutoTaskCaseResult(autoTaskExec.id);
        $scope.getAutoTaskExecProgress(autoTaskExec.id);
        $scope.getAutoTaskLogFile(autoTaskId, autoTaskExec.id);
        // $scope.getAutoTaskExecConsole(autoTaskId, autoTaskExec.id);
    };

    /** 刷新 **/
    $scope.refreshExecInfo = function (autoTaskId, autoTaskExec) {
        $scope.getAutoTaskExec(autoTaskExec.id);
        $scope.getAutoTaskExecInfo(autoTaskId, autoTaskExec);
    };

    /** 打开删除对话框 **/
    $scope.openDeleteModal = function (autoTaskExecId) {
        ngDialog.openConfirm({
            template: "confirmDeleteDialog",
            scope: $scope,
            data: {
                autoTaskExecId: autoTaskExecId
            }
        }).then(function () {

        }, function () {
        });
    };

    /** 删除执行记录（包括生成的所有数据） **/
    $scope.deleteAutoTaskExec = function (autoTaskExecId) {
        $(".ngdialog-content").addClass("whirl traditional");
        $http.post("../autotask/deleteAutoTaskExec", {}, {
            params: {
                autoTaskExecId: autoTaskExecId
            }
        }).success(function () {
            toaster.pop("success", "删除执行记录数据", "成功");
            $(".ngdialog-content").removeClass("whirl traditional");
            ngDialog.closeAll();
            $scope.getAutoTaskExecList();
        }).error(function () {
            toaster.pop("error", "删除执行记录数据", "失败");
            $(".ngdialog-content").removeClass("whirl traditional");
            ngDialog.closeAll();
            $scope.getAutoTaskExecList();
        });
    };

    /** 初始化进度、统计图 **/
    $scope.initGraph = function (autoTaskProgress) {
        if (null == autoTaskProgress) {
            return;
        }

        $("#progressGraph").ClassyLoader({
            triggerInView: true,
            percentage: parseInt(autoTaskProgress.percent),
            speed: 0,
            showText: true,
            start: "top",
            fontSize: "35px",
            roundedLine: true,
            lineColor: "#0094cb",
            remainingLineColor: "rgb(200,200,200)",//rgba(200,200,200,0.4)
            lineWidth: 10
        });

        $("#statisticGraph").html(null);
        $scope.statisticData = [];

        $scope.statisticData.push({label: "Not Test个数", value: autoTaskProgress.notTestCount});
        $scope.statisticData.push({label: "Pass个数", value: autoTaskProgress.passCount});
        $scope.statisticData.push({label: "Fail个数", value: autoTaskProgress.failCount});
        $scope.statisticData.push({label: "Skip个数", value: autoTaskProgress.skipCount});

        $scope.statisticOptions = {
            data: $scope.statisticData,
            element: $("#statisticGraph"),
            colors: ["#C8C8C8", "#27c24c", "#f05050", "#ff902b"],//dde6e9
            resize: true
        };

        $scope.statisticMorrisInstance = new Morris["Donut"]($scope.statisticOptions);
        $scope.statisticMorrisInstance.redraw();
        $scope.statisticMorrisInstance.select(1);
    };

    /** 根据用例结果进行颜色区分 **/
    $scope.showColor = function (result) {
        switch (result) {
            case "Pass" :
                return "#27c24c";
            case "Fail" :
                return "#f05050";
            case "Skip" :
                return "#ff902b";
            default :
                return "#232735";
        }
    };

    /** 清空已选结果 **/
    $scope.clearResults = function () {
        $scope.searchOption.resultList = [];
        $scope.getAutoTaskCaseResult($scope.currentExec.id);
    };

    /** 清空已选模块 **/
    $scope.clearModule = function () {
        $scope.caseResultTab.active = true;
        $scope.searchOption.packageName = "";
        $scope.getAutoTaskCaseResult($scope.currentExec.id);
    };

    /** 按模块过滤 **/
    $scope.filterByModule = function (module, result) {
        $scope.caseResultTab.active = true;
        $scope.searchOption.packageName = module;
        $scope.searchOption.resultList = result == null ? [] : [result];
        $scope.getAutoTaskCaseResult($scope.currentExec.id);
    };

    /** 重绘进度、统计图 **/
    $scope.redrawGraph = function () {
        $timeout(function () {
            $scope.initGraph($scope.autoTaskProgress);
        }, 35);
    };
}]);
