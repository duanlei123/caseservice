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
