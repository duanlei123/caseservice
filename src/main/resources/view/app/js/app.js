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

App.run(["permissions", function (permissions) {
    // permissions.setPermissions(permissionList);
}]);
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

App.factory('permissions', ["$rootScope", function ($rootScope) {
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
}]);

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

App.directive('hasPermission', ["permissions", function (permissions) {
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
}]);
/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);
        // defaults to dashboard
        $urlRouterProvider.otherwise('/auto/auto_task_list');

        // $urlRouterProvider.otherwise('/auto/auto_task_list');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('ci', {
                url: '/*path/ci',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('ngDialog', 'localytics.directives', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'privatecss', 'ngGrid')
            })
            .state('auto', {
                url: '/auto',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('ngDialog', 'localytics.directives', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'privatecss', 'ngGrid')
            })
            .state('auto.create-auto-task', {
                url: '/create_auto_task',
                templateUrl: helper.basepath('edit-auto-task.html'),
                controller: 'EditAutoTaskController',
                resolve: helper.resolveFor('dtp.NavTree', 'ui.select', 'dtpFileUpload', 'filestyle', 'codemirror', 'ui.codemirror', 'codemirror-modes-web')
            })
            .state('auto.modify-auto-task', {
                url: '/modify_auto_task/{tid:[0-9]{1,9}}',
                templateUrl: helper.basepath('edit-auto-task.html'),
                controller: 'EditAutoTaskController',
                resolve: helper.resolveFor('dtp.NavTree', 'ui.select', 'dtpFileUpload', 'filestyle', 'codemirror', 'ui.codemirror', 'codemirror-modes-web')
            })
            .state('auto.auto-task-list', {
                url: '/auto_task_list',
                templateUrl: helper.basepath('auto-task-list.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('toaster', 'ngTable', 'ui.select', 'taginput', 'ngDialog', 'ngWig', 'blockUI')
            })
            .state('auto.auto-task-exec', {
                url: '/auto_task_exec/{tid:[0-9]{1,9}}?eid',
                templateUrl: helper.basepath('auto-task-exec.html'),
                controller: 'AutoTaskExecController',
                resolve: helper.resolveFor('ngTable', 'ngDialog', 'toaster', 'ui.select', 'morris', 'classyloader', 'blockUI')
            })
            .state('auto.auto-task-caselog', {
                url: '/auto_task_caselog/{tid:[0-9]{1,9}}/{eid:[0-9]{1,9}}/{uuid:[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}}',
                templateUrl: helper.basepath('auto-task-caselog.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('toaster', 'ngDialog', 'ui.select')
            })
            .state('auto.auto-task-report', {
                url: '/auto_task_report/{tid:[0-9]{1,9}}/{eid:[0-9]{1,9}}',
                templateUrl: helper.basepath('auto-task-report.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('toaster', 'ngDialog', 'ui.select')
            })
            //执行机管理
            .state('auto.slavecreate', {
                url: '/slavecreate',
                params: {'id': null},
                templateUrl: helper.basepath('slavecreate.html'),
                controller: 'SlaveCreateController',
                resolve: helper.resolveFor('dtpCaseTree', 'ui.select', 'dtpFileUpload', 'filestyle', 'ngDialog')
            })
            //测试套管理
            .state('auto.test-suite-list', {
                url: '/test-suite-list',
                params: {'id': null},
                templateUrl: helper.basepath('auto-testsuitelist.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('ui.select', 'xeditable', 'ngDialog', 'datatables', 'datatables-pugins', 'ngTable', 'dtpFileUpload', 'filestyle', 'blockUI')
            })
            .state('auto.slaveedit', {
                url: '/slaveedit/{id:[0-9]{1,9}}',
                templateUrl: helper.basepath('slavecreate.html'),
                controller: 'SlaveCreateController',
                resolve: helper.resolveFor('dtpCaseTree', 'ui.select', 'dtpFileUpload', 'filestyle', 'ngDialog')
            })
            .state('auto.slavelist', {
                url: '/slavelist',
                templateUrl: helper.basepath('slavelist.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('toaster', 'ngTable', 'datatables', 'ui.select', 'taginput', 'dtpTagsInput', 'datatables-pugins')
            })
        //
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // -----------------------------------
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;


    }]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        'use strict';
        // registering components after bootstrap
        App.controller = $controllerProvider.register;
        App.directive = $compileProvider.directive;
        App.filter = $filterProvider.register;
        App.factory = $provide.factory;
        App.service = $provide.service;
        App.constant = $provide.constant;
        App.value = $provide.value;

    }]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'app/i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {

    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

    // tmhDynamicLocaleProvider.useStorage('$cookieStore');

}]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
;



/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'privatecss':			['vendor/private/private.css'],
      'whirl':              ['vendor/whirl/dist/whirl.css'],
      'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
      'animo':              ['vendor/animo.js/animo.js'],
      'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'animate':            ['vendor/animate.css/animate.min.css'],
      'icons':              ['vendor/skycons/skycons.js',
                             'vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css',
                             'vendor/weather-icons/css/weather-icons.min.css'],
      'sparklines':         ['app/vendor/sparklines/jquery.sparkline.min.js'],
      'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                             'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
      'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
      'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                             'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
      'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                             'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
      'loadGoogleMapsJS':   ['app/vendor/gmap/load-google-maps.js'],
      'flot-chart':         ['vendor/Flot/jquery.flot.js'],
      'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                             'vendor/Flot/jquery.flot.resize.js',
                             'vendor/Flot/jquery.flot.pie.js',
                             'vendor/Flot/jquery.flot.time.js',
                             'vendor/Flot/jquery.flot.categories.js',
                             'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                            // jquery core and widgets
      'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js'],
                             // loads only jquery required modules and touch support
      'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                             'vendor/jquery-ui/ui/widget.js',
                             'vendor/jquery-ui/ui/mouse.js',
                             'vendor/jquery-ui/ui/draggable.js',
                             'vendor/jquery-ui/ui/droppable.js',
                             'vendor/jquery-ui/ui/sortable.js',
                             'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
      'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
      'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
      'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
      'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                                   'vendor/codemirror/lib/codemirror.css'],
      // modes for common web files
      'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                               'vendor/codemirror/mode/xml/xml.js',
                               'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                                'vendor/codemirror/mode/shell/shell.js',
                               'vendor/codemirror/mode/css/css.js'],
      'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                             'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
      'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
      'datatables':         ['vendor/datatables/media/js/jquery.dataTables.min.js',
                             'app/vendor/datatable-bootstrap/css/dataTables.bootstrap.css'],
      'datatables-pugins':  ['app/vendor/datatable-bootstrap/js/dataTables.bootstrap.js',
                             'app/vendor/datatable-bootstrap/js/dataTables.bootstrapPagination.js',
                             'vendor/datatables-colvis/js/dataTables.colVis.js',
                             'vendor/datatables-colvis/css/dataTables.colVis.css'],
      'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                             'vendor/fullcalendar/dist/fullcalendar.css'],
      'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
      'nestable':           ['vendor/nestable/jquery.nestable.js'],
      'dtp-nestable':       ['vendor/dtp-nestable/jquery.nestable.js'],
      'chartjs':            ['vendor/Chart.js/Chart.js'],
      'morris':             ['vendor/raphael/raphael.js',
                             'vendor/morris.js/morris.js',
                             'vendor/morris.js/morris.css']
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                 'vendor/angularjs-toaster/toaster.css']},
      {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                 'vendor/chosen_v1.2.0/chosen.min.css',
                                                 'vendor/angular-chosen-localytics/chosen.js']},
      {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                 'vendor/ngDialog/css/ngDialog.min.css',
                                                 'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
      {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
      {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                  'vendor/ng-table/dist/ng-table.min.css']},
      {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
      {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                  'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
      {name: 'dtpContextMenu',            files: ['vendor/bootstrap-contextmenu-dtp/bootstrap-contextmenu.js',
                                                  'vendor/bootstrap-contextmenu-dtp/bootstrapdropdown-submenu.css'                                                    ] },
      {name: 'dtpCaseTree',               files: ['vendor/dtp-case-tree/dist/dtp_case_tree_directive.js',
                                                  'vendor/dtp-case-tree/dist/dtp_case_tree.css']},
      {name: 'dtp.NavTree',                files: ['vendor/dtp-nav-tree/dist/dtp_abn_tree_directive.js',
                                                  'vendor/dtp-nav-tree/dist/dtp_abn_tree.css']},
      {name: 'dtpTagsInput',              files: ['vendor/jQuery-Tags-Input-dtp/src/jquery.tagsinput.css',
                                                  'vendor/jQuery-Tags-Input-dtp/src/jquery.tagsinput.js']},
      {name: 'dtpUiTree',                 files: ['vendor/dtp-angular-ui-tree/angular-ui-tree.js',
                                                  'vendor/dtp-angular-ui-tree/angular-ui-tree.css']},
      {name: 'autocomplete',               files: ['vendor/autocomplete/autocomplete.min.js',
                                                   'vendor/autocomplete/autocomplete.css']},
      {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                                                  'vendor/html.sortable/dist/html.sortable.angular.js']},
      {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                                                  'vendor/angular-xeditable/dist/css/xeditable.css']},
      {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/angular-file-upload.js']},
      {name: 'dtpFileUpload',             files: ['vendor/angular-file-upload-dtp/angular-file-upload.js']},
      {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                  'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
      {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                  'vendor/angular-ui-select/dist/select.css']},
      {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
      {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                  'vendor/angular-carousel/dist/angular-carousel.js']},
      {name: 'ngGrid',                    files: ['vendor/ng-grid/build/ng-grid.min.js',
                                                  'vendor/ng-grid/ng-grid.css' ]},
      {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
      {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                  'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                  'vendor/angular-bootstrap-slider/slider.js']},
      {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                  'vendor/angular-ui-grid/ui-grid.min.js']},
      {name: 'textAngularSetup',          files: ['vendor/textAngular/src/textAngularSetup.js']},
      {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular-rangy.min.js',
                                                  'vendor/textAngular/src/textAngular.js',
                                                  'vendor/textAngular/src/textAngular.css']},
      {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                                                  'vendor/rickshaw/rickshaw.js',
                                                  'vendor/rickshaw/rickshaw.min.css',
                                                  'vendor/angular-rickshaw/rickshaw.js'], serie: true},
      {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                  'vendor/chartist/dist/chartist.js',
                                                  'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
      {name: 'blockUI',                   files: ['vendor/angular-block-ui/angular-block-ui.min.css',
                                                  'vendor/angular-block-ui/angular-block-ui.min.js']},
      {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']}
    ]
  })
;
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
        confirmSendReportController.$inject = ["$modalInstance", "$scope"];

    }]);
App.controller('AutoTaskReportControllerDtpBack', ['$scope',  '$state', '$stateParams',
    function ($scope, $state, $stateParams) {

        $scope.exec_id = $stateParams.eid;
        $scope.task_id = $stateParams.tid;
    }]);
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
        synchronizationCtrl.$inject = ["$scope", "testsuite", "$modalInstance", "ngDialog", "toaster"];


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
        addTestSuiteCtrl.$inject = ["$scope", "$modalInstance", "toaster"];


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
        _testSuitEnvModal.$inject = ["$scope", "$modalInstance", "testsuite"];


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
        editTestSuiteCtrl.$inject = ["$scope", "testsuite", "$modalInstance", "ngDialog", "toaster", "FileUploader"];


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
    _testEnvController.$inject = ["$scope", "$modalInstance"];

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
    _receiverController.$inject = ["$scope", "$modalInstance"];

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
    _configImportController.$inject = ["$scope", "$modalInstance"];

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

/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title;
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Hides/show user avatar on sidebar
    $scope.toggleUserBlock = function(){
      $scope.$broadcast('toggleUserBlock');
    };

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils', '$location',
    function ($rootScope, $scope, $state, $http, $timeout, Utils, $location) {

        var collapseList = [];
        $scope.roleId = undefined;

        // demo: when switch from collapse to hover, close all items
        $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
            if (newVal === false && oldVal === true) {
                closeAllBut(-1);
            }
        });

        // Check item and children active state
        var isActive = function (item) {

            if (!item) return;

            if (!item.sref || item.sref == '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function (value, key) {
                    if (isActive(value)) foundActive = true;
                });
                return foundActive;
            }
            else
                return $state.is(item.sref) || $state.includes(item.sref);
        };

        // Load menu from json file
        // ----------------------------------- 

        $scope.getMenuItemPropClasses = function (item) {
            return (item.heading ? 'nav-heading' : '') +
                (isActive(item) ? ' active' : '');
        };

        /** 获取当前用户 **/
        // $http.get("../login/getloginuser/").success(function (data) {
        //     $scope.loginUserId = data.id;
        //     $scope.roleId = data.roleId;
        //     // $scope.getProduct(data.user);
        // });

        // /**
        //  * 根据url的productkey获取当前产品
        //  */
        // $scope.getProduct = function (loginUser) {
        //     var path = $location.path();
        //     $http.get('../product/getProduct', {'params': {'productkey': path.split('/')[1]}}).success(function (data) {
        //         if (data == '') {
        //             $scope.loadSidebarMenu();
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
        //         $scope.loadSidebarMenu();
        //     }).error(function () {
        //         console.log("Relate user product failed");
        //     });
        // };

        // $scope.loadCiSidebarMenu = function (menu, callback) {
        //     $http.get("http://" + window.location.host + "/cpp/product/getCurrentProduct")
        //         .success(function (data) {
        //             $scope.currentProduct = data;
        //             if($scope.currentProduct.productID != undefined){
        //                 $http.post("../ciBranch/getCi_sidebar_menus?productID="+$scope.currentProduct.productID,{})
        //                     .success(function (items) {
        //                         for(var i = 0;i < items.length; i++){
        //                             var childmenu = {};
        //                             childmenu.text = items[i].taskName;
        //                             childmenu.sref = "ci.ciproductChild";
        //                             childmenu.params = {} ;
        //                             childmenu.params.id = items[i].id;
        //                             childmenu.params.jenkinsName = items[i].jenkinsName;
        //                             menu[2].submenu.push(childmenu);
        //                         }
        //                         $scope.menuItems = menu;
        //                         if ( callback != undefined){
        //                             callback();
        //                         }
        //                     })
        //                     .error(function (data, status, headers, config) {
        //                         alert('Failure loading menu');
        //                     });
        //             }else{
        //                 $scope.menuItems = menu;
        //             }
        //         })
        //         .error(function (data, status, headers, config) {
        //         });
        // };

        $scope.loadSidebarMenu = function (callback) {

            var menuJson = "server/auto-sidebar-menu.json";

            // var urlPath = $location.path();
            // if (urlPath.match('/ci/')) {
            //     menuJson = 'server/ci-sidebar-menu.json';
            // } else if (urlPath.match("/system-management/")) {
            //     if (1 == $scope.roleId){
            //         menuJson = "server/system-management-sidebar-menu-user.json";
            //     }else{
            //         menuJson = "server/system-management-sidebar-menu.json";
            //     }
            //     // menuJson = "server/system-management-sidebar-menu.json";
            // } else if (urlPath.match("/original/")) {
            //     menuJson = "server/original-sidebar-menu.json";
            // } else if (urlPath.match("/auto")) {
            //     menuJson = "server/auto-sidebar-menu.json"
            // }

            var menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            // alert(menuURL);
            $http.get(menuURL)
                .success(function (items) {
                    // if($scope.roleId === 1){
                    //     delete items[3];
                    // }
                    $scope.menuItems = items;
                })
                .error(function (data, status, headers, config) {
                    alert('Failure loading menu');
                });
            // if(urlPath.match('/ci/')){
            //     $http.get(menuURL)
            //         .success(function (items) {
            //             var menu = items;
            //             $scope.loadCiSidebarMenu(menu,callback);
            //         })
            //         .error(function (data, status, headers, config) {
            //             alert('Failure loading menu');
            //         });
            // } else{
            //     $http.get(menuURL)
            //         .success(function (items) {
            //             // if($scope.roleId === 1){
            //             //     delete items[3];
            //             // }
            //             $scope.menuItems = items;
            //         })
            //         .error(function (data, status, headers, config) {
            //             alert('Failure loading menu');
            //         });
            // }
        };
        $scope.loadSidebarMenu();
        // $rootScope.loadSidebarMenu = function () {
        //     $scope.loadSidebarMenu($state.reload);
        // };

        // Handle sidebar collapse items
        // -----------------------------------

        $scope.addCollapse = function ($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
        };

        $scope.isCollapse = function ($index) {
            return (collapseList[$index]);
        };

        $scope.toggleCollapse = function ($index, isParentItem) {


            // collapsed sidebar doesn't toggle drodopwn
            if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

            // make sure the item index exists
            if (angular.isDefined(collapseList[$index])) {
                if (!$scope.lastEventFromChild) {
                    collapseList[$index] = !collapseList[$index];
                    closeAllBut($index);
                }
            }
            else if (isParentItem) {
                closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

        };

        function closeAllBut(index) {
            index += '';
            for (var i in collapseList) {
                if (index < 0 || index.indexOf(i) < 0)
                    collapseList[i] = true;
            }
        }

        function isChild($index) {
            return (typeof $index === 'string') && !($index.indexOf('-') < 0);
        }

    }]);

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
        addCredentialsCtrl.$inject = ["$scope", "$modalInstance", "$timeout", "ngDialog"];
    }]);

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
        deleteSlaveController.$inject = ["$scope", "$modalInstance", "$timeout", "slaveName"];

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
App.controller('UserBlockController', ['$scope', function($scope) {

    $scope.userBlockVisible = true;

    $scope.$on('toggleUserBlock', function(event, args) {
        $scope.userBlockVisible = ! $scope.userBlockVisible;
    });

}]);
/**=========================================================
 * Module: anchor.js
 * Disables null anchor behavior
 =========================================================*/

App.directive('href', function() {

  return {
    restrict: 'A',
    compile: function(element, attr) {
        return function(scope, element) {
          if(attr.ngClick || attr.href === '' || attr.href === '#'){
            if( !element.hasClass('dropdown-toggle') )
              element.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
              });
          }
        };
      }
   };
});
App.directive('logout', function () {
    return {
        restrict: 'AC',
        // template: '<button class="btn btn-primary"><i class="menu-icon fa fa-sign-out"></i>注销</button>',
        link: function (scope, el, attr) {
            el.on('click', function () {
            	var baseurl = window.location.host;
                var url =  "http://" + baseurl +"/cpp/login/logout";
                $.ajax({
                    url: url,
                    type: "POST",
                    success:function(){
                    	window.location.href  = "http://" + baseurl +"/cpp/userLogin/login.jsp";
                    }
                });
            });
        }
    };
});
/**
 * 导航栏在线帮助链接
 */
App.directive('onlineHelp', ["$state", function ($state) {
    return {
        restrict: 'AC',
        template: '<em class="icon-question"></em>',
        link: function (scope, el, attr) {
            el.on('click', function () {
                var baseUrl = $state.$current.url.source.split("/")[2];
                var pageId;
                switch (baseUrl) {
                    case 'dashboard':
                        pageId = 26939546;
                        break;
                    case 'caseTree':
                        pageId = 26939548;
                        break;
                    case 'taskcreate':
                        pageId = 26939550;
                        break;
                    case 'tasklist':
                        pageId = 26939554;
                        break;
                    case 'task-feedback':
                        pageId = 26939552;
                        break;
                    case 'createcibranch':
                        pageId = 43552826;
                        break;
                    case 'modifycibranch':
                        pageId = 43552826;
                        break;
                    case 'cibranchlist':
                        pageId = 43552826;
                        break;
                    case 'cibranchcaselist':
                        pageId = 43550721;
                        break;
                    case 'cibranchjobcase':
                        pageId = 43550931;
                        break;
                    default :
                        pageId = 26939544;
                        break;
                }
                window.open('http://confluence.dtdream.com/pages/viewpage.action?pageId=' + pageId);
            });
        }
    };
}]);
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

App.directive("animateEnabled", ["$animate", function ($animate) {
  return {
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.animateEnabled, scope);
      }, function (newValue) {
        $animate.enabled(!!newValue, element);
      });
    }
  };
}]);
/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

var ChartJS = function (type) {
    return {
        restrict: "A",
        scope: {
            data: "=",
            options: "=",
            id: "@",
            width: "=",
            height: "=",
            resize: "=",
            chart: "@",
            segments: "@",
            responsive: "=",
            tooltip: "=",
            legend: "="
        },
        link: function ($scope, $elem) {
            var ctx = $elem[0].getContext("2d");
            var autosize = false;

            $scope.size = function () {
                if ($scope.width <= 0) {
                    $elem.width($elem.parent().width());
                    ctx.canvas.width = $elem.width();
                } else {
                    ctx.canvas.width = $scope.width || ctx.canvas.width;
                    autosize = true;
                }

                if($scope.height <= 0){
                    $elem.height($elem.parent().height());
                    ctx.canvas.height = ctx.canvas.width / 2;
                } else {
                    ctx.canvas.height = $scope.height || ctx.canvas.height;
                    autosize = true;
                }
            };

            $scope.$watch("data", function (newVal, oldVal) {
                if(chartCreated)
                    chartCreated.destroy();

                // if data not defined, exit
                if (!newVal) {
                    return;
                }
                if ($scope.chart) { type = $scope.chart; }

                if(autosize){
                    $scope.size();
                    chart = new Chart(ctx);
                }

                if($scope.responsive || $scope.resize)
                    $scope.options.responsive = true;

                if($scope.responsive !== undefined)
                    $scope.options.responsive = $scope.responsive;

                chartCreated = chart[type]($scope.data, $scope.options);
                chartCreated.update();
                if($scope.legend)
                    angular.element($elem[0]).parent().after( chartCreated.generateLegend() );
            }, true);

            $scope.$watch("tooltip", function (newVal, oldVal) {
                if (chartCreated)
                    chartCreated.draw();
                if(newVal===undefined || !chartCreated.segments)
                    return;
                if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                    return;
                var activeSegment = chartCreated.segments[newVal];
                activeSegment.save();
                activeSegment.fillColor = activeSegment.highlightColor;
                chartCreated.showTooltip([activeSegment]);
                activeSegment.restore();
            }, true);

            $scope.size();
            var chart = new Chart(ctx);
            var chartCreated;
        }
    };
};

/* Aliases for various chart types */
App.directive("chartjs",       function () { return ChartJS(); });
App.directive("linechart",     function () { return ChartJS("Line"); });
App.directive("barchart",      function () { return ChartJS("Bar"); });
App.directive("radarchart",    function () { return ChartJS("Radar"); });
App.directive("polarchart",    function () { return ChartJS("PolarArea"); });
App.directive("piechart",      function () { return ChartJS("Pie"); });
App.directive("doughnutchart", function () { return ChartJS("Doughnut"); });
App.directive("donutchart",    function () { return ChartJS("Doughnut"); });

/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

App.directive('classyloader', ["$timeout", "Utils", function($timeout, Utils) {
  'use strict';

  var $scroller       = $(window),
      inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // run after interpolation  
      $timeout(function(){
  
        var $element = $(element),
            options  = $element.data();
        
        // At lease we need a data-percentage attribute
        if(options) {
          if( options.triggerInView ) {

            $scroller.scroll(function() {
              checkLoaderInVIew($element, options);
            });
            // if the element starts already in view
            checkLoaderInVIew($element, options);
          }
          else
            startLoader($element, options);
        }

      }, 0);

      function checkLoaderInVIew(element, options) {
        var offset = -20;
        if( ! element.hasClass(inViewFlagClass) &&
            Utils.isInView(element, {topoffset: offset}) ) {
          startLoader(element, options);
        }
      }
      function startLoader(element, options) {
        element.ClassyLoader(options).addClass(inViewFlagClass);
      }
    }
  };
}]);

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

App.directive('resetKey',  ['$state','$rootScope', function($state, $rootScope) {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      resetKey: '='
    },
    link: function(scope, element, attrs) {
      
      scope.resetKey = attrs.resetKey;

    },
    controller: ["$scope", "$element", function($scope, $element) {
    
      $element.on('click', function (e) {
          e.preventDefault();

          if($scope.resetKey) {
            delete $rootScope.$storage[$scope.resetKey];
            $state.go($state.current, {}, {reload: true});
          }
          else {
            $.error('No storage key specified for reset.');
          }
      });

    }]

  };

}]);
/**
 * 用于页面各模块是否显示的指令
 */
// App.directive("displayType" , ["$rootScope", "$animate", "$parse", "$dtpVersion", function($rootScope, $animate, $parse, $dtpVersion){
//     return {
//         restrict: "A",
//         link: function(scope, element, attrs) {
//             var _displayType = attrs.displayType;
//             var _version = $dtpVersion.getDtpVersion();
//             var _display = true;
//             if (angular.isDefined(_displayType) && _displayType != "") {
//                 var _displayTypes = _displayType.split(" ") ;
//                 var _found = false;
//                 for(var i = 0; i < _displayTypes.length; i++) {
//                     if(_version == _displayTypes[i]) {
//                         _found = true;
//                         break;
//                     }
//                 }
//
//                 if (!_found) {
//                     _display = false;
//                 }
//             }
//
//             if (!_display) {
//                 $animate["addClass"](element, "ng-hide");
//             }
//         }
//     }
// }]);
/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

App.directive('filestyle', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var options = $element.data();
      
      // old usage support
        options.classInput = $element.data('classinput') || options.classInput;
      
      $element.filestyle(options);
    }]
  };
});

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

App.directive('flatdoc', ['$location', function($location) {
  return {
    restrict: "EA",
    template: "<div role='flatdoc'><div role='flatdoc-menu'></div><div role='flatdoc-content'></div></div>",
    link: function(scope, element, attrs) {

      Flatdoc.run({
        fetcher: Flatdoc.file(attrs.src)
      });
      
      var $root = $('html, body');
      $(document).on('flatdoc:ready', function() {
        var docMenu = $('[role="flatdoc-menu"]');
        docMenu.find('a').on('click', function(e) {
          e.preventDefault(); e.stopPropagation();
          
          var $this = $(this);
          
          docMenu.find('a.active').removeClass('active');
          $this.addClass('active');

          $root.animate({
                scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
            }, 800);
        });

      });
    }
  };

}]);
/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

App.directive('flot', ['$http', '$timeout', function($http, $timeout) {
  'use strict';
  return {
    restrict: 'EA',
    template: '<div></div>',
    scope: {
      dataset: '=?',
      options: '=',
      series: '=',
      callback: '=',
      src: '='
    },
    link: linkFunction
  };
  
  function linkFunction(scope, element, attributes) {
    var height, plot, plotArea, width;
    var heightDefault = 220;

    plot = null;

    width = attributes.width || '100%';
    height = attributes.height || heightDefault;

    plotArea = $(element.children()[0]);
    plotArea.css({
      width: width,
      height: height
    });

    function init() {
      var plotObj;
      if(!scope.dataset || !scope.options) return;
      plotObj = $.plot(plotArea, scope.dataset, scope.options);
      scope.$emit('plotReady', plotObj);
      if (scope.callback) {
        scope.callback(plotObj, scope);
      }

      return plotObj;
    }

    function onDatasetChanged(dataset) {
      if (plot) {
        plot.setData(dataset);
        plot.setupGrid();
        return plot.draw();
      } else {
        plot = init();
        onSerieToggled(scope.series);
        return plot;
      }
    }
    scope.$watchCollection('dataset', onDatasetChanged, true);

    function onSerieToggled (series) {
      if( !plot || !series ) return;
      var someData = plot.getData();
      for(var sName in series) {
        angular.forEach(series[sName], toggleFor(sName));
      }
      
      plot.setData(someData);
      plot.draw();
      
      function toggleFor(sName) {
        return function (s, i){
          if(someData[i] && someData[i][sName])
            someData[i][sName].show = s;
        };
      }
    }
    scope.$watch('series', onSerieToggled, true);
    
    function onSrcChanged(src) {

      if( src ) {

        $http.get(src)
          .success(function (data) {

            $timeout(function(){
              scope.dataset = data;
            });

        }).error(function(){
          $.error('Flot chart: Bad request.');
        });
        
      }
    }
    scope.$watch('src', onSrcChanged);
  }

}]);

/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/

App.directive('formWizard', ["$parse", function($parse){
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attribute) {
      var validate = $parse(attribute.validateSteps)(scope),
          wiz = new Wizard(attribute.steps, !!validate, element);
      scope.wizard = wiz.init();

    }
  };

  function Wizard (quantity, validate, element) {
    
    var self = this;
    self.quantity = parseInt(quantity,10);
    self.validate = validate;
    self.element = element;
    
    self.init = function() {
      self.createsteps(self.quantity);
      self.go(1); // always start at fist step
      return self;
    };

    self.go = function(step) {
      
      if ( angular.isDefined(self.steps[step]) ) {

        if(self.validate && step !== 1) {
          var form = $(self.element),
              group = form.children().children('div').get(step - 2);

          if (false === form.parsley().validate( group.id )) {
            return false;
          }
        }

        self.cleanall();
        self.steps[step] = true;
      }
    };

    self.active = function(step) {
      return !!self.steps[step];
    };

    self.cleanall = function() {
      for(var i in self.steps){
        self.steps[i] = false;
      }
    };

    self.createsteps = function(q) {
      self.steps = [];
      for(var i = 1; i <= q; i++) self.steps[i] = false;
    };

  }

}]);

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

App.directive('toggleFullscreen', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      element.on('click', function (e) {
          e.preventDefault();

          if (screenfull.enabled) {
            
            screenfull.toggle();
            
            // Switch icon indicator
            if(screenfull.isFullscreen)
              $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
            else
              $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

          } else {
            $.error('Fullscreen not enabled');
          }

      });
    }
  };

});


/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

App.directive('loadCss', function() {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function (e) {
          if(element.is('a')) e.preventDefault();
          var uri = attrs.loadCss,
              link;

          if(uri) {
            link = createLink(uri);
            if ( !link ) {
              $.error('Error creating stylesheet link element.');
            }
          }
          else {
            $.error('No stylesheet location defined.');
          }

      });

    }
  };

  function createLink(uri) {
    var linkId = 'autoloaded-stylesheet',
        oldLink = $('#'+linkId).attr('id', linkId + '-old');

    $('head').append($('<link/>').attr({
      'id':   linkId,
      'rel':  'stylesheet',
      'href': uri
    }));

    if( oldLink.length ) {
      oldLink.remove();
    }

    return $('#'+linkId);
  }


});
/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

App.directive('masked', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var $elem = $($element);
      if($.fn.inputmask)
        $elem.inputmask();
    }]
  };
});

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
    "use strict";

    App.directive('morrisBar',   morrisChart('Bar')   );
    App.directive('morrisDonut', morrisChart('Donut') );
    App.directive('morrisLine',  morrisChart('Line')  );
    App.directive('morrisArea',  morrisChart('Area')  );

    function morrisChart(type) {
      return function () {
        return {
          restrict: 'EA',
          scope: {
            morrisData: '=',
            morrisOptions: '='
          },
          link: function($scope, elem, attrs) {
            // start ready to watch for changes in data
            $scope.$watch("morrisData", function(newVal, oldVal) {
              if (newVal) {
                $scope.morrisInstance.setData(newVal);
                $scope.morrisInstance.redraw();
              }
            }, true);
            // the element that contains the chart
            $scope.morrisOptions.element = elem;
            // If data defined copy to options
            if($scope.morrisData)
              $scope.morrisOptions.data = $scope.morrisData;
            // Init chart
            $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

          }
        }
      }
    }

})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: nestable.js
 * Initializes the nestable plugin
 =========================================================*/

App.directive('nestable', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            'nestableControl': '=',
            'configuration': '='
        },
        controller: ["$scope", "$element", function ($scope, $element) {
            var options = $element.data();

            $timeout(function () {
                $element.nestable($scope.configuration);
            });

            if ($scope.nestableControl) {
                var nest = $scope.nestableControl;
                nest.serialize = function () {
                    return $element.nestable('serialize');
                };
                nest.expandAll = runMethod('expandAll');
                nest.collapseAll = runMethod('collapseAll');

                $element.on('change', function () {
                    if (typeof nest.onchange === 'function')
                        $timeout(function () {
                            nest.onchange.apply(arguments);
                        });
                });
            }

            function runMethod(name) {
                return function () {
                    $element.nestable(name);
                };
            }
        }]
    };

}]);

/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

App.directive('notify', ["$window", function($window){

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function ($scope, $element) {
      
      $element.on('click', function (e) {
        e.preventDefault();
        notifyNow($element);
      });

    }]
  };

  function notifyNow(elem) {
    var $element = $(elem),
        message = $element.data('message'),
        options = $element.data('options');

    if(!message)
      $.error('Notify: No message specified');

    $.notify(message, options || {});
  }


}]);


/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

App.directive("now", ['dateFilter', '$interval', function(dateFilter, $interval){
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        
        var format = attrs.format;

        function updateTime() {
          var dt = dateFilter(new Date(), format);
          element.text(dt);
        }

        updateTime();
        $interval(updateTime, 1000);
      }
    };
}]);
/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels. 
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

App.directive('paneltool', ["$compile", "$timeout", function($compile, $timeout){
  var templates = {
    /* jshint multistr: true */
    collapse:"<a href='#' panel-collapse='' tooltip='Collapse Panel' ng-click='{{panelId}} = !{{panelId}}'> \
                <em ng-show='{{panelId}}' class='fa fa-plus'></em> \
                <em ng-show='!{{panelId}}' class='fa fa-minus'></em> \
              </a>",
    dismiss: "<a href='#' panel-dismiss='' tooltip='Close Panel'>\
               <em class='fa fa-times'></em>\
             </a>",
    refresh: "<a href='#' panel-refresh='' data-spinner='{{spinner}}' tooltip='Refresh Panel'>\
               <em class='fa fa-refresh'></em>\
             </a>"
  };

  function getTemplate( elem, attrs ){
    var temp = '';
    attrs = attrs || {};
    if(attrs.toolCollapse)
      temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
    if(attrs.toolDismiss)
      temp += templates.dismiss;
    if(attrs.toolRefresh)
      temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
    return temp;
  }
  
  return {
    restrict: 'E',
    scope: false,
    link: function (scope, element, attrs) {

      var tools = scope.panelTools || attrs;
  
      $timeout(function() {
        element.html(getTemplate(element, tools )).show();
        $compile(element.contents())(scope);
        
        element.addClass('pull-right');
      });

    }
  };
}])
/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/
.directive('panelDismiss', ["$q", "Utils", function($q, Utils){
  'use strict';
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function ($scope, $element) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function () {

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware);
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }
      });
    }]
  };
}])
/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
.directive('panelCollapse', ['$timeout', function($timeout){
  'use strict';
  
  var storageKeyName = 'panelState',
      storage;
  
  return {
    restrict: 'A',
    scope: false,
    controller: ["$scope", "$element", function ($scope, $element) {

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      storage = $scope.$storage;

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function() {

        savePanelState( panelId, !$scope[panelId] );

      });
    }]
  };

  function savePanelState(id, state) {
    if(!id) return false;
    var data = angular.fromJson(storage[storageKeyName]);
    if(!data) { data = {}; }
    data[id] = state;
    storage[storageKeyName] = angular.toJson(data);
  }

  function loadPanelState(id) {
    if(!id) return false;
    var data = angular.fromJson(storage[storageKeyName]);
    if(data) {
      return data[id];
    }
  }

}])
/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/
.directive('panelRefresh', ["$q", function($q){
  'use strict';
  
  return {
    restrict: 'A',
    scope: false,
    controller: ["$scope", "$element", function ($scope, $element) {
      
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';


      // catch clicks to toggle panel refresh
      $element.on('click', function () {
        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) == '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }]
  };
}]);

/**=========================================================
 * Module: play-animation.js
 * Provides a simple way to run animation with a trigger
 * Requires animo.js
 =========================================================*/
 
App.directive('animate', ["$window", "Utils", function($window, Utils){

  'use strict';

  var $scroller = $(window).add('body, .wrapper');
  
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      // Parse animations params and attach trigger to scroll
      var $elem     = $(elem),
          offset    = $elem.data('offset'),
          delay     = $elem.data('delay')     || 100, // milliseconds
          animation = $elem.data('play')      || 'bounce';
      
      if(typeof offset !== 'undefined') {
        
        // test if the element starts visible
        testAnimation($elem);
        // test on scroll
        $scroller.scroll(function(){
          testAnimation($elem);
        });

      }

      // Test an element visibilty and trigger the given animation
      function testAnimation(element) {
          if ( !element.hasClass('anim-running') &&
              Utils.isInView(element, {topoffset: offset})) {
          element
            .addClass('anim-running');

          setTimeout(function() {
            element
              .addClass('anim-done')
              .animo( { animation: animation, duration: 0.7} );
          }, delay);

        }
      }

      // Run click triggered animations
      $elem.on('click', function() {

        var $elem     = $(this),
            targetSel = $elem.data('target'),
            animation = $elem.data('play') || 'bounce',
            target    = $(targetSel);

        if(target && target) {
          target.animo( { animation: animation } );
        }
        
      });
    }
  };

}]);

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

App.directive('scrollable', function(){
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      var defaultHeight = 250;
      elem.slimScroll({
          height: (attrs.height || defaultHeight)
      });
    }
  };
});
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Allows to close
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        $('.wrapper').on('click.sidebar', function(e){
          // don't check if sidebar not visible
          if( ! $body.hasClass('aside-toggled')) return;

          // if not child of sidebar
          if( ! $(e.target).parents('.aside').length ) {
            $body.removeClass('aside-toggled');          
          }

        });
      }

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

App.directive('skycon', function(){

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      var skycons = new Skycons({'color': (attrs.color || 'white')});

      element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

      skycons.add(element.children()[0], attrs.skycon);

      skycons.play();

    }
  };
});
/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
App.directive('sparkline', ['$timeout', '$window', function($timeout, $window){

  'use strict';

  return {
    restrict: 'EA',
    controller: ["$scope", "$element", function ($scope, $element) {
      var runSL = function(){
        initSparLine($element);
      };

      $timeout(runSL);
    }]
  };

  function initSparLine($element) {
    var options = $element.data();

    options.type = options.type || 'bar'; // default chart is bar
    options.disableHiddenCheck = true;

    $element.sparkline('html', options);

    if(options.resize) {
      $(window).resize(function(){
        $element.sparkline('html', options);
      });
    }
  }

}]);

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/

App.directive('checkAll', function() {
  'use strict';
  
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element){
      
      $element.on('change', function() {
        var $this = $(this),
            index= $this.index() + 1,
            checkbox = $this.find('input[type="checkbox"]'),
            table = $this.parents('table');
        // Make sure to affect only the correct checkbox column
        table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
          .prop('checked', checkbox[0].checked);

      });
    }]
  };

});
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

App.directive('tagsinput', ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      element.on('itemAdded itemRemoved', function(){
        // check if view value is not empty and is a string
        // and update the view from string to an array of tags
        if(ngModel.$viewValue && ngModel.$viewValue.split) {
          ngModel.$setViewValue( ngModel.$viewValue.split(',') );
          ngModel.$render();
        }
      });

      $timeout(function(){
        element.tagsinput();
      });

    }
  };
}]);

/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

App.directive('validateForm', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var $elem = $($element);
      if($.fn.parsley)
        $elem.parsley();
    }]
  };
});

App.directive('validator', [
  '$injector', function($injector) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        var $parse, $validator, isAcceptTheBroadcast, model, observerRequired, registerRequired, removeRule, rules, validate;
        $validator = $injector.get('$validator');
        $parse = $injector.get('$parse');
        model = $parse(attrs.ngModel);
        rules = [];
        validate = function(from, args) {
          var errorCount, increaseSuccessCount, rule, successCount, _fn, _i, _len;
          if (args == null) {
            args = {};
          }

          /*
          Validate this element with all rules.
          @param from: 'watch', 'blur' or 'broadcast'
          @param args:
              success(): success callback (this callback will return success count)
              error(): error callback (this callback will return error count)
              oldValue: the old value of $watch
           */
          successCount = 0;
          errorCount = 0;
          increaseSuccessCount = function() {
            var rule, _i, _len;
            if (++successCount >= rules.length) {
              ctrl.$setValidity(attrs.ngModel, true);
              for (_i = 0, _len = rules.length; _i < _len; _i++) {
                rule = rules[_i];
                rule.success(model(scope), scope, element, attrs, $injector);
              }
              if (typeof args.success === "function") {
                args.success();
              }
            }
          };
          if (rules.length === 0) {
            return increaseSuccessCount();
          }
          _fn = function(rule) {
            return rule.validator(model(scope), scope, element, attrs, {
              success: function() {
                return increaseSuccessCount();
              },
              error: function() {
                if (rule.enableError && ++errorCount === 1) {
                  ctrl.$setValidity(attrs.ngModel, false);
                  rule.error(model(scope), scope, element, attrs, $injector);
                }
                if ((typeof args.error === "function" ? args.error() : void 0) === 1) {
                  try {
                    element[0].scrollIntoViewIfNeeded();
                  } catch (_error) {}
                  return element[0].select();
                }
              }
            });
          };
          for (_i = 0, _len = rules.length; _i < _len; _i++) {
            rule = rules[_i];
            switch (from) {
              case 'blur':
                if (rule.invoke !== 'blur') {
                  continue;
                }
                rule.enableError = true;
                break;
              case 'watch':
                if (rule.invoke !== 'watch' && !rule.enableError) {
                  increaseSuccessCount();
                  continue;
                }
                break;
              case 'broadcast':
                rule.enableError = true;
                break;
            }
            _fn(rule);
          }
        };
        registerRequired = function() {
          var rule;
          rule = $validator.getRule('required');
          if (rule == null) {
            rule = $validator.convertRule('required', {
              validator: /^.+$/,
              invoke: 'watch'
            });
          }
          return rules.push(rule);
        };
        removeRule = function(name) {

          /*
          Remove the rule in rules by the name.
           */
          var index, _i, _ref, _ref1, _results;
          _results = [];
          for (index = _i = 0, _ref = rules.length; _i < _ref; index = _i += 1) {
            if (!(((_ref1 = rules[index]) != null ? _ref1.name : void 0) === name)) {
              continue;
            }
            rules[index].success(model(scope), scope, element, attrs, $injector);
            rules.splice(index, 1);
            _results.push(index--);
          }
          return _results;
        };
        attrs.$observe('validator', function(value) {
          var match, name, rule, ruleNames, _i, _len, _results;
          rules.length = 0;
          if (observerRequired.validatorRequired || observerRequired.required) {
            registerRequired();
          }
          match = value.match(/^\/(.*)\/$/);
          if (match) {
            rule = $validator.convertRule('dynamic', {
              validator: RegExp(match[1]),
              invoke: attrs.validatorInvoke,
              error: attrs.validatorError
            });
            rules.push(rule);
            return;
          }
          match = value.match(/^\[(.+)\]$/);
          if (match) {
            ruleNames = match[1].split(',');
            _results = [];
            for (_i = 0, _len = ruleNames.length; _i < _len; _i++) {
              name = ruleNames[_i];
              rule = $validator.getRule(name.replace(/^\s+|\s+$/g, ''));
              if (typeof rule.init === "function") {
                rule.init(scope, element, attrs, $injector);
              }
              if (rule) {
                _results.push(rules.push(rule));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        });
        attrs.$observe('validatorError', function(value) {
          var match, rule;
          match = attrs.validator.match(/^\/(.*)\/$/);
          if (match) {
            removeRule('dynamic');
            rule = $validator.convertRule('dynamic', {
              validator: RegExp(match[1]),
              invoke: attrs.validatorInvoke,
              error: value
            });
            return rules.push(rule);
          }
        });
        observerRequired = {
          validatorRequired: false,
          required: false
        };
        attrs.$observe('validatorRequired', function(value) {
          if (value && value !== 'false') {
            registerRequired();
            return observerRequired.validatorRequired = true;
          } else if (observerRequired.validatorRequired) {
            removeRule('required');
            return observerRequired.validatorRequired = false;
          }
        });
        attrs.$observe('required', function(value) {
          if (value && value !== 'false') {
            registerRequired();
            return observerRequired.required = true;
          } else if (observerRequired.required) {
            removeRule('required');
            return observerRequired.required = false;
          }
        });
        isAcceptTheBroadcast = function(broadcast, modelName) {
          var anyHashKey, dotIndex, itemExpression, itemModel;
          if (modelName) {
            if (attrs.validatorGroup === modelName) {
              return true;
            }
            if (broadcast.targetScope === scope) {
              return attrs.ngModel.indexOf(modelName) === 0;
            } else {
              anyHashKey = function(targetModel, hashKey) {
                var key, x;
                for (key in targetModel) {
                  x = targetModel[key];
                  switch (typeof x) {
                    case 'string':
                      if (key === '$$hashKey' && x === hashKey) {
                        return true;
                      }
                      break;
                    case 'object':
                      if (anyHashKey(x, hashKey)) {
                        return true;
                      }
                      break;
                  }
                }
                return false;
              };
              dotIndex = attrs.ngModel.indexOf('.');
              itemExpression = dotIndex >= 0 ? attrs.ngModel.substr(0, dotIndex) : attrs.ngModel;
              itemModel = $parse(itemExpression)(scope);
              return anyHashKey($parse(modelName)(broadcast.targetScope), itemModel.$$hashKey);
            }
          }
          return true;
        };
        scope.$on($validator.broadcastChannel.prepare, function(self, object) {
          if (!isAcceptTheBroadcast(self, object.model)) {
            return;
          }
          return object.accept();
        });
        scope.$on($validator.broadcastChannel.start, function(self, object) {
          if (!isAcceptTheBroadcast(self, object.model)) {
            return;
          }
          return validate('broadcast', {
            success: object.success,
            error: object.error
          });
        });
        scope.$on($validator.broadcastChannel.reset, function(self, object) {
          var rule, _i, _len;
          if (!isAcceptTheBroadcast(self, object.model)) {
            return;
          }
          for (_i = 0, _len = rules.length; _i < _len; _i++) {
            rule = rules[_i];
            rule.success(model(scope), scope, element, attrs, $injector);
            if (rule.invoke !== 'watch') {
              rule.enableError = false;
            }
          }
          return ctrl.$setValidity(attrs.ngModel, true);
        });
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          return validate('watch', {
            oldValue: oldValue
          });
        });
        return $(element).bind('blur', function() {
          if (scope.$root.$$phase) {
            return validate('blur');
          } else {
            return scope.$apply(function() {
              return validate('blur');
            });
          }
        });
      }
    };
  }
]);

App.provider('$validator', function() {
  var $injector, $q, $timeout;
  $injector = null;
  $q = null;
  $timeout = null;
  this.rules = {};
  this.broadcastChannel = {
    prepare: '$validatePrepare',
    start: '$validateStart',
    reset: '$validateReset'
  };
  this.setupProviders = function(injector) {
    $injector = injector;
    $q = $injector.get('$q');
    return $timeout = $injector.get('$timeout');
  };
  this.convertError = function(error) {

    /*
    Convert rule.error.
    @param error: error messate (string) or function(value, scope, element, attrs, $injector)
    @return: function(value, scope, element, attrs, $injector)
     */
    var errorMessage;
    if (typeof error === 'function') {
      return error;
    }
    errorMessage = error.constructor === String ? error : '';
    return function(value, scope, element, attrs) {
      var $label, label, parent, _i, _len, _ref, _results;
      parent = $(element).parent();
      _results = [];
      while (parent.length !== 0) {
        if (parent.hasClass('form-group')) {
          parent.addClass('has-error');
          _ref = parent.find('label');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            label = _ref[_i];
            if ($(label).hasClass('error')) {
              $(label).remove();
            }
          }
          $label = $("<label class='control-label error'>" + errorMessage + "</label>");
          if (attrs.id) {
            $label.attr('for', attrs.id);
          }
          if ($(element).parent().hasClass('input-group')) {
            $(element).parent().parent().append($label);
          } else {
            $(element).parent().append($label);
          }
          break;
        }
        _results.push(parent = parent.parent());
      }
      return _results;
    };
  };
  this.convertSuccess = function(success) {

    /*
    Convert rule.success.
    @param success: function(value, scope, element, attrs, $injector)
    @return: function(value, scope, element, attrs, $injector)
     */
    if (typeof success === 'function') {
      return success;
    }
    return function(value, scope, element) {
      var label, parent, _i, _len, _ref, _results;
      parent = $(element).parent();
      _results = [];
      while (parent.length !== 0) {
        if (parent.hasClass('has-error')) {
          parent.removeClass('has-error');
          _ref = parent.find('label');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            label = _ref[_i];
            if ($(label).hasClass('error')) {
              $(label).remove();
            }
          }
          break;
        }
        _results.push(parent = parent.parent());
      }
      return _results;
    };
  };
  this.convertValidator = function(validator) {

    /*
    Convert rule.validator.
    @param validator: RegExp() or function(value, scope, element, attrs, $injector)
                                                { return true / false }
    @return: function(value, scope, element, attrs, funcs{success, error})
        (funcs is callback functions)
     */
    var func, regex, result;
    result = function() {};
    if (validator.constructor === RegExp) {
      regex = validator;
      result = function(value, scope, element, attrs, funcs) {
        if (value == null) {
          value = '';
        }
        if (regex.test(value)) {
          return typeof funcs.success === "function" ? funcs.success() : void 0;
        } else {
          return typeof funcs.error === "function" ? funcs.error() : void 0;
        }
      };
    } else if (typeof validator === 'function') {
      func = validator;
      result = function(value, scope, element, attrs, funcs) {
        return $q.all([func(value, scope, element, attrs, $injector)]).then(function(objects) {
          if (objects && objects.length > 0 && objects[0]) {
            return typeof funcs.success === "function" ? funcs.success() : void 0;
          } else {
            return typeof funcs.error === "function" ? funcs.error() : void 0;
          }
        }, function() {
          return typeof funcs.error === "function" ? funcs.error() : void 0;
        });
      };
    }
    return result;
  };
  this.convertRule = (function(_this) {
    return function(name, object) {
      var result, _ref, _ref1;
      if (object == null) {
        object = {};
      }

      /*
      Convert the rule object.
       */
      result = {
        name: name,
        enableError: object.invoke === 'watch',
        invoke: object.invoke,
        init: object.init,
        validator: (_ref = object.validator) != null ? _ref : function() {
          return true;
        },
        error: (_ref1 = object.error) != null ? _ref1 : '',
        success: object.success
      };
      result.error = _this.convertError(result.error);
      result.success = _this.convertSuccess(result.success);
      result.validator = _this.convertValidator(result.validator);
      return result;
    };
  })(this);
  this.register = function(name, object) {
    if (object == null) {
      object = {};
    }

    /*
    Register the rule.
    @params name: The rule name.
    @params object:
        invoke: 'watch' or 'blur' or undefined(validate by yourself)
        init: function(scope, element, attrs, $injector)
        validator: RegExp() or function(value, scope, element, attrs, $injector)
        error: string or function(scope, element, attrs)
        success: function(scope, element, attrs)
     */
    return this.rules[name] = this.convertRule(name, object);
  };
  this.getRule = function(name) {

    /*
    Get the rule form $validator.rules by the name.
    @return rule / null
     */
    if (this.rules[name]) {
      return angular.copy(this.rules[name]);
    } else {
      return null;
    }
  };
  this.validate = (function(_this) {
    return function(scope, model) {

      /*
      Validate the model.
      @param scope: The scope.
      @param model: The model name of the scope or validator-group.
      @return:
          @promise success(): The success function.
          @promise error(): The error function.
       */
      var broadcastObject, count, deferred, func, promise;
      deferred = $q.defer();
      promise = deferred.promise;
      count = {
        total: 0,
        success: 0,
        error: 0
      };
      func = {
        promises: {
          success: [],
          error: [],
          then: []
        },
        accept: function() {
          return count.total++;
        },
        validatedSuccess: function() {
          var x, _i, _j, _len, _len1, _ref, _ref1;
          if (++count.success === count.total) {
            _ref = func.promises.success;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              x();
            }
            _ref1 = func.promises.then;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              x = _ref1[_j];
              x();
            }
          }
          return count.success;
        },
        validatedError: function() {
          var x, _i, _j, _len, _len1, _ref, _ref1;
          if (count.error++ === 0) {
            _ref = func.promises.error;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              x();
            }
            _ref1 = func.promises.then;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              x = _ref1[_j];
              x();
            }
          }
          return count.error;
        }
      };
      promise.success = function(fn) {
        func.promises.success.push(fn);
        return promise;
      };
      promise.error = function(fn) {
        func.promises.error.push(fn);
        return promise;
      };
      promise.then = function(fn) {
        func.promises.then.push(fn);
        return promise;
      };
      broadcastObject = {
        model: model,
        accept: func.accept,
        success: func.validatedSuccess,
        error: func.validatedError
      };
      scope.$broadcast(_this.broadcastChannel.prepare, broadcastObject);
      $timeout(function() {
        var $validator, x, _i, _len, _ref;
        if (count.total === 0) {
          _ref = func.promises.success;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            x();
          }
          return;
        }
        $validator = $injector.get('$validator');
        return scope.$broadcast($validator.broadcastChannel.start, broadcastObject);
      });
      return promise;
    };
  })(this);
  this.reset = (function(_this) {
    return function(scope, model) {

      /*
      Reset validated error messages of the model.
      @param scope: The scope.
      @param model: The model name of the scope or validator-group.
       */
      return scope.$broadcast(_this.broadcastChannel.reset, {
        model: model
      });
    };
  })(this);
  this.get = function($injector) {
    this.setupProviders($injector);
    return {
      rules: this.rules,
      broadcastChannel: this.broadcastChannel,
      register: this.register,
      convertRule: this.convertRule,
      getRule: this.getRule,
      validate: this.validate,
      reset: this.reset
    };
  };
  this.get.$inject = ['$injector'];
  this.$get = this.get;
});

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

App.directive('vectorMap', ['vectorMap', function(vectorMap){
  'use strict';

  var defaultColors = {
      markerColor:  '#23b7e5',      // the marker points
      bgColor:      'transparent',      // the background
      scaleColors:  ['#878c9a'],    // the color of the region in the serie
      regionFill:   '#bbbec6'       // the base region color
  };

  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {

      var mapHeight   = attrs.height || '300',
          options     = {
            markerColor:  attrs.markerColor  || defaultColors.markerColor,
            bgColor:      attrs.bgColor      || defaultColors.bgColor,
            scale:        attrs.scale        || 1,
            scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
            regionFill:   attrs.regionFill   || defaultColors.regionFill,
            mapName:      attrs.mapName      || 'world_mill_en'
          };
      
      element.css('height', mapHeight);
      
      vectorMap.init( element , options, scope.seriesData, scope.markersData);

    }
  };

}]);
/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: clone.js
 * Utility library to use across the theme
 =========================================================*/

App.service('clone', function() {

    /**
     * 复制对象
     * @param obj
     * @returns {*}
     */
    var _deepClone = function (obj) {
        var result = {}, oClass = _isClass(obj);
        if (oClass === "Object") {
            result = {};
        } else if (oClass === "Array") {
            result = [];
        } else {
            return obj;
        }
        for (var key in obj) {
            var copy = obj[key];
            if (_isClass(copy) == "Object") {
                result[key] = arguments.callee(copy);
            } else if (_isClass(copy) == "Array") {
                result[key] = arguments.callee(copy);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    };

    var _isClass = function (o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    };

    return {
        deepClone: _deepClone
    }
});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);
/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

App.service('vectorMap', function() {
  'use strict';
  return {
    init: function($element, opts, series, markers) {
          $element.vectorMap({
            map:             opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin:         1,
            zoomMax:         8,
            zoomOnScroll:    false,
            regionStyle: {
              initial: {
                'fill':           opts.regionFill,
                'fill-opacity':   1,
                'stroke':         'none',
                'stroke-width':   1.5,
                'stroke-opacity': 1
              },
              hover: {
                'fill-opacity': 0.8
              },
              selected: {
                fill: 'blue'
              },
              selectedHover: {
              }
            },
            focusOn:{ x:0.4, y:0.6, scale: opts.scale},
            markerStyle: {
              initial: {
                fill: opts.markerColor,
                stroke: opts.markerColor
              }
            },
            onRegionLabelShow: function(e, el, code) {
              if ( series && series[code] )
                el.html(el.html() + ': ' + series[code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
          });
        }
  };
});
// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('myAppName', ['angle']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition
  
}]);

myApp.controller('oneOfMyOwnController', ["$scope", function($scope) {
  /* controller code */
}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);

angular.module('angle')
    .filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    })
    .filter('splitcharacters', function() {
        return function (input, chars) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                var prefix = input.substring(0, chars/2);
                var postfix = input.substring(input.length-chars/2, input.length);
                return prefix + '...' + postfix;
            }
            return input;
        };
    })
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '…';
                }
            }
            return input;
        };
    });

App.directive('maxLenHidden', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: { maxLenHidden: '@',
              tipValue:'@'},
    link: function(scope, element, attrs) {
      //scope.$watch('maxLenHidden', function(value) {
      //  console.log(value);
      //  if (parseInt(value, 10) < 18) {
      //    //element.html('child');
      //  }
      //});
      var maxLengthtemp = parseInt(attrs.maxLenHidden, 10);
      if (maxLengthtemp < attrs.tipValue.toString().length) {
        $(element).text(attrs.tipValue.toString().substr(0, maxLengthtemp) + "...");
        $(element).mouseenter(function () {
          var value = $(this).attr("tip-value");
          var tooltip_class = '<div class="tooltip-self right in">  <div class="tooltip-self-arrow"></div> <div class="tooltip-self-inner">' + value + '</div></div>';
          $(this).append(tooltip_class);
          var tooltipHeight = $(".tooltip-self", this).height();
          $(".tooltip-self", this).css({
            "top": $(this).position().top - (tooltipHeight / 2) + ($(this).height() / 2),
            "left": $(this).position().left + $(this).width(),
            "cursor": "text"
          });

          $(".tooltip-self", this).click(function(event){
            event.preventDefault();
            return false;
          });

          var href = "";
          $(".tooltip-self").mouseleave(function () {
            $(this).find(".tooltip-self").remove();
            if ($(this).parent().is("a")) {
              $(this).parent().prop("href", href);
            }
          }).mouseenter(function(){
            $tempLen = $(this).parent();
            if ($tempLen.is("a")) {
              href = $tempLen.prop("href");
              $tempLen.removeAttr("href");
            }
          });
        });

        $(element).mouseleave(function () {
          $(this).find(".tooltip-self").remove();
        });
      }
      scope.$watch('tipValue',function(){
        if (maxLengthtemp < attrs.tipValue.toString().length){
          $(element).text(attrs.tipValue.toString().substr(0, maxLengthtemp) + "...");
          $(element).mouseenter(function () {
            var value = $(this).attr("tip-value");
            var tooltip_class = '<div class="tooltip-self right in">  <div class="tooltip-self-arrow"></div> <div class="tooltip-self-inner">' + value + '</div></div>';
            $(this).append(tooltip_class);
            var tooltipHeight = $(".tooltip-self", this).height();
            $(".tooltip-self", this).css({
              "top": $(this).position().top - (tooltipHeight / 2) + ($(this).height() / 2),
              "left": $(this).position().left + $(this).width(),
              "cursor": "text"
            });

            $(".tooltip-self", this).click(function(event){
              event.preventDefault();
              return false;
            });

            var href = "";
            $(".tooltip-self").mouseleave(function () {
              $(this).find(".tooltip-self").remove();
              if ($(this).parent().is("a")) {
                $(this).parent().prop("href", href);
              }
            }).mouseenter(function(){
              $tempLen = $(this).parent();
              if ($tempLen.is("a")) {
                href = $tempLen.prop("href");
                $tempLen.removeAttr("href");
              }
            });
          });

          $(element).mouseleave(function () {
            $(this).find(".tooltip-self").remove();
          });
        }else {
          $(element).text(attrs.tipValue.toString());
        }
      });
    }
  };
});

App.directive('tipCopySelf', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: { maxLenHidden: '@' },
    link: function(scope, element, attrs) {
      //scope.$watch('maxLenHidden', function(value) {
      //  console.log(value);
      //  if (parseInt(value, 10) < 18) {
      //    //element.html('child');
      //  }
      //});
      //var maxLengthtemp = parseInt(attrs.maxLenHidden, 10);
      //if (maxLengthtemp < attrs.tipValue.toString().length) {
        //$(element).text(attrs.tipValue.toString().substr(0, maxLengthtemp) + "...");
        $(element).mouseenter(function () {
          var value = $(this).attr("tip-copy-self");
          var tooltip_class = '<div class="tooltip-self right in">  <div class="tooltip-self-arrow"></div> <div class="tooltip-self-inner">' + value + '</div></div>';
          $(this).append(tooltip_class);
          var tooltipHeight = $(".tooltip-self", this).height();
          $(".tooltip-self", this).css({
            "top": $(this).position().top - (tooltipHeight / 2) + ($(this).height() / 2),
            "left": $(this).position().left + $(this).width(),
            "cursor": "text"
          });

          $(".tooltip-self", this).click(function(event){
            event.preventDefault();
            return false;
          });

          var href = "";
          $(".tooltip-self").mouseleave(function () {
            $(this).find(".tooltip-self").remove();
            if ($(this).parent().is("a")) {
              $(this).parent().prop("href", href);
            }
          }).mouseenter(function(){
            $tempLen = $(this).parent();
            if ($tempLen.is("a")) {
              href = $tempLen.prop("href");
              $tempLen.removeAttr("href");
            }
          });
        });

        $(element).mouseleave(function () {
          $(this).find(".tooltip-self").remove();
        });
      }
    //}
  };
});

App.directive('modalMaxLenHidden', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: { modalMaxLenHidden: '@' },
    link: function(scope, element, attrs) {
      //scope.$watch('maxLenHidden', function(value) {
      //  console.log(value);
      //  if (parseInt(value, 10) < 18) {
      //    //element.html('child');
      //  }
      //});
      /*判断字符串的长度，中文算2个，英文算1个*/
      function getStrLength(str) {
        var cArr = str.match(/[^\x00-\xff]/ig);
        if(null == cArr){
          cArr_length = 0;
        }else{
          cArr_length = cArr.length;
        }
        var strLengthInfo = {
          Strlength : str.length + (cArr == null ? 0 : cArr.length),
          cArrLength : cArr_length
        }
        return strLengthInfo;
      }
      /*截取maxLength长度的字符串，中文算两个，英文算一个*/
      function getElementText(subStr,maxLength){
        var templength = maxLength;
        if(subStr.length < maxLength){
          templength = subStr.length;
        }
        while(getStrLength(subStr).Strlength > maxLength){
          templength = templength-(getStrLength(subStr).Strlength - maxLength)/2-1;
          subStr = subStr.substr(0,templength);
        }
        return subStr;
      }

      var maxLengthtemp = parseInt(attrs.modalMaxLenHidden, 10);
      if (maxLengthtemp < getStrLength(attrs.tipValue.toString()).Strlength) {
        var subStr = attrs.tipValue.toString().substr(0,maxLengthtemp);
        $(element).text(getElementText(subStr,maxLengthtemp) + "...");
        $(element).mouseenter(function () {
          var value = $(this).attr("tip-value");
          var tooltip_class = '<div class="tooltip-self bottom in">  <div class="tooltip-self-arrow"></div> <div class="tooltip-self-inner">' + value + '</div></div>';
          $(this).append(tooltip_class);
          var tooltipHeight = $(".tooltip-self", this).height();
          $(".tooltip-self", this).css({
            "top": $(this).position().top + $(this).height()/2,
            "left": $(this).position().left,
            "cursor": "text"
          });

          $(".tooltip-self-inner",this).css({
            "max-width": "350px"
          });

          $(".tooltip-self", this).click(function(event){
            event.preventDefault();
            return false;
          });

          var href = "";
          $(".tooltip-self").mouseleave(function () {
            $(this).find(".tooltip-self").remove();
            if ($(this).parent().is("a")) {
              $(this).parent().prop("href", href);
            }
          }).mouseenter(function(){
            $tempLen = $(this).parent();
            if ($tempLen.is("a")) {
              href = $tempLen.prop("href");
              $tempLen.removeAttr("href");
            }
          });
        });

        $(element).mouseleave(function () {
          $(this).find(".tooltip-self").remove();
        });
      }
    }
  };
});