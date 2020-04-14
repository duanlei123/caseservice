/**=========================================================
 * Module: auto-task-list.js
 * JS for AutoTaskList
 =========================================================*/

App.controller("AutoTaskListController", ["$rootScope", "$scope", "$http", "NgTableParams", "toaster", "ngDialog", "blockUI", '$location', function ($rootScope, $scope, $http, NgTableParams, toaster, ngDialog, blockUI, $location) {

    // 查询条件
    $scope.searchOption = {
        productId: "",
        autoTaskName: "",
        isMyTask: false,
        isMyConcern: false,
        creator: "",
        concernUser: ""
    };

    // 任务列表
    $scope.autoTaskList = [];
    // $rootScope.judgeUrl();

    /** 获取当前用户 **/
    // $http.get("../login/getloginuser/").success(function (data) {
    //     $scope.loginUserId = data.id;
    //     // $scope.getProduct(data.user);
    // });

    // /**
    //  * 根据url的productkey获取当前产品
    //  */
    // $scope.getProduct = function (loginUser) {
    //     var path = $location.path();
    //     $http.get('../product/getProduct', {'params': {'productkey': path.split('/')[1]}}).success(function (data) {
    //         if (data == '') {
    //             $scope.getUserProduct();
    //         } else {
    //             $scope.relateUser(loginUser,data.id);
    //         }
    //     });
    // };

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
    //         $scope.getUserProduct();
    //     }).error(function () {
    //         console.log("Relate user product failed");
    //     });
    // };
    //
    // $scope.getUserProduct = function () {
    //     $http.get("../product/getCurrentProduct", {})
    //         .success(function (data) {
    //             $scope.currentProductId = data.productID;
    //             $scope.searchOption.productId = $scope.currentProductId;
    //             $scope.getAutoTaskList();
    //         })
    //         .error(function (data, status) {
    //
    //         });
    // };

    /**  获取任务列表 **/
    $scope.getAutoTaskList = function () {
        // $("#container").addClass("whirl traditional");
        var myBlockUI = blockUI.instances.get("myBlockUI");
        myBlockUI.start("数据正在加载中...");
        $scope.searchOption.creator = $scope.searchOption.isMyTask ? $scope.loginUserId : "";
        $scope.searchOption.concernUser = $scope.searchOption.isMyConcern ? $scope.loginUserId : "";
        $http.post("../autotask/searchAutoTaskList", $scope.searchOption, {})
            .success(function (data) {
                // $("#container").removeClass("whirl traditional");
                myBlockUI.stop();
                $scope.autoTaskList = data;
                if (typeof($scope.tableParams) === "undefined") {
                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.autoTaskList.length,
                        getData: function ($defer, params) {
                            params.total($scope.autoTaskList.length);
                            for (var i = (params.page() - 1) * params.count(); i < params.page() * params.count() && i < $scope.autoTaskList.length; i++) {
                                var autoTask = $scope.autoTaskList[i];
                                if (autoTask.name === null || autoTask.name.length <= 0) {
                                    autoTask.name = "版本任务名称未知"
                                }
                                if (autoTask.creator === null || autoTask.creator.length <= 0) {
                                    autoTask.creator = "未知"
                                }
                                $scope.getAutoTaskExecProgress(autoTask);
                                $scope.isMyConcern(autoTask);
                            }
                            $defer.resolve($scope.autoTaskList.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });
                } else {
                    $scope.autoTaskList = data;
                    $scope.tableParams.$params.total = $scope.autoTaskList.length;
                    $scope.tableParams.$params.page = 1;
                    $scope.tableParams.reload();
                }
                $scope.isLoading = false;
            })
            .error(function () {
                // $("#container").removeClass("whirl traditional");
                myBlockUI.stop();
            });
    };
    $scope.getAutoTaskList();
    $scope.getAutoTaskExecProgress = function (autoTask) {
        $http.get("../autotask/getLastExecProgress", {
            params: {
                autoTaskId: autoTask.id
            }
        }).success(function (data) {
            autoTask.progress = data;
        });
    };

    /** 关注任务 **/
    $scope.setMyConcern = function (autoTask) {
        $http.post("../autotask/relateConcernUser", {}, {
            params: {
                autoTaskId: autoTask.id,
                userId: $scope.loginUserId
            }
        }).success(function () {
            autoTask.isMyConcern = true;
            toaster.pop("success", "关注任务", "成功");
        }).error(function() {
            toaster.pop("error", "关注任务", "失败");
        });
    };

    /** 取消关注任务 **/
    $scope.removeMyConcern = function (autoTask) {

        $http.post("../autotask/removeConcernUser", {}, {
            params: {
                autoTaskId: autoTask.id,
                userId: $scope.loginUserId
            }
        }).success(function () {
            autoTask.isMyConcern = false;
            toaster.pop("success", "取消关注任务", "成功");
        }).error(function () {
            toaster.pop("error", "取消关注任务", "失败");
        });
    };

    /** 判断某任务是否属于当前登录用户关注的 **/
    $scope.isMyConcern = function (autoTask) {
        if (null == autoTask.isMyConcern) {
            if (autoTask.concernUser != null && autoTask.concernUser.indexOf($scope.loginUserId) >= 0) {
                autoTask.isMyConcern = true;
            } else {
                autoTask.isMyConcern = false;
            }
            return autoTask.isMyConcern;
        } else {
            return autoTask.isMyConcern;
        }
    };

    $scope.openDeleteModal = function (autoTask) {
        ngDialog.openConfirm({
            template: "confirmDeleteDialog",
            scope: $scope,
            data: {
                autoTask: autoTask
            }
        }).then(function () {

        }, function () {
        });
    };

    /** 删除任务 **/
    $scope.deleteAutoTask = function (autoTask) {
        $(".ngdialog-content").addClass("whirl traditional");
        $http.post("../autotask/deleteAutoTask", {}, {
            params: {
                id: autoTask.id
            }
        }).success(function () {
            toaster.pop("success", "删除自动化任务", "成功");
            $(".ngdialog-content").removeClass("whirl traditional");
            ngDialog.closeAll();
            $scope.getAutoTaskList();
        }).error(function () {
            toaster.pop("error", "删除自动化任务", "失败");
            $(".ngdialog-content").removeClass("whirl traditional");
            ngDialog.closeAll();
            $scope.getAutoTaskList();
        });
    };

    $scope.openRunModal = function (autoTask) {
        ngDialog.openConfirm({
            template: "confirmRunDialog",
            scope: $scope,
            data: {
                autoTask: autoTask
            }
        }).then(function () {

        }, function () {
        });
    };

    /** 启动任务 **/
    $scope.runAutoTask = function (autoTask) {
        $(".ngdialog-content").addClass("whirl traditional");
        $http.post("../autotask/runAutoTask", {}, {
            params: {
                id: autoTask.id
            }
        }).success(function (data) {
            $(".ngdialog-content").removeClass("whirl traditional");
            toaster.pop(data.result, "启动任务", data.failMessage);
            ngDialog.closeAll();
            $scope.getAutoTaskList();
        }).error(function () {
            $(".ngdialog-content").removeClass("whirl traditional");
            ngDialog.closeAll();
        });
    };

    $scope.openStopModal = function (autoTask) {
        ngDialog.openConfirm({
            template: "confirmStopDialog",
            scope: $scope,
            data: {
                autoTask: autoTask
            }
        }).then(function () {

        }, function () {
        });
    };

    /** 中止任务 **/
    $scope.stopAutoTask = function (autoTask) {
        $(".ngdialog-content").addClass("whirl traditional");
        $http.post("../autotask/stopAutoTask", {}, {
            params: {
                id: autoTask.id
            }
        }).success(function (data) {
            $(".ngdialog-content").removeClass("whirl traditional");
            if (data) {
                ngDialog.closeAll();
                $scope.getAutoTaskList();
                toaster.pop("success", "中止任务", "成功");
            } else {
                ngDialog.closeAll();
                toaster.pop("error", "中止任务", "失败");
            }
        }).error(function () {
            $(".ngdialog-content").removeClass("whirl traditional");
        });
    };

    $scope.showColorByStatus = function (status) {
        switch (status) {
            case "SUCCESS":
                return "label-success";
            case "FAILURE":
                return "label-danger";
            case "ABORTED":
                return "label-warning";
            case "RUNNING":
                return "label-dtgreen";
            case "NOT TEST":
                return "label-dtgray";
            default:
                return "";
        }
    };
}]);
