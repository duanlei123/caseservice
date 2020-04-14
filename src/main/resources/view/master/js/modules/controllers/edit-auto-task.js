/**=========================================================
 * Module: edit-auto-task.js
 * JS for EditAutoTask
 =========================================================*/

App.controller("EditAutoTaskController", ["$rootScope", "$scope", "$stateParams", "$http", "$modal", "$state", "clone", "toaster", "$timeout", "$interval", "FileUploader", "$ocLazyLoad", "$location",
    function ($rootScope, $scope, $stateParams, $http, $modal, $state, clone, toaster, $timeout, $interval, FileUploader, $ocLazyLoad, $location) {

    if (($scope.autoTaskId = $stateParams.tid) != null) {
        // 当前是否处于任务编辑状态
        $scope.isEditTask = true;
    } else {
        $scope.isEditTask = false;
    }

    // 用户列表
    $scope.userList = $rootScope.allUsers;

    // 产品测试套列表
    $scope.testSuiteList = [];
    $scope.curTestSuite = {};

    // 用例树数据
    $scope.my_data = [];

    // 执行机列表
    $scope.slaveList = [];

    // 浏览器列表
    $scope.browserList = ["Chrome", "Firefox", "Safari", "IE"];

    // 间隔时间
    $scope.spaceList = [4, 8, 12, 24];

    // 用例优先级
    $scope.priorityArr = [1, 2, 3];

    // 用例树搜索条件
    $scope.filterPriorities = {
        selected: []
    };
    $scope.searchOption = {
        priorityArr: []
    };

    // 任务所有信息
    $scope.autoTaskObj = {};

    // 任务基本信息
    $scope.autoTaskSummaryObj = {
        name: "",
        ownerArr: [],
        testSuiteId: "",
        slaveId: "",
        browser: "",
        triggerOption: "annual",
        triggerDate: new Date().toLocaleDateString(),
        triggerTime: new Date(),
        spaceHour: 24,
        runScript: "",
        logFile: "",
        concernUserArr: [],
        description: "",
        config: "",
        productId: "",
        creator: "",
        confKvList: []
    };

    // 已选树分支
    $scope.selectedBranches = [];

    // 是否保存
    $scope.submitted = false;

    $scope.minDate = new Date();

    /** 获取当前用户 **/
    // $http.get("../login/getloginuser/").success(function (data) {
    //     $scope.loginUserId = data.id;
    //     // $scope.getProduct(data.user);
    // });

    /**
     * 根据url的productkey获取当前产品
     */
    // $scope.getProduct = function (loginUser) {
    //     var path = $location.path();
    //     if (path.split('/')[1] == '') {
    //         $http.get("../product/getCurrentProduct", {})
    //             .success(function (data) {
    //                 var newPath = '/' + data.productKey + '/' + path.split('/')[2] + '/' + path.split('/')[3];
    //                 $location.path(newPath);
    //             });
    //     } else {
    //         $http.get('../product/getProduct', {'params': {'productkey': path.split('/')[1]}}).success(function (data) {
    //             if (data == '') {
    //                 $state.go('system-management.allproducts');
    //             } else {
    //                 $scope.relateUser(loginUser, data.id);
    //             }
    //         });
    //     }
    // };
    //
    // /**
    //  * 更新用户最后一次选择的产品
    //  */
    // $scope.relateUser = function (loginUser,productId) {
    //     var relateUserUrl = "http://" + window.location.host + "/cpp/product/relateUser";
    //     $http.post(relateUserUrl, {}, {
    //         params: {
    //             username: loginUser,
    //             productId: productId
    //         }
    //     }).success(function () {
    //         $rootScope.updateSelector(productId);
    //         /** 获取当前产品ID **/
    //         $http.get("../product/getCurrentProduct", {}).success(function (data) {
    //             $scope.currentProductId = data.productID;
    //         });
    //     }).error(function () {
    //         console.log("Relate user product failed");
    //     });
    // };

    /** 获取产品测试套列表（未在同步中） **/
    $http.get("../autotestsuit/getTestSuiteList", {}).success(function (data) {
        $scope.testSuiteList = data;
        if (!$scope.isEditTask && $scope.testSuiteList != null && $scope.testSuiteList.length > 0) {
            $scope.autoTaskSummaryObj.testSuiteId = $scope.testSuiteList[0].id;
            $scope.changeTestSuite($scope.testSuiteList[0]);
        }
        $scope.initAutoTask($scope.autoTaskId);
    });

    /** 获取执行机列表 **/
    $http.get("../slave/getAvailableSlave").success(function (data) {
        $scope.slaveList = data;
        if ($scope.slaveList != null && $scope.slaveList.length > 0) {
            $scope.autoTaskSummaryObj.slaveId = $scope.slaveList[0].id;
        }
    });

    /** 初始化任务信息 **/
    $scope.initAutoTask = function (autoTaskId) {
        if ($scope.isEditTask || autoTaskId != undefined) {
            $http.get("../autotask/getAutoTask", {
                params: {
                    id: autoTaskId
                }
            }).success(function (data) {
                $scope.autoTaskSummaryObj = data.autoTaskSummaryObj;
                $scope.autoTaskSummaryObj.triggerDate = new Date($scope.autoTaskSummaryObj.triggerTime).toLocaleDateString();
                $scope.autoTaskSummaryObj.confKvList = JSON.parse($scope.autoTaskSummaryObj.config);
                $scope.curTestSuite = $scope.testSuiteList.filter(function (testSuite) {
                    return testSuite.id == $scope.autoTaskSummaryObj.testSuiteId;
                })[0];
                $scope.getSlaveById($scope.autoTaskSummaryObj);
                $scope.getTreeRoot($scope.autoTaskSummaryObj.testSuiteId, autoTaskId, $scope.searchOption.priorityList);
            }).error(function () {
            });
        }
    };

    /** 保存自动化任务信息 **/
    $scope.saveAutoTask = function () {
        $scope.submitted = true;
        $scope.autoTaskSummaryObj.triggerTime = _parseTriggerTime($scope.autoTaskSummaryObj.triggerDate, $scope.autoTaskSummaryObj.triggerTime);
        $scope.autoTaskSummaryObj.productId = $scope.currentProductId;
        $scope.autoTaskSummaryObj.creator = $scope.loginUserId;
        $scope.autoTaskSummaryObj.config = JSON.stringify($scope.autoTaskSummaryObj.confKvList);
        $scope.autoTaskObj.autoTaskSummaryObj = $scope.autoTaskSummaryObj;
        $scope.autoTaskObj.autoTreeStructureDtoList = $scope.selectedBranches;

        $("#pageArea").addClass("whirl traditional");
        $http.post("../autotask/editAutoTask", $scope.autoTaskObj, {
            params: {
                isEdit: $scope.isEditTask,
                priorityList: $scope.searchOption.priorityArr
            }
        }).success(function (data) {
            $("#pageArea").removeClass("whirl traditional");
            if (data.result == "success") {
                $state.go("auto.auto-task-list");
            }
            toaster.pop(data.result, ($scope.isEditTask ? "更新" : "创建") + "自动化任务", data.failMessage);
        }).error(function () {
            $("#pageArea").removeClass("whirl traditional");
            toaster.pop("error", ($scope.isEditTask ? "更新" : "创建") + "自动化任务", "失败");
        });
    };

    /** 获取用例树 **/
    $scope.getTreeRoot = function (testSuiteId, autoTaskId, priorityList) {
        var _isTimeout = true;
        $timeout(function () {
            if (_isTimeout) {
                $("#treeBody").addClass("whirl traditional");
            }
        }, 300);
        $http.get("../autotree/getTreeRoot", {
            params: {
                testSuiteId: testSuiteId,
                autoTaskId: autoTaskId,
                priorityList: priorityList
            }
        }).success(function (data) {
            _isTimeout = false;
            $("#treeBody").removeClass("whirl traditional");
            $scope.my_data = data;
        }).error(function () {
            _isTimeout = false;
            $("#treeBody").removeClass("whirl traditional");
        });
    };

    $scope.my_tree_handler = function (branch) {
        // 显示branch信息，用例：数据+优先级；模块：已选X个/共X个
        if (-1 == branch.type) {
            $scope.curBranchInfo = "显示优先级及数据";
        } else {
            // 获取节点下用例个数
            $scope.curBranchInfo = "已选择0个/共4个"
        }
    };

    var tree;
    $scope.my_tree = tree = {};

    /** 更新用例树 **/
    $scope.try_async_load = function (branch) {
        if (null == branch) {
            return;
        }

        if (branch.type != -1 && (branch.children == null || branch.children.length == 0)) {
            var _isTimeout = true;
            $timeout(function () {
                if (_isTimeout) {
                    $("#treeBody").addClass("whirl traditional");
                }
            }, 300);
            $http.get("../autotree/getTreeNodeChildren", {
                params: {
                    testSuiteId: $scope.autoTaskSummaryObj.testSuiteId,
                    autoTaskId: $scope.autoTaskId,
                    moduleId: branch.id,
                    priorityList: $scope.searchOption.priorityArr,
                    checkbox: branch.checkbox
                }
            }).success(function (data) {
                _isTimeout = false;
                $("#treeBody").removeClass("whirl traditional");
                branch.children = data;
            }).error(function () {
                _isTimeout = false;
                $("#treeBody").removeClass("whirl traditional");
            });
        }
    };

    /** 测试套更换触发事件 **/
    $scope.changeTestSuite = function (testSuite) {
        $scope.curTestSuite = testSuite;
        $scope.autoTaskSummaryObj.confKvList = testSuite.config ? JSON.parse(testSuite.config) : [];
        $scope.searchTree();
    };

    /** 用例树过滤 **/
    $scope.searchTree = function () {
        $scope.searchOption.priorityArr = $scope.filterPriorities.selected;
        $scope.getTreeRoot($scope.autoTaskSummaryObj.testSuiteId, $scope.autoTaskId, $scope.searchOption.priorityArr);
    };

    /** 测试环境配置 **/
    $scope.openTestEnvModal = function () {
        $modal.open({
            templateUrl: "/TestEnvModal.html",
            controller: _testEnvController,
            size: "lg",
            scope: $scope,
            keyboard: false,
            backdrop: "static"
        });
    };

    var _testEnvController = function ($scope, $modalInstance) {
        var _testEnvBak = clone.deepClone($scope.autoTaskSummaryObj.config);
        $scope.submitForm = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
            $scope.autoTaskSummaryObj.config = _testEnvBak;
        }
    };

    /** 任务收件人邮箱配置 **/
    $scope.openReceiverModal = function () {
        $modal.open({
            templateUrl: "/ReceiverModal.html",
            controller: _receiverController,
            scope: $scope,
            keyboard: false,
            backdrop: "static"
        });
    };

    var _receiverController = function ($scope, $modalInstance) {
        $scope.receiverList = [];
        if ($scope.autoTaskSummaryObj.concernUserArr == null) {
            $scope.autoTaskSummaryObj.concernUserArr = [];
        }

        for (var i = 0; i < $scope.autoTaskSummaryObj.concernUserArr.length; i++) {
            $scope.receiverList.push({mailAddress: $scope.autoTaskSummaryObj.concernUserArr[i]});
        }
        if ($scope.receiverList.length === 0) {
            $scope.receiverList.push({mailAddress: ""});
        }

        $scope.submitForm = function () {
            $scope.autoTaskSummaryObj.concernUserArr = [];
            for (var i = 0; i < $scope.receiverList.length; i++) {
                $scope.autoTaskSummaryObj.concernUserArr.push($scope.receiverList[i].mailAddress);
            }
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };

        $scope.delEmailAddress = function (index) {
            $scope.receiverList.splice(index, 1);
        };

        $scope.addEmailAddress = function () {
            $scope.receiverList.push({mailAddress: ""});
        };
    };

    /** 导出任务配置文件 **/
    $scope.exportConf = function () {
        $http.post("../autotestsuit/exportConf", JSON.stringify($scope.autoTaskSummaryObj.confKvList), {}).success(function (data) {
            window.location = "http://" + window.location.host + "/cpp/autotestsuit/downloadConf?fileName=" + data.targetFileName;
        }).error(function () {
            toaster.pop("error", "导出任务配置文件", "失败");
        });
    };

    $scope.importConf = function () {
        $modal.open({
            templateUrl: "/ConfigImportModal.html",
            controller: _configImportController,
            scope: $scope,
            keyboard: false,
            backdrop: "static"
        });
    };

    var _configImportController = function ($scope, $modalInstance) {
        $scope.submitForm = function () {
            if (uploader.queue.length > 0) {
                var item = uploader.queue[0];
                var lastUrl = "../autotestsuit/importConf";
                item.upload(lastUrl);
                item.onSuccess = function (response) {
                    $scope.replaceConf(response);
                    toaster.pop("success", "导入配置文件", "成功");
                    $modalInstance.close();
                };
                item.onError = function () {
                    toaster.pop("error", "导入配置文件", "失败");
                    $modalInstance.close();
                }
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    };

    /** 替换配置（若导入的配置文件中存在当前任务配置中的key则替换，其余不更改） **/
    $scope.replaceConf = function (confKvList) {
        for (var i = 0; i < confKvList.length; i++) {
            for (var j = 0; j < $scope.autoTaskSummaryObj.confKvList.length; j++) {
                if (confKvList[i].key == $scope.autoTaskSummaryObj.confKvList[j].key) {
                    $scope.autoTaskSummaryObj.confKvList[j].value = confKvList[i].value;
                    $scope.autoTaskSummaryObj.confKvList[j].description = confKvList[i].description;
                }
            }
        }
    };

    var uploader = $scope.uploader = new FileUploader({
        removeAfterUpload: true,
        queueLimit: 1
    });

    /** 清空文件队列 **/
    $scope.remove = function () {
        uploader.clearQueue();
        $scope.uploader.queue = [];
    };

    $scope.open = function (event) {
        event.preventDefault();
        event.stopPropagation();
        $scope.opened = true;
    };

    var _parseTriggerTime = function (triggerDate, triggerTime) {
        var _date;
        if (null == triggerDate || null == triggerTime) {
            return;
        }
        if (typeof triggerDate === "string") {
            triggerDate = new Date(triggerDate);
        }
        _date = new Date(triggerDate);
        _date.setHours(new Date(triggerTime).getHours());
        _date.setMinutes(new Date(triggerTime).getMinutes());
        return _date;
    };

    $scope.getSlaveById = function (autoTaskSummaryObj) {
        $http.post("../slave/getSlaveConfigById", {}, {
            params: {
                id: autoTaskSummaryObj.slaveId
            }
        }).success(function (data) {
            if (null == data || "" == data) {
                autoTaskSummaryObj.slaveId = "";
            }
        });
    };

    $scope.validateAutoTask = function () {
        return $scope.autoTaskForm["autoTaskName"].$valid &&
            $scope.autoTaskSummaryObj.testSuiteId &&
            ($scope.curTestSuite.type != "WEB" || $scope.autoTaskSummaryObj.browser) &&
            $scope.autoTaskSummaryObj.slaveId &&
            ($scope.autoTaskSummaryObj.triggerOption != "timed" || ($scope.autoTaskSummaryObj.spaceHour && ($scope.autoTaskForm["triggerDate"].$valid && $scope.autoTaskForm["triggerTime"].$valid && $scope.isTriggerValid))) &&
            ($scope.curTestSuite.type != "ThreePart" || ($scope.autoTaskSummaryObj.runScript && $scope.autoTaskSummaryObj.logFile)) &&
            ($scope.curTestSuite.type == "ThreePart" || $scope.selectedBranches.length > 0);
    };

    var _clockTimer = $interval(function () {
        $scope.now = Date.now();
    }, 1000);

    $scope.$on("$destroy", function() {
        $interval.cancel(_clockTimer);
    });

    $scope.$watch("now + autoTaskSummaryObj.triggerOption + autoTaskSummaryObj.triggerDate + autoTaskSummaryObj.triggerTime", function () {
        $scope.isTriggerValid = $scope.autoTaskSummaryObj.triggerOption != "timed" || _parseTriggerTime($scope.autoTaskSummaryObj.triggerDate, $scope.autoTaskSummaryObj.triggerTime) > $scope.now;
    });

    // 加载code Mirror 代码编辑器
    $scope.refreshEditor = 0;
    $ocLazyLoad.load("vendor/codemirror/addon/display/placeholder.js");
    $scope.editorOpts = {
        mode: "shell",
        lineNumbers: true,
        matchBrackets: true,
        theme: "base16-light",
        viewportMargin: 10
    };
    $scope.loadTheme = function() {
        var BASE = "vendor/codemirror/theme/";
        $ocLazyLoad.load(BASE + $scope.editorOpts.theme + ".css");
        $scope.refreshEditor = !$scope.refreshEditor;
        $scope.refreshCodemirror = true;
        $timeout(function () {
            $scope.refreshCodemirror = false;
        }, 100);
    };
    $scope.loadTheme();
}]);
