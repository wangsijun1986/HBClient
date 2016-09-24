/// <reference path="./BaseService.ts"/>
class RequestService{
    static $inject = ['restServer', '$q'];
    q:any
    restServer:any
    canceller:any
    constructor(RestServer,$q){
        this.restServer = RestServer;
        this.q = $q;
        this.canceller = $q.defer();
    }

    postRequest(...args:any[]){
        var callback = args[args.length - 1];
        var postData = args[args.length - 2];
        var rest = this.restServer;
        for (var i = 0; i < args.length - 2; i++){
            rest = rest.one(args[i]);
        }
        rest.post('', postData)
            .then(
            function(result) {
                callback(null, result.data||result);
            },
            function(result) {
                callback(result, null);
            }
        );
    }

    getRequest(...args: any[]) {
        var callback = args[args.length - 1];
        var rest = this.restServer;
        for (var i = 0; i < args.length - 1; i++) {
            if (args[i]) {
                rest = rest.one(args[i].toString());
            }
            else {
                rest = rest.one(args[i]);
            }
        }
        rest.get()
            .then(
            function(result) {
                callback(null, result.data||result);
            },
            function(res) {
                callback(res, null);
            }
        );
    }

    getRequestWithQuery(...args:any[]){
        var callback = args[args.length - 1];
        var query = args[args.length - 2];
        var rest = this.restServer;
        for (var i = 0; i < args.length - 2; i++){
            if(args[i]){
                rest = rest.one(args[i].toString());
            }
            else {
                rest = rest.one(args[i]);
            }
        }
        rest.withHttpConfig({timeout: this.canceller.promise}).get(query)
            .then(
            function(result) {
                callback(null, result.data||result);
            },
            function(result) {
                callback(result, null);
            }
        );
    }

    getRequestWithQueryWithPromise(...args: any[]) {
        var query = args[args.length - 1];
        var rest = this.restServer;
        for (var i = 0; i < args.length - 1; i++){
            if(args[i]){
                rest = rest.one(args[i].toString());
            }
            else {
                rest = rest.one(args[i]);
            }
        }
        return rest.get(query)
    }

    cancelRequests(){
        this.canceller.resolve()
        this.canceller = this.q.defer()
    }
}
angular.module('hb.service').service('requestService',RequestService);