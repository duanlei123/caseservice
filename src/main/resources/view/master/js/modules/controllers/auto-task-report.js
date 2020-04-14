/**=========================================================
 * Module: edit-auto-report.js
 * JS for AutoTaskReprot
 =========================================================*/

App.controller("AutoTaskReportControllerDtp", ["$rootScope", "$scope", "$stateParams", "$http", '$modal', 'toaster', 'ngDialog', '$sce',
    function ($rootScope, $scope, $stateParams, $http, $modal, toaster, ngDialog, $sce) {

        // 任务id
        $scope.autoTaskExecId = $stateParams.eid;
        $scope.autoTaskExec ={};
        $scope.autoTaskInfo ={};
        $scope.autoTaskReport="";
        $scope.isReportHtmlZipCreated = false;
        $scope.inBusy = false;
        $scope.vm = {};
        $scope.vm.receiveUsers = [];
        $scope.SEND_STATE = {NotSend: 0, SendOk: 1, SendFail: 2};
        $scope.vm.sendResult = $scope.SEND_STATE.NotSend;

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
                    $scope.getAutoTaskInfo( $scope.autoTaskExec.autoTaskId);

                } else {
                    //todo: error
                }

            }).error(function (data, status) {
                //todo: error
                $scope.inBusy = false;
                toaster.pop("error", "获取测试任务执行信息失败");
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
                    $scope.isReportHtmlZipCreated($scope.autoTaskExecId);
                } else {
                    toaster.pop("error", "获取测试任务信息失败");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试任务信息失败");
            });
        };

        $scope.isReportHtmlZipCreated = function (autoTaskExecId) {
            $scope.inBusy = true;
            $http.get("../autotask/isReportHtmlZipCreated", {
                params: {
                    autoTaskExecId: autoTaskExecId
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    $scope.isReportHtmlZipCreated = data;
                    $scope.getAutoTaskReport(autoTaskExecId);
                } else {
                    toaster.pop("error", "获取测试任务信息失败");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试任务信息失败");
            });
        };

        $scope.getAutoTaskReport = function (autoTaskExecId) {
            //$scope.autoTaskId
            $scope.inBusy = true;
            $http.get("../autotask/getAutoTaskExecReport", {
                params: {
                    autoTaskExecId: autoTaskExecId
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if (data != null) {
                    $scope.autoTaskReport= $sce.trustAsHtml(data);;
                } else {
                    toaster.pop("error", "获取测试报告失败");
                }
            }).error(function (data, status) {
                $scope.inBusy = false;
                toaster.pop("error", "获取测试报告失败");
            });
        };

        // 发送邮件报告
        $scope.sendAutoTaskReport = function (recieveUsers) {
            if ($scope.inBusy == true) {
                return;
            }
            $scope.inBusy = true;
            $scope.vm.sendResult = $scope.SEND_STATE.NotSend;

            $http.get("../autotask/sendAutoTaskExecReport", {
                params: {
                    autoTaskExecId: $scope.autoTaskExecId,
                    //receiveUsers:recieveUsers,
                    receiveEmails: recieveUsers
                }
            }).success(function (data) {
                $scope.inBusy = false;
                if(data == true) {
                    $scope.vm.sendResult = $scope.SEND_STATE.SendOk;
                    // 发送成功，更新报告
                    $scope.getAutoTaskReport($scope.autoTaskExecId);
                } else {
                    $scope.vm.sendResult = $scope.SEND_STATE.SendFail;
                }
            }).error(function (data, status) {
                $scope.vm.sendResult = $scope.SEND_STATE.SendFail;
                $scope.inBusy = false;
            });
        };

        // 打开邮件
        $scope.openConfirmSendReportModal = function () {
            $scope.receiverList = [{mailAddress: ""}];

            if ($scope.inBusy == true) {
                return;
            }
            $scope.vm.receiveUsers = [];
            var modalInstance = $modal.open({
                templateUrl: '/confirmSendReport.html',
                scope: $scope,
                controller: confirmSendReportController
            });
            modalInstance.result.then(function () {
                $scope.sendAutoTaskReport($scope.vm.receiveUsers);
            }, function () {
                $scope.vm.receiveUsers = [];
            });
        };
        var confirmSendReportController = function ($modalInstance, $scope) {
            $scope.vm.sendResult = $scope.SEND_STATE.NotSend;
            $scope.submitForm = function () {
                $scope.vm.receiveUsers = [];
                for (var i = 0; i < $scope.receiverList.length; i++) {
                    $scope.vm.receiveUsers.push($scope.receiverList[i].mailAddress);
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

    }]);
App.controller('AutoTaskReportControllerDtpBack', ['$scope',  '$state', '$stateParams',
    function ($scope, $state, $stateParams) {

        $scope.exec_id = $stateParams.eid;
        $scope.task_id = $stateParams.tid;
    }]);