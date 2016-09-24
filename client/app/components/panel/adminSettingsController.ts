/**
 * Created by wangsijun on 2016/5/9.
 */
/// <reference path="PanelController.ts"/>
class AdminSettingsController extends PanelController{
    static $inject = ['adminService']
    authorityLevelList:Array<any>
    name:string
    nickName:string
    password:string
    phone:string
    email:string
    authorityLevel:number
    dropdownListValue:number
    gridData:any
    appendData:any

    constructor(AdminService){
        super(AdminService,'admin-settings')
        var $this = this
        $this.authorityLevel = 10
        $this.authorityLevelList = [
            {"name":"超级管理员","value":1},
            {"name":"普通管理员","value":2},
            {"name":"低级管理员","value":10,default:true}
        ]
        $this.gridData={}
        //$this.appendData = [{
        //    "Id":100,
        //    "nick":"街边哼唱2",
        //    "pwd":"wangsijun2",
        //    "email":"wangsijun1986@vip.qq.com",
        //    "phone":"15332345550",
        //    "level":1,
        //    "createTime":"2016-05-07T08:11:29.000Z",
        //    "loginTime":"2016-05-07T08:11:29.000Z",
        //    "host":"127.0.0.1"
        //}]
        $this.getAdminList();
    }

    getAdminList(){
        var $this = this
        $this.adminService.getAdminList(function(err,result){
            if(err){
                console.log(result);
            }
            else{
                $this.gridData["title"] = "标题"
                $this.gridData["header"] = ['act','Id','昵称','密码','邮箱','手机','级别','创建时间','最后登录']
                $this.gridData["cells"] = [
                    {
                        name:'act',
                        index:'act',
                        width:160
                    },
                    {
                        name:'Id',
                        index:'Id',
                        width:60,
                        hidden:false,
                        type:'string',
                        dateFormat:"MM/DD/YYYY",
                        align:'right',
                        sort:true

                    },
                    {
                        name:'nick',
                        index:'nick',
                        hidden:false
                    },
                    {
                        name:'pwd',
                        index:'pwd',
                        type:'string',
                        edit:true,
                        verify:{
                            require:true,
                            length:1000,
                            minValue:0,
                            maxValue:1000,
                            regexp:[
                                {exp:"/ssdfsdf/", message:"sdfsdf"},
                                {exp:"/sdfdsf/", message:"sdfsdfsdf"}
                            ]
                        }
                    },
                    {
                        name:'email',
                        index:'email',
                        type:'checkbox',
                        edit:true
                    },
                    {
                        name:'phone',
                        index:'phone',
                        type:'number',
                        verify:{
                            require:true,
                            length:11
                        }
                    },
                    {
                        name:'level',
                        index:'level',
                        type:'dropdown',
                        edit:true,
                        dropdownList:$this.authorityLevelList
                    },
                    {
                        name:'createTime',
                        index:'createTime',
                        type:'date',
                        dateFormat:"MM/DD/YYYY",
                    },
                    {
                        name:'loginTime',
                        index:'loginTime',
                        type:'date',
                        dateFormat:"MM/DD/YYYY",
                    }
                ]
                $this.gridData["module"] = result.data
            }
        });
    }

    appendAdminData(){
        var $this =this
       $this.appendData = [{
               "Id":100,
           "nick":"街边哼唱2",
           "pwd":"wangsijun2",
           "email":"wangsijun1986@vip.qq.com",
           "phone":"15332345550",
           "level":1,
           "createTime":"2016-05-07T08:11:29.000Z",
           "loginTime":"2016-05-07T08:11:29.000Z",
           "host":"127.0.0.1"
       }]
    }
    getValue(result){

    }
    addAdmin(){
        var $this = this
        var admin = {
            "name": $this.name,
            "pwd": $this.password,
            "phone": $this.phone,
            "nick": $this.nickName,
            "email": $this.email,
            "level": $this.dropdownListValue
        }
        $this.adminService.addAdmin(admin,function(err,result){
            if(err){
                console.log(result);
            }
            else{
                $this.appendData = result.data;
            }
        });
    }
}

angular.module('hb.components').controller('adminSettingsController',AdminSettingsController);