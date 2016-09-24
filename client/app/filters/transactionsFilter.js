/**
 * Created by wangsijun on 2016/5/11.
 */
/// <reference path="../ts.d.ts"/>
var TransactionsFilter = (function () {
    function TransactionsFilter() {
    }
    TransactionsFilter.filter = function ($rootScope, $filter) {
        return function (name) {
            var filterArr = name.split('.');
            var obj = $rootScope.data;
            angular.forEach(filterArr, function (item) {
                obj = obj[item];
            });
            $filter = obj;
            return $filter;
        };
    };
    TransactionsFilter.$inject = ['$rootScope', '$filter'];
    return TransactionsFilter;
})();
angular.module('hb.core').filter('transactions', TransactionsFilter.filter);
//angular
//    .module('hb.core')
//    .filter('transactions', TransactionsFilter);
//
//TransactionsFilter.$inject = ['$rootScope'];
//
//function TransactionsFilter($rootScope) {
//    function getValue(item, obj){
//        return obj[item];
//    }
//    return function(name) {
//        var filterArr = name.split('.');
//        var obj =  $rootScope.data;
//        angular.forEach(filterArr,function(item){
//            obj = getValue(item,obj);
//        })
//
//        return obj;
//    };
//}
//
