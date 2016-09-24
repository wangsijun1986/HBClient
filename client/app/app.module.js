angular.module('hb.components', [])
angular.module('hb.service',[])
angular.module('hb.core',['ui.router'])
angular.module('hb.directive',[])
angular.module('hb.directive').constant('_', window._)
angular.module('HB',[
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'hb.core',
    'hb.service',
    'hb.directive',
    'hb.components',
   // 'ngAnimate',
    'ngCookies',
    'angularMoment'
])