/**
 * Created by wangsijun on 2016/5/11.
 */
/// <reference path="../ts.d.ts"/>

class TransactionsFilter{
    static $inject =['$rootScope','$filter']
    rootScope:any

    static filter($rootScope,$filter:ng.IFilterService){
        return (name)=>{
            var filterArr = name.split('.');
            var obj =  $rootScope.data;
            angular.forEach(filterArr,function(item){
                obj = obj[item];
            })
            $filter = obj;
            return $filter
        }
    }
}
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
