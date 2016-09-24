/**
 * Created by wangsijun on 2016/5/10.
 */
/// <reference path="../ts.d.ts"/>

module DropdownListDirective{
    var compile;
    export class DropdownList{
        constructor($compile){
            compile = $compile
            var directive:ng.IDirective= {}
            directive.restrict='E'
            directive.scope=true
            directive.templateUrl='/app/templates/directive-tmp/dropdown-list.html'
            directive.controller=DropdownListController
            directive.controllerAs='dropdown'
            directive.bindToController={ 'data':'=','setDefaultValue':'=?','getValue':'=','butSize':'@?'}

            return directive;
        }
    }

    export class DropdownListController{
        scope:any
        data:Array<any>
        open:boolean
        name:string
        setDefaultValue:number
        value:any

        constructor($scope,$log){
            var $this = this
            $this.scope = $scope
            $this.open = false
            if(!$this['butSize']){
                $this['butSize']='sm'
            }
            if($this.setDefaultValue){
                $this.setValue()
            }
            else{
                angular.forEach($this.data, function (item) {
                    if (item.default) {
                        $this.name = item.name;
                        $this.value = item.value;
                    }
                });
            }
        }

        setValue(){
            var $this = this
            angular.forEach($this.data,function(item){
                if($this.setDefaultValue==item.value){
                    $this.name = item.name
                    $this.value= item.value
                }
            });
        }

        Selected(value){
            var $this = this
            $this.getName(value)
            $this.open = !$this.open
			$this['getValue'] = $this.value
        }

        getName(value){
            var $this = this
            angular.forEach($this.data,function(item){
                if(item.value==value){
                    $this.name = item.name
                    $this.value = value
                }
            })
        }
        //getValue(){
        //    var $this = this
        //    return $this.value
        //}
    }
}
angular.module('hb.directive').directive('dropdownList',['$compile',DropdownListDirective.DropdownList]).controller('dropdownListController',[DropdownListDirective.DropdownListController])