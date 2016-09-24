/// <reference path="../base/BaseController.ts"/>
class LoginController{
    static $inject = ['$scope','$q','$state','adminService'];

    adminService:AdminService
    title:string
    scope:any
    state:any
    q:any

    constructor($scope,$q,$state,AdminService){
        var $this = this;
        $this.adminService = AdminService
        $this.scope = $scope
        $this.state = $state
        $this.q = $q
        $this.title = "登录"
    }
    
    login(){
        var $this = this
        var admin = $this.adminService.getAdmin()
        admin.isAuthentication=true
        $this.adminService.updateAdmin()
        $this.state.go('panel.menu')
    }
}

angular.module('hb.components').controller('loginController',LoginController);