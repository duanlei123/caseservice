App.controller('AutoTestSuiteCtrl', ['$scope', '$modal', 'ngDialog', '$http', 'toaster', 'NgTableParams', 'FileUploader', '$timeout', '$sce', '$filter', 'blockUI', '$rootScope',
    function($scope, $modal, ngDialog, $http, toaster, NgTableParams, FileUploader, $timeout, $sce, $filter, blockUI,$rootScope) {

        //获取测试测列表
        // $rootScope.getLoginUser();
        $scope.gettestsuitelist = function() {
            // loding
            var myBlockUI = blockUI.instances.get("myBlockUI");
            myBlockUI.start("数据正在加载中...");

            // 发送请求获取测试套列表
            $scope.url = '../autotestsuit/getTestSuiteList';
            $scope.getTestSuiteList = [];
            $http.get($scope.url).success(function(data) {
                myBlockUI.stop();
                $scope.getTestSuiteList = data.data;

                if (typeof($scope.tableParams) == "undefined") {
                    $scope.tableParams = new NgTableParams({
                            page: 1,
                            count: 10
                        }, {
                            total: $scope.getTestSuiteList.length,
                            getData: function($defer, params) {
                                params.total($scope.getTestSuiteList.length);
                                $defer.resolve($scope.getTestSuiteList.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        });
                } else {
                    $scope.tableParams.$params.total = $scope.getTestSuiteList.length;
                    $scope.tableParams.$params.page = 1;
                    $scope.tableParams.reload();
                }
            }).error(function() {
                myBlockUI.stop();
            });
        };
        $scope.gettestsuitelist();



        // 同步测试套
        $scope.synchronization = function(testSuite) {
            if (testSuite.chs_name == "running") {
                toaster.pop("error", "测试套用例解析中....");
                return;
            }
            var modalInstance = $modal.open({
                templateUrl: '/synchronization',
                controller: synchronizationCtrl,
                scope: $scope,
                resolve: {
                    testsuite: function() {
                        return testSuite;
                    }
                },
                keyboard: false,
                backdrop: 'static'
            });
            modalInstance.result.then(function() {

                },
                function() {});
        };
        // 同步测试套
        var synchronizationCtrl = function($scope, testsuite, $modalInstance, ngDialog, toaster) {
            $scope.input = function() {
                if ($scope.testsuite.gitusername == "") {
                    toaster.pop("error", "请填写git仓库用户名");
                    return false;
                }
                if ($scope.testsuite.gitusername == "") {
                    toaster.pop("error", "请填写git仓库密码");
                    return false;
                }
                return true;
            };
            $scope.testsuite = {
                id: testsuite.id,
                name: testsuite.name,
                productId: testsuite.productId,
                gitUrl: testsuite.gitUrl,
                type: testsuite.type,
                config: testsuite.config,
                confFileName: testsuite.confFileName,
                caseRootPackage: testsuite.caseRootPackage,
                status: testsuite.status,
                refCount: testsuite.refCount,
                description: testsuite.description,
                version: testsuite.version,
                branch: testsuite.branch,
                log: testsuite.log,
                chs_name: testsuite.chs_name,
                gitusername: testsuite.gitusername,
                gitpassword: testsuite.gitusername
            };

            $scope.synchronizationFormSubmit = function() {
                if ($scope.input()) {
                    var RequestCaseServiceUrl = 'parseRepoCase';
                    $scope.url = '../autotestsuit/' + RequestCaseServiceUrl;
                    $http.post($scope.url, $scope.testsuite, {}).success(function (data) {
                        $modalInstance.close();
                        if (data.flag) {
                            toaster.pop("success", "同步测试用例", "开始同步测试用例");
                        } else {
                            toaster.pop("error", "同步测试用例", "同步测试用例失败");
                        }
                        var a = $timeout(function () {
                            $scope.gettestsuitelist();
                        }, 6000);
                    }).error(function () {
                        $modalInstance.close();
                        $scope.gettestsuitelist();
                        toaster.pop("error", "同步测试用例", "同步测试套失败");
                    });
                }
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };


        // 添加新测试套
        $scope.addTestSuite = function() {
            var modalInstance = $modal.open({
                templateUrl: '/addTestSuite',
                controller: addTestSuiteCtrl,
                scope: $scope,
                keyboard: false,
                backdrop: 'static'
            });
            modalInstance.result.then(function() {},
                function() {});
        };
        // 添加新测试套控制器
        var addTestSuiteCtrl = function($scope, $modalInstance, toaster) {
            $scope.gitProjectName = "";
            $scope.submitted = false;
            $scope.gitType = "http";
            // 用例Excel文件导入上传
            // var uploader = $scope.uploader = new FileUploader({
            //     removeAfterUpload: true,
            //     queueLimit: 1
            // });
            // 判断输入是否符合规范
            $scope.validateInput = function(name, type) {
                var input = $scope.addTestSuiteForm[name];
                return (input.$dirty || $scope.submitted) && input.$error[type];
            };

            $scope.input = function() {
                if ($scope.testsuite.name == undefined) {
                    toaster.pop("error", "请填写测试集名称");
                    return false;
                }
                if ($scope.testsuite.type == undefined) {
                    toaster.pop("error", "请填写测试集类型");
                    return false;
                }
                if ($scope.gitType == "") {
                    toaster.pop("error", "请填写测试集git类型");
                    return false;
                }
                return true;
            };

            $scope.submitForm = function() {

                $scope.branch = "master";
                $scope.initrefCount = 0;

                if ($scope.input()) {
                    $scope.url = '../autotestsuit/add';
                    $scope.TestSuite = {
                        name: $scope.testsuite.name,
                        productId: null,
                        gitUrl: $scope.testsuite.gitUrl,
                        type: $scope.testsuite.type,
                        config: null,
                        confFileName: $scope.testsuite.confFileName,
                        caseRootPackage: $scope.testsuite.caseRootPackage,
                        status: null,
                        refCount: $scope.initrefCount,
                        description: $scope.testsuite.description,
                        version: "1.0.0",
                        chs_name: null,
                        branch: $scope.branch,
                        log: null
                    };

                    $("#addTestSuite").addClass("whirl traditional");
                    $http.get("../autotestsuit/getTestSuiteByIDAndName", {
                        params: {
                            name: $scope.testsuite.name
                        }
                    }).success(function(data) {
                        if (data.flag) {
                            $("#addTestSuite").removeClass("whirl traditional");
                            toaster.pop("error", "添加测试套", "失败：存在相同名称的测试套");
                        } else {
                            $http.post($scope.url, $scope.TestSuite).success(function(data) {
                                $modalInstance.close();
                                $scope.gettestsuitelist();
                                if (data.flag){
                                    toaster.pop("success", "添加成功", "添加测试套成功,请点击同步开始解析测试套");
                                }else {
                                    toaster.pop("error", "添加失败", "添加测试套失败");
                                }
                                // $scope.RequestCaseService(data, $scope.TestSuite.gitUrl, $scope.TestSuite.branch);
                            }).error(function() {
                                $modalInstance.close();
                                toaster.pop("error", "添加失败", "添加测试套失败");
                            });
                        }
                    }).error(function() {
                        toaster.pop("error", "添加测试套", "失败：网络异常");
                        $modalInstance.close();
                    });
                };
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };


        //测试环境配置
        $scope.openTestSuitEnvModal = function(testSuite) {
            $modal.open({
                templateUrl: "/TestSuitEnvModal.html",
                controller: _testSuitEnvModal,
                size: "lg",
                scope: $scope,
                resolve: {
                    testsuite: function() {
                        return testSuite;
                    }
                },
                keyboard: false,
                backdrop: "static"
            });
        };

        var _testSuitEnvModal = function($scope, $modalInstance, testsuite) {
            //var _testEnvBak = clone.deepClone($scope.autoTaskSummaryObj.config);
            $scope.testsuite = {
                id: testsuite.id,
                name: testsuite.name,
                productId: testsuite.productId,
                gitUrl: testsuite.gitUrl,
                type: testsuite.type,
                config: testsuite.config,
                confFileName: testsuite.confFileName,
                caseRootPackage: testsuite.caseRootPackage,
                status: testsuite.status,
                refCount: testsuite.refCount,
                description: testsuite.description,
                version: testsuite.version,
                branch: testsuite.branch,
                log: testsuite.log,
                chs_name: null
            };
            $scope.importConfs = 0;
            if ($scope.testsuite.config != ""){
                $scope.confKvList = JSON.parse($scope.testsuite.config);
            }
            $scope.importConf = function() {
                $scope.importConfs = 1;
            };
            var uploader = $scope.uploader = new FileUploader({
                removeAfterUpload: true,
                queueLimit: 1
            });
            $scope.exportSubmitForm = function() {
                if (uploader.queue.length > 0) {
                    var item = uploader.queue[0];
                    var lastUrl = "../autotestsuit/importConf";
                    item.upload(lastUrl);
                    item.onSuccess = function(response) {
                        if (response != ""){
                            $scope.replaceConf(response);
                            toaster.pop("success", "导入配置文件", "成功");
                            $scope.importConfs = 0;
                        }else {
                            toaster.pop("error", "导入配置文件", "失败");
                            $scope.importConfs = 0;
                        }
                    };
                    item.onError = function() {
                        toaster.pop("error", "导入配置文件", "失败");
                        $scope.importConfs = 0;
                    }
                }
            }
            /** 替换配置（若导入的配置文件中存在当前任务配置中的key则替换，其余不更改） **/
            $scope.replaceConf = function(confKvList) {
                $scope.confKvList = confKvList
            };
            /** 导出任务配置文件 **/
            $scope.exportConf = function() {
                $http.post('../autotestsuit/exportConf', JSON.stringify($scope.confKvList), {}).success(function(data) {
                    window.location = "http://" + window.location.host + "/autotestsuit/downloadConf?fileName=" + data.targetFileName;
                    $modalInstance.close();
                }).error(function() {
                    toaster.pop("error", "导出任务配置文件", "失败");
                });
            };
            $scope.exportCancel = function() {
                $scope.remove();
                $scope.importConfs = 0;
            }
            /** 清空文件队列 **/
            $scope.remove = function() {
                uploader.clearQueue();
                uploader.cancelAll();
                $scope.uploader.queue = [];
            };
            $scope.submitForm = function() {
                $scope.url = '../autotestsuit/updateTestSuitConf';
                $scope.testsuite = {
                    id: testsuite.id,
                    name: testsuite.name,
                    productId: testsuite.productId,
                    gitUrl: testsuite.gitUrl,
                    type: testsuite.type,
                    config: JSON.stringify($scope.confKvList),
                    confFileName: testsuite.confFileName,
                    caseRootPackage: testsuite.caseRootPackage,
                    status: testsuite.status,
                    refCount: testsuite.refCount,
                    description: testsuite.description,
                    version: testsuite.version,
                    branch: testsuite.branch,
                    log: testsuite.log,
                    chs_name: null
                };
                $http.post($scope.url, $scope.testsuite).success(function(data) {
                    $scope.gettestsuitelist();
                    toaster.pop("success", "更新成功", "更新测试套配置成功");
                }).error(function() {
                    toaster.pop("error", "更新失败", "更新测试套配置失败");
                });
                $modalInstance.close();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
                // $scope.autoTaskSummaryObj.config = _testEnvBak;
            }
        };


        // 编辑测试套
        $scope.editTestSuite = function(testSuite) {
            if (testSuite.chs_name == "running") {
                toaster.pop("error", "测试套用例解析中，无法编辑");
                return;
            }

            var modalInstance = $modal.open({
                templateUrl: '/editTestSuite',
                controller: editTestSuiteCtrl,
                scope: $scope,
                resolve: {
                    testsuite: function() {
                        return testSuite;
                    }
                },
                keyboard: false,
                backdrop: 'static'
            });
            modalInstance.result.then(function() {

                },
                function() {});
        };
        // 编辑测试套控制器
        var editTestSuiteCtrl = function($scope, testsuite, $modalInstance, ngDialog, toaster, FileUploader) {

            $scope.submitted = false;
            $scope.update = false;
            // 判断输入是否符合规范
            $scope.validateInput = function(name, type) {
                var input = $scope.editTestSuiteForm[name];
                return (input.$dirty || $scope.submitted) && input.$error[type];
            };

            $scope.url = '../autotestsuit/update';
            $scope.testsuite = {
                id: testsuite.id,
                name: testsuite.name,
                productId: testsuite.productId,
                gitUrl: testsuite.gitUrl,
                type: testsuite.type,
                config: testsuite.config,
                confFileName: testsuite.confFileName,
                caseRootPackage: testsuite.caseRootPackage,
                status: testsuite.status,
                refCount: testsuite.refCount,
                description: testsuite.description,
                version: testsuite.version,
                branch: testsuite.branch,
                log: testsuite.log,
                chs_name: null
            };
            $scope.editFormSubmit = function() {

                if ($scope.editTestSuiteForm.$valid) {
                    $("#editTestSuite").addClass("whirl traditional");
                    $http.get("../autotestsuit/getTestSuiteByIDAndName", {
                        params: {
                            id: testsuite.id,
                            name: $scope.testsuite.name
                        }
                    }).success(function(data) {
                        if (data.flag) {
                            $("#editTestSuite").removeClass("whirl traditional");
                            toaster.pop("error", "更新测试套", "失败：存在相同名称的测试套");
                        } else {
                            $http.post($scope.url, $scope.testsuite).success(function(data) {
                                $modalInstance.close();
                                $scope.gettestsuitelist();
                                if (data.flag){
                                    toaster.pop("success", "更新成功", "更新测试套成功");
                                }else {
                                    toaster.pop("error", "更新失败", "更新测试套失败");
                                }
                            }).error(function() {
                                $modalInstance.close();
                                toaster.pop("error", "更新失败", "更新测试套失败");
                            });
                        }
                    });
                }
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };


        //删除测试套
        $scope.openDeleteDialog = function(testSuite) {
            if (testSuite.chs_name == "running") {
                toaster.pop("error", "删除失败", "测试套用例解析中，无法删除");
                return;
            } else if (testSuite.refCount != 0) {
                toaster.pop("error", "删除失败", "测试套被使用，无法删除");
                return;
            }

            ngDialog.openConfirm({
                template: 'confirmDeleteDialog',
                className: 'ngdialog-theme-default',
                scope: $scope,
                data: {
                    TestSuite: testSuite
                }
            }).then(function () {

            }), function () {

            };
        };
        // 删除测试套
        $scope.deleteTestSuite = function(testSuite) {
            $(".ngdialog-content").addClass("whirl traditional");
            $http.post("../autotestsuit/delete", testSuite.id).success(function (data) {
                ngDialog.closeAll();
                toaster.pop("success", "删除成功", "删除测试套成功");
                $scope.gettestsuitelist();
            }).error(function() {
                ngDialog.closeAll();
                toaster.pop("error", "删除失败", "删除测试套失败");
            });
        };

        $scope.showColorByStatus = function(status) {
            switch (status) {
                case "normal":
                    return "label-dtgreen";
                case "abnormal":
                    return "label-dtred";
                case "running":
                    return "label-warning";
                default:
                    return "";
            }
        };

        // 显示上次上传测试套信息
        // $scope.showGitProjectLog = function(gitUrl) {
        //
        //     var modalInstance = $modal.open({
        //         templateUrl: '/ShowGitPushLog',
        //         controller: showGitPushLog,
        //         scope: $scope,
        //         size: "lg",
        //         resolve: {
        //             gitUrl: function() {
        //                 return gitUrl;
        //             }
        //         },
        //         keyboard: false,
        //         backdrop: 'static'
        //     });
        //     modalInstance.result.then(function() {},
        //         function() {});
        // };
        //
        // var showGitPushLog = function($scope, gitUrl, $modalInstance, ngDialog, toaster) {
        //     $scope.gitProjectName = gitUrl.substring(gitUrl.lastIndexOf("/") + 1, gitUrl.lastIndexOf("."));
        //     $scope.getGitProjectLog = function() {
        //         var url = "../autotestsuit/getGitPushLog?gitProjectName=" + $scope.gitProjectName;
        //         $http.post(url, {},
        //             {}).success(function(data) {
        //             $scope.gitPushLog = data;
        //             //$scope.gitPushLog =  $sce.trustAsHtml(data);
        //         }).error(function() {
        //             toaster.pop("error", "更新失败", "更新测试套配置失败");
        //         });
        //     }
        //     $scope.getGitProjectLog();
        //     $scope.cancel = function() {
        //         $modalInstance.dismiss('cancel');
        //     };
        // }
    }]);