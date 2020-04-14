/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') {
    throw new Error('This application\'s JavaScript requires jQuery');
}

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'tmh.dynamicLocale',
    'ui.utils'
]), permissionList;


App.run(["$http", "$document", "$rootScope", "$state", "$stateParams", '$window', '$templateCache', "$location", function ($http, $document, $rootScope, $state, $stateParams, $window, $templateCache, $location) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // Uncomment this to disable template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
     if (typeof(toState) !== 'undefined'){
     $templateCache.remove(toState.templateUrl);
     }
     });*/

    // Scope Globals
    // -----------------------------------
    $rootScope.app = {
        name: 'DXP',
        description: 'Test Platform',
        year: ((new Date()).getFullYear()),
        layout: {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: '/view/app/css/app.css'
        },
        useFullLayout: false,
        hiddenFooter: false,
        viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
        name: 'John',
        job: 'ng-developer',
        picture: '/view/app/img/user/02.jpg'
    };

    //监听路由事件
    $rootScope.$on('$locationChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // var loginUrl = $location.absUrl();
            // $.cookie("loginUrl", loginUrl, {expires: 7, path: '/', secure: false});
            // console.log($.cookie("loginUrl"));
        });


    /*$rootScope.$on('$routeChangeStart', function () {
     if ($rootScope.form.$invalid) {
     event.preventDefault();
     }
     });*/
    /*$rootScope.keyup = function(keyEvent) {
     if (keyEvent.keyCode == 116) {
     keyEvent.preventDefault();
     $state.reload();
     }
     console.log('keyup', keyEvent);
     };*/
    /**
     * 禁用F5刷新,替换成AngularJs $state.reload()
     * @param e
     */
    // var disableF5 = function (e) {
    //     if ((e.which || e.keyCode) == 116) {
    //         e.preventDefault();
    //         var getLoginUserUrl = "http://" + window.location.host + "/cpp/login/getloginuser";
    //         // console.log(getLoginUserUrl);
    //         $.ajax({
    //             url: getLoginUserUrl,
    //             dataType: 'json',
    //             success: function (data) {
    //                 if (null == data.user) {
    //                     window.location.href = "http://" + window.location.host + "/cpp/index.jsp";
    //                 } else {
    //                     $state.reload();
    //                 }
    //             }
    //         });
    //     }
    // };
    //$document.on("keydown", disableF5);
    // $rootScope.allUsers = [];
    // $rootScope.getUsers = function () {
    //     $http.get("http://" + window.location.host + "/cpp/login/getUsers", {})
    //         .success(function (data, status) {
    //             $rootScope.allUsers = data;
    //         })
    // };
    // $rootScope.getUsers();

    // $dtpVersion.initVersion();
    // $rootScope.dtpVersion = $dtpVersion.getDtpVersion();
    // $dtpConf.initConf();
    // $rootScope.dtpConf = $dtpConf.getDtpConf();

    /**
     * 获取当前登录用户
     */
    // $rootScope.getLoginUser = function () {
    //     $http.get('../login/getloginuser').success(function (data) {
    //         $rootScope.getProduct(data.user);
    //     });
    // };

    // /**
    //  * 根据url的productkey获取当前产品
    //  */
    // $rootScope.getProduct = function (loginUser) {
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
    //                 $rootScope.relateUser(loginUser, data.id);
    //             }
    //         });
    //     }
    // };

    /**
     * 更新用户最后一次选择的产品
     */
    // $rootScope.relateUser = function (loginUser, productId) {
    //     var relateUserUrl = "http://" + window.location.host + "/cpp/product/relateUser";
    //     $http.post(relateUserUrl, {}, {
    //         params: {
    //             username: loginUser,
    //             productId: productId
    //         }
    //     }).success(function () {
    //         $rootScope.updateSelector(productId);
    //     }).error(function () {
    //         console.log("Relate user product failed");
    //     });
    // };

    /**
     * 更新下拉选
     * @param productId
     */
    // $rootScope.updateSelector = function (productId) {
    //     $("#productSelector").val(productId).attr("selected", true);
    //     $("#productSelector").trigger("chosen:updated");
    // };

    // $rootScope.judgeUrl = function () {
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
    //                 $rootScope.getLoginUser();
    //             }
    //         });
    //     }
    // };
}]);

App.run(function (permissions) {
    // permissions.setPermissions(permissionList);
});
angular.element(window).bind('load', function () {
    /*var turl = "http://"+window.location.host+"/cloud/login/getPermissions";
     $.get(turl, function(data) {
     permissionList = data;
     });*/
    //
    // var loginUrl = window.location.href;
    // $.cookie("loginUrl", loginUrl, {expires: 7, path: '/', secure: false});
    // console.log($.cookie("loginUrl"));
    // var getLoginUserUrl = "http://" + window.location.host + "/cpp/login/getloginuser";
    // $.ajax({
    //     url: getLoginUserUrl,
    //     dataType: 'json',
    //     success: function (data) {
    //         if (null == data.user) {
    //             window.location.href = "http://" + window.location.host + "/cpp/index.jsp";
    //         }
    //     }
    // });
});

App.factory('permissions', function ($rootScope) {
    // var userPermissionList;
    return {
        /*setPermissions: function(permissions) {
         userPermissionList = permissions;
         $rootScope.$broadcast('permissionsChanged');
         },
         hasPermission: function (permission) {
         permission = permission.trim();
         var permissions=permission.split(',');

         var ret = true;

         for(var i = 0; i < permissions.length; i++){

         if(permissionList.indexOf(permissions[i]) > -1){
         ret =  true;
         break;
         }else{
         ret = false;
         }

         }

         return ret;

         }*/
    };
});

// App.factory('$dtpVersion', ['$window', function ($window) {
    // var dtpVersion;
    // var initVersion = function () {
    //     var dtpVersionUrl = "http://" + window.location.host + "/cpp/version/getDtpVersion";
    //     $.ajax({
    //         type: "GET",
    //         url: dtpVersionUrl,
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             dtpVersion = data.version;
    //         }
    //     });
    // };
    //
    // var getDtpVersion = function () {
    //     return dtpVersion;
    // };
    //
    // return {
    //     initVersion: initVersion,
    //     getDtpVersion: getDtpVersion
    // }
// }]);

// App.factory('$dtpConf', ['$window', function ($window) {
    // var dtpConf;
    // var initConf = function () {
    //     var dtpVersionUrl = "http://" + window.location.host + "/cpp/conf/getDtpConf";
    //     $.ajax({
    //         type: "GET",
    //         url: dtpVersionUrl,
    //         dataType: "json",
    //         async: false,
    //         success: function (data) {
    //             dtpConf = data;
    //         }
    //     });
    // };
    //
    // var getDtpConf = function () {
    //     return dtpConf;
    // };
    //
    // return {
    //     initConf: initConf,
    //     getDtpConf: getDtpConf
    // }
// }]);

App.directive('hasPermission', function (permissions) {
    return {
        /*link: function(scope, element, attrs) {
         if(!angular.isString(attrs.hasPermission))
         throw "hasPermission value must be a string";

         var value = attrs.hasPermission.trim();
         var notPermissionFlag = value[0] === '!';
         if(notPermissionFlag) {
         value = value.slice(1).trim();
         }

         function toggleVisibilityBasedOnPermission() {
         var hasPermission = permissions.hasPermission(value);

         if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
         element.show();
         else
         element.hide();
         }
         toggleVisibilityBasedOnPermission();
         scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
         }*/
    };
});