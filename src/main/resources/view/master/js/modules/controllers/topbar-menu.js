/**=========================================================
 * Module: product-manage.js
 =========================================================*/

App.controller('TopMenuController', ['$rootScope', '$scope', '$modal', '$http', '$resource', 'toaster', 'ngDialog', '$timeout', '$controller', '$state', '$location',
    function ($rootScope, $scope, $modal, $http, $resource, toaster, ngDialog, $timeout, $controller, $state, $location) {

        // 所有产品、用户所选产品、当前登录用户
        // $scope.products = [];
        // $scope.lastProduct;
        // $scope.lastUserProduct = 0;
        // $scope.loginUser;

        /**
         * 获取当前登录用户
         */
        // $scope.getLoginUser = function () {
        //     var getLoginUserUrl = "http://" + window.location.host + "/cpp/login/getloginuser";
        //     $.ajax({
        //         url: getLoginUserUrl,
        //         dataType: 'json',
        //         success: function (data) {
        //             $scope.loginUser = data.user;
        //             // $scope.getUserProduct();
        //         }
        //     });
        // };
        // $scope.getLoginUser();

        // /**
        //  * 初始化产品下拉框(Product selector)
        //  */
        // $scope.initProductSelector = function () {
        //     // 加载product数据至产品选择框中
        //     // console.log("topbar-menu.js 发送了getUserProductPrivate !");
        //     var getProductUrl = "http://" + window.location.host + "/cpp/product/getUserProductPrivate";
        //     // console.log(getProductUrl);
        //     $.ajax({
        //         url: getProductUrl,
        //         dataType: "text",
        //         data: {
        //             username: $scope.loginUser
        //         },
        //         success: function (data) {
        //             if ($scope.products != null) {
        //                 $scope.products = JSON.parse(data);
        //                 // console.log("topbar-menu : $scope.products length : " + $scope.products.length);
        //                 if (!$scope.$$phase) {
        //                     $scope.$apply();
        //                 }
        //                 // console.log("Load products info success\n" +  data);
        //                 var productSelector = $("#productSelector");
        //                 productSelector.attr("data-placeholder",$scope.lastProduct.productName);
        //                 productSelector.empty();
        //                 productSelector.trigger("chosen:updated");
        //                 productSelector.append("<option value='0'></option>");
        //                 productSelector.trigger("chosen:updated");
        //                 if ($scope.products.length != 0) {
        //                     for (var i = 0; i < $scope.products.length; i++) {
        //                         productSelector.append("<option value='" + $scope.products[i].id + "'>" + $scope.products[i].name + "</option>");
        //                         productSelector.trigger("chosen:updated");
        //                     }
        //                     productSelector.append("<option style='color:#bebebe;' value='-1'>" + "更多产品..." + "</option>");
        //                     productSelector.trigger("chosen:updated");
        //                     // console.log("Init product seletcor success");
        //                 }
        //                 $("#productSelector option[value='" + $scope.lastUserProduct + "']").attr("selected", "selected");
        //                 productSelector.trigger("chosen:updated");
        //                 if ($scope.lastUserProduct == undefined || $scope.lastUserProduct == 0) {
        //                     // toaster.pop('danger','请选择产品');
        //                 }
        //             }
        //         }, error: function () {
        //             console.log("Load products info failed");
        //         }
        //     });
        // };

        // /**
        //  * 获取当前登录用户最后选择的product
        //  */
        // $scope.getUserProduct = function () {
        //     var getUserProductUrl = "http://" + window.location.host + "/cpp/product/getCurrentProduct";
        //     // console.log(getUserProductUrl);
        //     $.ajax({
        //         url: getUserProductUrl,
        //         dataType: "json",
        //         success: function (data) {
        //             // console.log("Get user product success " + data.productID);
        //             $scope.lastProduct = data;
        //             $scope.lastUserProduct = data.productID;
        //             $scope.initProductSelector();
        //             for (var i = 0; i < $scope.products; i++) {
        //                 var falg = true;
        //                 if ($scope.lastUserProduct == $scope.products[i].id) {
        //                     console.log("$scope.products.push(product)  false: " + $scope.products.length);
        //                     falg = false;
        //                 }
        //                 if (falg) {
        //                     console.log("$scope.products.push(product)  true: " + $scope.products.length);
        //                     $scope.products.push(data);
        //                 }
        //             }
        //             // $scope.initProductSelector();
        //         }, error: function () {
        //             console.log("Get user product failed");
        //         }
        //     });
        // };
        // $scope.getUserProduct();

        /*$scope.getUserRole = function (username) {
         $.ajax({
         url: "http://" + window.location.host + "/cpp/login/getUserRole",
         data: {username: username},
         dataType: 'json',
         success: function (data) {
         $scope.isAdmin = data.userRole == 2 ? true : false;
         if (!$scope.$$phase) {
         $scope.$apply();
         }
         }
         });
         };*/

        /* START 从Jira同步产品操作 */
        /*$scope.syncAllProductsDialog = function () {
         ngDialog.openConfirm({
         scope: $scope,
         showClose: false,
         template: 'confirmSyncJiraDialog',
         className: 'ngdialog-theme-default',
         controller: confirmSyncJiraController
         });
         };
         var confirmSyncJiraController = function ($scope) {

         $scope.confirmSyncJira = function () {
         $(".ngdialog-content").addClass("whirl traditional");
         $scope.syncAllProducts();
         };
         };*/


        /**
         * 获取当前登录用户
         */
        // $scope.getLoginUser = function () {
        //     var getLoginUserUrl = "http://" + window.location.host + "/cpp/login/getloginuser";
        //     $.ajax({
        //         url: getLoginUserUrl,
        //         dataType: 'json',
        //         success: function (data) {
        //             $scope.loginUser = data.user;
        //         }
        //     });
        // };
        // $scope.getLoginUser();

        /**
         *产品选择变更触发器
         */
        // $("#productSelector").change(function () {
        //     if ($(this).val() == -1) {
        //         $state.go('system-management.allproducts');
        //         $rootScope.updateSelector($scope.lastUserProduct);
        //     } else {
        //         if ($(this).val() != $scope.lastUserProduct) {
        //             $scope.lastUserProduct = $(this).val();
        //             var path = $location.path();
        //             $http.get('../product/getProductByID', {'params': {'id': $(this).val()}}).success(function (data) {
        //                 var newPath = '/' + data.productkey + '/' + path.split('/')[2] + '/' + path.split('/')[3];
        //                 $location.path(newPath);
        //             });
        //             var relateUserUrl = "http://" + window.location.host + "/cpp/product/relateUser";
        //             $.ajax({
        //                 url: relateUserUrl,
        //                 data: {username: $scope.loginUser, productId: $(this).val()},
        //                 type: "POST",
        //                 success: function () {
        //                     // console.log("Relate user product success");
        //                 }, error: function () {
        //                     console.log("Relate user product failed");
        //                 }
        //             });
        //         }
        //     }
        // });


        /**
         *发送从Jira同步所有产品的请求
         */
        /*$scope.syncAllProducts = function () {
         var syncJiraProductsUrl = "http://" + window.location.host + "/cpp/jira/syncproducts";
         // console.log(syncJiraProductsUrl);
         $.ajax({
         url: syncJiraProductsUrl,
         dataType: "text",
         success: function (data) {
         $scope.initProductSelector();
         var len;
         // console.log("Synchronize products from Jira succeeded\n" + data);
         if (null == data || "" == data) {
         len = 0;
         } else {
         len = JSON.parse(data).length;
         }
         $(".ngdialog-content").removeClass("whirl traditional");
         ngDialog.closeAll();
         $scope.popMessage('success', 'Jira同步成功', '更新产品' + len + '个');
         }, error: function () {
         $(".ngdialog-content").removeClass("whirl traditional");
         $scope.popMessage('error', 'Jira同步失败', '连接服务器超时');
         // console.log("Synchronize products from Jira failed");
         }
         });
         };*/
        /* END 从Jira同步产品操作 */

        /**
         * 弹出toaster信息提示框
         * @param type
         * @param title
         * @param text
         */
        /*$scope.popMessage = function (type, title, text) {
         //if (type == "error") {
         //    toaster.pop(type, title, text, 60000);
         //} else {
         toaster.pop(type, title, text, 5000);
         //}
         };*/

        $(".chosen-select").chosen({no_results_text: "无匹配产品"});
        // =========================================================================================================
        $scope.topbarMaintainanceRegionMenuItems = [
            // {title: "测试管理", route: "test-management.test-management-dashboard", activeJudge: "test-management", display: "dtpPro"},
            // {title: "持续集成", route: "ci.ci-dashboard", activeJudge: "ci", display: "dtpPro"},
            // {title: "自动化测试", route: "auto.auto-task-list", activeJudge: "auto", display: "dtpPro dtpAuto"},
            // {title: "系统管理", route: "system-management.allproducts", activeJudge: "system-management", display: "dtpPro"},
            // {title: "系统管理", route: "system-management.myselfworkbench", activeJudge: "system-management", display: "dtpPro"},
            // {title: "原始模板", route: "original.buttons", activeJudge: "original"}
        ];

        $scope.getMenuClass = function (menuItem) {
            if ($state.includes(menuItem.activeJudge)) {
                return "active";
            }
            else {
                return "";
            }
        };

        $scope.gotoMenuRoute = function (menuItem) {
            var route = menuItem.route;

            if (angular.isDefined(menuItem.params)) {
                $state.go(route, menuItem.params);
            }
            else {
                $state.go(route);
            }
        }

    }]);