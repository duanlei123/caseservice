App.controller('SlaveCreateController', ['$scope', '$resource', '$modal', '$state', '$http', '$timeout', '$stateParams', 'toaster', 'ngDialog', 'FileUploader', '$rootScope',
    function ($scope, $resource, $modal, $state, $http, $timeout, $stateParams, toaster, ngDialog, FileUploader, $rootScope) {
        // 判断页面属于执行机编辑或者新建，id == null表示新建执行机
        if ("/auto/slavecreate" == $state.$current.url.source) {
            //来自执行机列表的新建执行机接口
            $scope.inheritSlaveId = $stateParams.id;

        } else {
            if (($scope.slave_id = $stateParams.id) != null) {
                // $("h3").html("配置执行机");
            }
        }
        $scope.slave={
            id:null,
            name:null,
            description:null,
            numExecutors:1,
            workCatalog:null,
            tag:null,
            host:null,
            credential:"",
            creator:""
        };
        $scope.slaveSubmitted=false;
        //是否可编辑姓名
        $scope.isEditSlaveName=true;
        $scope.slaveNameList=[];
        $scope.credentials=[];
        //获取所有执行机的名称
        $scope.getAllSlaveNames=function () {
            $http.post("../slave/getAllSlaveNames",{},{})
                .success(function (data,status) {
                    $scope.slaveNameList=data;
                })
                .error(function (data,status) {

                })
        };
        $scope.getAllSlaveNames();

        /** 获取当前用户 **/
        // $http.get("../login/getloginuser/").success(function (data) {
        //     $scope.loginUserId = data.id;
        //     // $rootScope.getProduct(data.user);
        // });
        /**
         * 确认姓名有无重复,如重复，返回true
         * 确认姓名有无重复,如重复，返回true
         */
        $scope.isNameExist=function () {
            for(var i=0;i<$scope.slaveNameList.length;i++) {
                if($scope.slave.name==$scope.slaveNameList[i]) {
                    return true;
                }
            }
            return false;
        };
        //获取所有凭证待选项
        $scope.getCredentials=function () {
            $http.get("../slave/getCredentials",{})
                .success(function (data,status) {
                    $scope.credentials=data;
                })
                .error(function (data,status) {

                })
        };
        $scope.getCredentials();
        //创建执行机
        $scope.createSlave=function () {
            $scope.slave.creator=$scope.loginUserId;
            $scope.slaveSubmitted=true;
            if (!$scope.slaveInfoForm.$valid) {
                return;
            }
            if($scope.validNumber($scope.slave.numExecutors)) {
                return;
            }
            //新建或继承
            if($scope.slave_id ==null || $scope.slave_id =='undefined') {
                if($scope.isNameExist()==true) {
                    toaster.pop("error", "执行机名称重复");
                    return;
                }
                else {
                $http.post("../slave/createSlave",$scope.slave,{})
                    .success(function (data,status) {
                        if(data==false) {
                            toaster.pop("error", "执行机创建失败");
                        }else {
                            toaster.pop("success", "执行机创建成功");
                            $state.go('auto.slavelist');
                        }

                    })
                    .error(function (data,status) {
                        toaster.pop("error", "执行机创建失败");
                    })
                }
            }
            //编辑
            else {
                $http.post("../slave/updateSlave",$scope.slave,{})
                    .success(function (data,status) {
                        if(data==false) {
                            toaster.pop("error", "执行机编辑失败");
                        }else {
                            toaster.pop("success", "执行机编辑成功");
                            $state.go('auto.slavelist');
                        }
                    })
                    .error(function (data,status) {
                        toaster.pop("error", "执行机编辑失败");
                    })
            }
        };
        $scope.cancelCreateSlave=function () {
            $state.go('auto.slavelist');
        };
        //输入是否合法
        $scope.validateInput=function (name,type) {
            var input=$scope.slaveInfoForm[name];
          return ($scope.slaveSubmitted || input.$dirty) && input.$error[type];
        };
        //输入是否为正整数
        $scope.validNumber = function (num) {
            var res=/^[1-9][0-9]*$/;
            return $scope.slaveSubmitted && !res.test(num);
        };
        /**
         * 用于编辑执行机或继承执行机时的数据初始化
         */
        $scope.globalSlaveId=null;
        $scope.initSlave=function () {
            if($scope.slave_id!=null && $scope.slave_id!='undefined') {
                //编辑
                $scope.isEditSlaveName=false;
                $scope.globalSlaveId=$scope.slave_id;
            }
            else if($scope.inheritSlaveId!=null && $scope.inheritSlaveId!='undefined') {
                //继承
                $scope.globalSlaveId=$scope.inheritSlaveId;
            }
            if($scope.globalSlaveId!=null) {
                $http.post("../slave/getSlaveConfigById",{},{params:{id:$scope.globalSlaveId}})
                    .success(function (data,status) {
                        $scope.slave=data;
                    })
                    .error(function (data,status) {

                    })
            }
        };
        $scope.initSlave();

        //添加账号控制器
        $scope.addCredentials = function () {
            var modalInstance = $modal.open({
                templateUrl: '/addCredentials.html',
                controller: addCredentialsCtrl,
                resolve: {
                }
            });
            modalInstance.result.then(function () {
                $scope.getCredentials();
                console.log($scope.credentials);
            }, function () {
                console.log('Cancel to add credentials');
            });
        };
        var addCredentialsCtrl = function ($scope, $modalInstance, $timeout, ngDialog) {
            $scope.Submitted=false;
            $scope.credentialsProvider={
                username:null,
                password:null,
                id:"",
                description:null
            };
            //输入是否合法
            $scope.validateModelInput=function (name,type) {
                var input=$scope.addCredentialsForm[name];
                return ($scope.Submitted || input.$dirty) && input.$error[type];
            };
            $scope.editFormSubmit = function () {
                $scope.submitted = true;
                    if($scope.addCredentialsForm.$valid) {
                        $http.post("../slave/addCredential",$scope.credentialsProvider,{})
                            .success(function (data,status) {
                                if(data=='success') {
                                    console.log("添加账户成功:"+$scope.credentialsProvider.username);
                                    $modalInstance.close();
                                    toaster.pop("success","添加账户成功");
                                }
                                else {
                                    toaster.pop("error","添加账户失败");
                                }
                            })
                            .error(function (data,status) {
                                toaster.pop("error","添加账户失败");
                            });
                } else {
                    console.log('Input is invalid!!');
                    return false;
                }

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        };
    }]);
