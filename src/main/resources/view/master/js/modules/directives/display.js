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