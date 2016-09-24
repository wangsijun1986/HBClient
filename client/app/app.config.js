angular
    .module('hb.core')
    .config(appConfig)
    .controller('appController', appController)
    .run(appRun)

appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

appRun.$inject = ['$rootScope', '$cookies', '$location', '$state', 'adminService'];

appController.$inject = ['$http','$rootScope', '$location','adminService','navigationService'];

function appController($http,$rootScope,$location,AdminService,NavigationService) {
    var $this = this
    $this.$location = $location;
    $this.adminService = AdminService;
    $this.widescreen = true;
    $http.get("/assets/jsons/transactions.json").success(function(result){
        $rootScope.data = result;
    });
    $rootScope.$watch(function(){return NavigationService.widescreen},function(){
        $this.widescreen = NavigationService.widescreen
    })
    $rootScope.$watch(function(){return AdminService.getAdmin().isAuthentication},function(){
        $this.isAuthentication = AdminService.getAdmin().isAuthentication
    })
    $rootScope.$watch(function(){return AdminService.getAdmin().friends},function(){
        $this.friends = AdminService.getAdmin().friends
    })
}

function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.interceptors.push("authService"); // contained in the auth.module
    //$httpProvider.interceptors.push("timestampService"); // contained in the timestamp module
    //$translateProvider
    //    .useLoader('translationService')
    //    .preferredLanguage('en-US')
    //    .useSanitizeValueStrategy('escaped')
    //    .useStorage('localeStorageService')
    //    .forceAsyncReload(true);

    //$urlRouterProvider.otherwise('/login');

    //
    // Angular UI-Router configuration
    //

    $stateProvider
        .state('home', {
            url: '',
            templateUrl: '/app/templates/login/login.html',
            controller: 'loginController',
            controllerAs: 'login'
        })
        .state('panel', {
            url: '/panel',
            template:'<ui-view></ui-view>' ,
            abstract: true,
        })
            .state('panel.menu', {
                url: '/menu',
                templateUrl: '/app/templates/panel/panel.html',
                controller: 'menuSettingsController',
                controllerAs: 'panelVm'
            })
            .state('panel.permission', {
                url: '/permission',
                templateUrl: '/app/templates/panel/panel.html',
                controller: 'permissionSettingsController',
                controllerAs: 'panelVm'
            })
            .state('panel.admin', {
                url: '/admin',
                templateUrl: '/app/templates/panel/panel.html',
                controller: 'adminSettingsController',
                controllerAs: 'panelVm'
            })
    //.state('logout', {
    //    url: '/login',
    //    templateUrl: '/app/components/login/login.html',
    //    controller: 'LoginController',
    //    controllerAs: 'login'
    //})
    //.state('companies', {
    //    url: '/companies',
    //    templateUrl: '/app/components/companies/companies.html',
    //    controller: 'CompaniesController',
    //    controllerAs: 'companies'
    //})

}

function appRun($rootScope, $cookies, $location,$state,AdminService) {
    //添加路由监测
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == "home") {
            //$location.path();//获取路由地址
            //$location.path('/');//设置路由地址
            var user = AdminService.getAdmin();
            user.isAuthentication = false;
            //$cookies.remove('coaching');
        }
        $rootScope.title = toState.name;
        //使用event.preventDefault()可以阻止模板解析的发生
    });
    //当模板解析完成后触发
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.previousState = fromState.name;
    });
    ////当模板解析错误时触发
    //$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    //
    //});
    ////当视图开始加载，DOM渲染完成之前触发，该事件将在$scope链上广播此事件
    //$scope.$on('$viewContentLoading', function (event, viewConfig) {
    //    // Access to all the view config properties.// and one special property 'targetView'// viewConfig.targetView });
    //
    //});
    ////当视图加载完成，DOM渲染完成之后触发，视图所在的$scope发出该事件
    //$scope.$on('$viewContentLoaded',function(event){
    //
    //});
    //$scope.$watch('$viewContentLoaded',function(event){
    //
    //});
}


