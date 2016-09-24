/// <reference path="../base/BaseController.ts"/>
class HeaderController{
    static $inject = ['$scope','adminService','navigationService'];
    scope:any
    navigationService:NavigationService
    adminService:AdminService
    widescreen:boolean
    constructor($scope,AdminService,NavigationService){
        var $this = this;
        $this.scope = $scope
        $this.navigationService = NavigationService
        $this.adminService = AdminService
        $this.widescreen = true
    }
    ChangeWidescreen(){
        var $this = this
        $this.widescreen = !$this.widescreen
        $this.navigationService.widescreen = $this.widescreen
    }
}
angular.module('hb.components').controller('headerController',HeaderController);