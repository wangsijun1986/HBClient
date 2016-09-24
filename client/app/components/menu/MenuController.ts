/// <reference path="../base/BaseController.ts"/>
class MenuController{
    static $inject = ['$scope','$http','$log','adminService','navigationService'];
    http:any
    log:any
    adminService:AdminService
    navigationService:NavigationService
    menuList:Array<any>
    widescreen:boolean
    constructor($scope,$http,$log,AdminService,NavigationService){
        var $this = this;
        $this.http = $http
        $this.log = $log
        $this.adminService=AdminService
        $this.navigationService=NavigationService
        $this.widescreen = true
        $this.http.get('/assets/jsons/menuLists.json').success(function(result){
            angular.forEach(result.menuData,function(item,index){
                if(index===0){
                    item.active=true
                }
            })
            $this.menuList =result.menuData
        }).error(function(err){
            $this.log.log(err)
        })
        $scope.$watch(function(){ return $this.navigationService.widescreen },function () {
            $this.widescreen = $this.navigationService.widescreen;
        })
    }
}
angular.module('hb.components').controller('menuController',MenuController);