/// <reference path="./BaseService.ts"/>

class NavigationService{
    static $inject = ['$rootScope','$state','$log','$cookies','$window','adminService'];
    rootScope:any
    state:any
    log:any
    cookies:any
    window:any
    adminService:AdminService
    widescreen:boolean

    constructor($rootScope,$state,$log,$cookies,$window,AdminService){
        var $this = this
        $this.rootScope = $rootScope
        $this.state = $state
        $this.log = $log
        $this.cookies = $cookies
        $this.window = $window
        $this.adminService = AdminService
        $this.widescreen=true
    }
}
angular.module('hb.service').service('navigationService',NavigationService);