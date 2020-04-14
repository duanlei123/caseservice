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
App.directive('onlineHelp', function ($state) {
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
});