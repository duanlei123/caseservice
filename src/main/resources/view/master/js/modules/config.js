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


