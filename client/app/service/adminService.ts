/// <reference path="./BaseService.ts"/>
class AdminService{
    static $inject = ['$window','$state','$log','$cookies','requestService'];

    window:any
    state:any
    log:any
    cookies:any
    requestService:any

    activeAdmin = {
        authentic:false,
        isAuthentication:false,
        friends:null,
        firstName:null,
        lastName:null,
        userName:null
    }

    constructor($window,$state,$log,$cookies,RequestService){
        var $this = this
        $this.window = $window
        $this.state = $state
        $this.log = $log
        $this.cookies = $cookies
        $this.requestService = RequestService

        if ($this.window.sessionStorage.adminInfo) {
            $this.activeAdmin = JSON.parse($this.window.sessionStorage.adminInfo);
        }
    }
    clearAdmin(){
        this.activeAdmin = {
            authentic:false,
            isAuthentication:false,
            friends:false,
            firstName:null,
            lastName:null,
            userName:null
        }
    }

    getAdmin(){
        return this.activeAdmin
    }
    addAdmin(admin,callback){
        var $this = this
        $this.requestService.postRequest('admin','addAdmin',admin,(err,result)=>{
           if(err){
               callback(true,err)
           }else{
               callback(false,result)
           }
        });
    }

    getAdminList(callback){
        var $this = this
        $this.requestService.getRequest('admin','getAdminList',(err,result)=>{
            if(err){
                callback(true,err)
            }else{
                callback(false,result)
            }
        });
    }


    updateAdmin(){
        this.window.sessionStorage.adminInfo = JSON.stringify(this.activeAdmin);
    }

    authenticate(admin,callback){
        var $this = this
        $this.requestService.postRequest('admin','authenicate',{name:admin.name,password:admin.password},(err,result)=>{
            if (err) {
                callback(true, err)
            } else {
                $this.recordAdmin(this.getAdmin(), result.data);
                callback(false, result.data)
            }
        });
    }

    recordAdmin(admin,data){
        this.clearAdmin();
        //user.authentic = data.authentic;
        //user.isAuthentication = data.isAuthentication;
        //user.friends = data.friends;
        //user.firstName = data.firstName;
        //user.lastName = data.lastName;
        //user.userName = data.userName;

    }




}

angular.module('hb.service').service('adminService',AdminService);