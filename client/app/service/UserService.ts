/// <reference path="./BaseService.ts"/>
class UserService{
    static $inject = ['$window','$state','$log','$cookies','requestService'];

    window:any
    state:any
    log:any
    cookies:any
    requestService:any

    activeUser = {
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

        if ($this.window.sessionStorage.userInfo) {
            $this.activeUser = JSON.parse($this.window.sessionStorage.userInfo);
        }
    }
    clearUser(){
        this.activeUser = {
            authentic:false,
            isAuthentication:false,
            friends:false,
            firstName:null,
            lastName:null,
            userName:null
        }
    }

    getUser(){
        return this.activeUser
    }

    updateUser(){
        this.window.sessionStorage.userInfo = JSON.stringify(this.activeUser);
    }

    authenticate(user,callback){
        this.requestService.postRequest({name:user.name,password:user.password},(err,result)=>{
            if (result.status == 200) {
                this.recordUser(this.getUser(), result.data);
                callback(true, result.data)
            } else {
                callback(false, result.status)
            }
        });
    }

    recordUser(user,data){
        this.clearUser();
        //user.authentic = data.authentic;
        //user.isAuthentication = data.isAuthentication;
        //user.friends = data.friends;
        //user.firstName = data.firstName;
        //user.lastName = data.lastName;
        //user.userName = data.userName;

    }




}

angular.module('hb.service').service('userService',UserService);