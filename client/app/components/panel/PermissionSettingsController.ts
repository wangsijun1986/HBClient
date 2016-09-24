/// <reference path="./PanelController.ts"/>

class PermissionSettingsController extends PanelController{
    static $inject =['adminService']
    adminService:AdminService

    constructor(AdminService){
        super(AdminService,'permission-settings')
        var $this = this
        $this.key="这个"
        $this.title="很满意"
        $this.adminService = AdminService
    }

}
angular.module('hb.components').controller('permissionSettingsController',PermissionSettingsController);