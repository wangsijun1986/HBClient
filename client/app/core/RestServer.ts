/// <reference path="./BaseServer.ts"/>
class RestServer{
    static $inject = ['Restangular', '$state', '$log','$q','$http'];
    q:any


    constructor(Restangular, $state, $log,$q,$http){
        this.q = $q;
        var version = '/v1'
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(version);
            RestangularConfigurer.setRestangularFields({ etag: 'eTag' });
            //RestangularConfigurer.setFullResponse(true); // return data and header information
            RestangularConfigurer.setResponseExtractor(function(data, operation, what, url, response, deferred) {
                var result = {};
                result["data"] = data
                result["headers"] = response.config.headers
                result["status"] = response.status
                return result
            });
            RestangularConfigurer.setErrorInterceptor(
                function (response, deferred, responseHandler) {
                    if (response.status == 401) {
                        $log.error('Request failed with status code [' + response.status + '].  ' + (response.data || ''));
                        $state.go('logout');
                        return false;
                    }
                    else if(response.status==403){
                        this.refreshAccessToken().then(function() {
                            // Repeat the request and then call the handlers the usual way.
                            $http(response.config).then(responseHandler, deferred.reject);
                            // Be aware that no request interceptors are called this way.
                        });
                        return false;
                    }
                    return true;
                });
        });
    }

    refreshAccessToken(){
        var deferred = this.q.defer();

        // Refresh access-token logic

        return deferred.promise;
    }
}

angular.module('hb.core').factory('restServer' , RestServer);
