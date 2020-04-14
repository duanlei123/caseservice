/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/
App.controller('SlaveListController', ['$scope', '$cookieStore', '$state', '$modal','$http', '$resource', 'toaster', 'NgTableParams', '$stateParams','$interval', '$rootScope',
    function ($scope, $cookieStore, $state, $modal,$http, $resource, toaster, NgTableParams, $stateParams,$interval,$rootScope) {

        $scope.inBusy = false;

        $scope.checkedSlave = null;

        //执行机列表
        $scope.slaves=[];

        $scope.slaveOper = {
            "edit": {name: "配置", icon: "fa fa-edit"},
            "delete": {name: "删除", icon: "fa fa-close", method: "delete"}
        };
        // //根据Url跨产品进行切换
        // $rootScope.getLoginUser();
        $scope.onClickCheck = function (slave) {
            if ($scope.checkedSlave === slave) {
                $scope.checkedSlave = null;
            } else {
                $scope.checkedSlave = slave;
            }

        };
        /**
         *  跳转到创建页面
         */
        $scope.onClickCreate = function () {
            if ($scope.checkedSlave) {
                $state.go("auto.slavecreate", {id: $scope.checkedSlave.id});
            } else {
                $state.go("auto.slavecreate");
            }
        };
        /**
         *   初始化链式调用
         *   1 加载登录人
         *   2 加载登录人是否管理员
         *   3 加载产品ID
         *   4 加载搜索任务
         *   5 加载搜索选择信息等
         */
        /**
         * 搜索任务
         */
        //初始化执行机列表
        $scope.getSlaveList=function () {
            $scope.inBusy = true;
            $http.get("../slave/getSlaveList",{})
                .success(function (data,status) {
                    $scope.slaves=data;
                    if (typeof($scope.tableParams) == "undefined") {
                        $scope.tableParams = new NgTableParams({
                            page: 1,
                            count: 10
                        }, {
                            total: $scope.slaves.length,
                            getData: function ($defer, params) {
                                params.total($scope.slaves.length);
                                // for(var i=(params.page()-1)*params.count();i<params.page()*params.count() && i<$scope.slaves.length;i++) {}
                                $defer.resolve($scope.slaves.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        });
                    } else {
                        $scope.tableParams.$params.total = $scope.slaves.length;
                        $scope.tableParams.$params.page = 1;
                        $scope.tableParams.reload();
                    }
                   $scope.inBusy = false;
                })
                .error(function (data,status) {
                    $scope.inBusy = false;
                    toaster.pop("error", "执行机获取失败");
                })
        };
        $scope.getSlaveList();
        /**
         * 刷新执行机列表
         * @param slave
         */
        $scope.getNewestSlaveList=function () {
            if($scope.slaves!=null && $scope.slaves.length>0) {
                $http.get("../slave/getSlaveList",{})
                    .success(function (data,status) {
                        $scope.slaves=data;
                        $scope.tableParams.$params.total = $scope.slaves.length;
                        $scope.tableParams.$params.page = 1;
                        $scope.tableParams.reload();
                    })
                    .error(function (data,status) {
                        console.log("状态刷新失败");
                    })
            }
        };
        //定时器设置
        var timer=$interval(function () {
                $scope.getNewestSlaveList();
            }
            ,10000);
        //销毁定时器
        $scope.$on('$destroy',function(){
            $interval.cancel(timer);
        });

        /**
         * 获取标签列表
         * @param slave
         * @returns {Array|*}
         */
        $scope.getLabelList=function (slave) {
            if(typeof (slave.labelList)=="undefined") {
                if(slave.tag!=null && slave.tag.length>0) {
                    slave.tag=slave.tag.trim();
                    slave.labelList=slave.tag.split(" ");
                }
                else {
                    slave.labelList=[];
                }
                return slave.labelList;
            }
            else {
                return slave.labelList;
            }
        };
        //编辑执行机
        $scope.editSlave=function (slaveId,slaveRunningNum) {
            if(slaveRunningNum!=0) {
                toaster.pop("error", "执行机使用中,不可编辑");
            }
            else {
                $state.go("auto.slaveedit", {id: slaveId});

            }
        };
        //删除执行机
        $scope.deleteSlave=function (slaveName,slaveRunningNum) {
            if(slaveRunningNum!=0) {
                toaster.pop("error", "执行机使用中,不可删除");
                return;
            }
            var modalInstance=$modal.open({
                templateUrl:"/DelSlaveModule.html",
                controller:deleteSlaveController,
                resolve:{
                    slaveName:function () {
                        return slaveName
                    }
                }
            });
            modalInstance.result.then(function () {
                // $modal.close() will get into here.
                location.reload();
            },function () {
                console.log("cancel delete Slave");
            })
        };
        var deleteSlaveController=function ($scope, $modalInstance, $timeout, slaveName) {
            $scope.slaveName = slaveName;
            $scope.submit=function () {
                $http.post("../slave/deleteSlave",{},{params:{slaveName:slaveName}})
                    .success(function (data,status) {
                        if(data==true) {
                            $modalInstance.close();
                        }else {
                            toaster.pop("error","删除失败");
                            $modalInstance.close();
                        }
                    })
                    .error(function (data,status) {
                        toaster.pop("error","删除失败");
                        $modalInstance.close();
                    })
            };
            $scope.cancel=function () {
                $modalInstance.dismiss("cancel");
            }
        }

        $scope.showColorByStatus = function (status) {
            switch (status) {
                case "空闲":
                    return "label-dtgreen";
                case "占用":
                    return "label-dtpurple";
                case "服务不可用":
                    return "label-warning";
                case "未在线":
                    return "label-dtgray";
                default:
                    return "";
            }
        };
    }]);

