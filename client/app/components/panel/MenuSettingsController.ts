/// <reference path="./PanelController.ts"/>

class MenuSettingsController extends PanelController{
    static $inject = ['adminService']
    adminService:AdminService

    constructor(AdminService){
        super(AdminService,'menu-settings')
        var $this = this
        $this.key="不错哦!@"
        $this.title="哎呦"
        $this.adminService = AdminService
    }
}
angular.module('hb.components').controller('menuSettingsController',MenuSettingsController);
