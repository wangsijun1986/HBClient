/// <reference path="../base/BaseController.ts"/>
class PanelController{
    static $inject=['adminService']
    adminService:AdminService
    title: string
    key: string
    state: string
    constructor(AdminService,state){
        var $this = this;
        $this.adminService = AdminService
        $this.title = "hello";
        $this.key = "word";
        $this.state = state;
        var admin = $this.adminService.getAdmin();
    }
}
angular.module('hb.components').controller('panelController',PanelController);