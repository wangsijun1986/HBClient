/**
 * Created by wangsijun on 2016/5/13.
 */
/// <reference path="../ts.d.ts"/>
    
module GridDirective{
    export class Grid{
        constructor(){
            var directive:ng.IDirective = {}
            directive.scope = true
            directive.restrict = "E"
            directive.templateUrl = "/app/templates/directive-tmp/grid.html"
            directive.controller = GridController
            directive.controllerAs = "grid"
            directive.bindToController = { 'data':'=','appendData':'=','saveCallback':'=','deleteCallback':'=','getDataCallback':'=','selectorRowAll':'=?'}
            return directive
        }
    }
    export class GridController{
        static $inject = ['$scope','moment']
        moment:any
        data:any
        title:string
        header:Array<any>
        headers:Array<any>
        module:Array<any>
        cells:Array<any>
        editCallback:any
        saveCallback:any
        deleteCallback:any
        getDataCallback:any
        format='format'


        constructor($scope,moment){
            var $this = this
            $this.moment = moment
            $scope.$watch(function(){return $this.data.module},function(newVal,oldVal,scope){
                angular.forEach($this.data.module,function(obj,index){
                    obj['rowId']=index
                })
                $this.title = angular.copy($this.data.title)
                $this.headers = angular.copy($this.data.header)
                $this.module = angular.copy($this.data.module)
                $this.cells = angular.copy($this.data.cells)
                $this.header =[]
                $this.formatting()
            });
            $scope.$watch(function(){return $this['appendData'] },function(newVal,oldVal,scope){
                if($this['appendData']){
                    $this.data.module = $this.data.module.concat($this['appendData'])
                }
            })
        }

        formatting(){
            var $this = this
            for(var i in $this.headers){
                var h = {index:null,title:$this.headers[i],style:{},hidden:false,sort:false,sortShow:false,sortType:'',edit:false}
                $this.header.push(h)
            }
            angular.forEach($this.module,function(item){
                item['operation'] = false
            })
            angular.forEach($this.cells,function(item,index){
                var style = {}
                angular.forEach(item,function(value,key){
                    //if(typeof(value)==='string'){
                    //
                    if(key=='type'){
                        if(value == 'date'){
                            $this.formatDate($this.cells[index].index,$this.cells[index].dateFormat)
                        }else if(value=='dropdown'){
                            $this.formatDropdown($this.cells[index].index,$this.cells[index].dropdownList)
                        }
                    }else if(key=='index'){
                        $this.header[index].index=value
                    }else if(key=='width'){
                       style['width'] = !isNaN(parseFloat(value))?value+'px':'auto'
                    }else if(key=='hidden'){
                        $this.header[index].hidden = value
                    }else if(key=='sort'){
                        $this.header[index].sort=value
                        style['cursor']='pointer'
                    }else if(key=='edit'){
                        $this.header[index].edit=value
                    }
                })
                $this.header[index].style=style
            });
            //angular.forEach($this.data.cells,function(item) {
            //    angular.forEach(item,function(key,value){
            //        switch(key){
            //            case "type":
            //                $this.verifyValue(key,value)
            //                break;
            //            case "verify":
            //                angular.forEach(key,function(n,m){
            //                    $this.verifyValue(n,m)
            //                })
            //                break;
            //            default:
            //                break;
            //        }
            //
            //    })
            //
            //})
        }
        verifyValue(key,value){
            var $this =this
            //var fun = eval($this.format.concat($this.firstLetterUppercase(item[key])))
           // if(typeof(fun)==='function'){

           // }
        }

        firstLetterUppercase(value){
            return value.toLocaleUpperCase().subString(0,1).concat(value.subString(1,value.length));
        }

        formatDate(key,expression){
            var $this = this
            angular.forEach($this.module,function(item,i) {
                if (moment($this.module[i][key]).isValid()) {
                    var date = moment($this.module[i][key]).format(expression)
                    $this.module[i][key] = date
                }
            })
        }

        formatDropdown(key,dropdownList){
            var $this = this
            angular.forEach($this.module,function(item,i){
                angular.forEach(dropdownList,function(obj){
                    if(item[key]==obj.value){
                        item[key] =angular.copy(obj)
                    }
                })
            })
        }

        sortColumn(header){
            console.log('gogogog')
        }

        editRow(row){
            row.edit=true
        }

        saveRow(row){
            var $this = this

            $this.reformatting(row)
            console.log(row)

            row.edit = false
            //$this.saveCallback(row)
        }

        reformatting(row){
            var $this = this
            angular.forEach(row,function(value,key){
                angular.forEach($this.cells,function(cell,index){
                    if(key === cell['index']&&cell['edit']){
                        switch(cell['type']){
                            case "dropdown":
                                $this.setNewDataToModeule(key,row['rowId'],value.value)
                                if(cell['dropdownList']){
                                    angular.forEach(cell['dropdownList'],function(obj){
                                        if(value.value==obj.value){
                                            row[key].name = obj.name
                                        }
                                    })
                                }
                                break;
                            case "checkbox":
                                $this.setNewDataToModeule(key,row['rowId'],value)
                                break;
                            default:
                                $this.verifyChanges(key,$this.cells[index]['verify'],cell['type'])
                                $this.setNewDataToModeule(key,row['rowId'],value)
                                break;
                        }
                    }
                })
            })
        }

        verifyChanges(key,verify,type){

        }

        setNewDataToModeule(key,rowId,value){
            var $this = this
            angular.forEach($this.data.module,function(obj){
               if(obj['rowId']===rowId){
                   obj[key] = value
               }
            })
        }

        //setBasetypeDataToModule(key,rowId,value){
        //    var $this = this
        //    angular.forEach($this.data.module,function(obj){
        //        if(obj['rowId']===rowId){
        //            obj[key] = value
        //        }
        //    })
        //}

        cleanRow(row){

        }

        deleteRow(row){
            var $this = this
            $this.deleteCallback(row)
        }

        changeCheckbox(value){
            return !value;
        }

        changeAll(obj){
            var $this = this
            if(typeof(obj)=='string'){
				if(obj==='selectorRowAll'){
					var value = $this['selectedRowAll']
					angular.forEach($this.module,function(item){
					  item['selected'] = value
					})
				}
            }else if(typeof(obj)=='object'){
				if(obj['selected']!=undefined){
					var len = $this.module.length
					var olen = 0
					angular.forEach($this.module,function(item){
						if(item['selected']){
							olen++
						}
					})
					if(olen===len&&obj['selected']){
						$this['selectedRowAll']=true
					}else{
						$this['selectedRowAll']=false
					}
				}
            }
        }

        getRowsData(row) {
            var $this = this
            if (row) {
                console.log(row)
                angular.forEach($this.data.module,function(item,index){
                    if(item.Id==row.Id){
                        console.log(item)
                    }
                })
            }
            else {
                console.log($this.module)
                // $this.getDataCallback($this.module)
            }
            console.log($this.data.module);
        }
    }
}
angular.module('hb.directive').directive('grid',[GridDirective.Grid])