(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var app=angular.module("todoApp.todoCtrl",['ngRoute']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:status?',{
            templateUrl:'view.html',
            controller:'toDoController'
        });
    }])
	app.controller("toDoController",['$scope','$location','todoSrv','$routeParams',function($scope,$location,todoSrv,$routeParams){
		//$scope.todoList = [
		//	{id: 0, name: '吃饭', isCompleted: false},
		//	{id: 1, name: '睡觉', isCompleted: true},
		//	{id: 2, name: '学习', isCompleted: false},
		//	{id: 3, name: '打豆豆', isCompleted: false}
		//];
        $scope.todoList=todoSrv.getData();
		//添加
		$scope.newTask='';
		$scope.add=function(){

			if(!$scope.newTask){
				return;
			}
            todoSrv.addData($scope.newTask);
			$scope.newTask='';
		}
		//删除
		$scope.remove=function(id){
            todoSrv.removeData(id);
		}
		//改
		$scope.updateId=-1;
		$scope.update=function(id){
			$scope.updateId=id;
		}
		$scope.save=function(){
            todoSrv.saveData();
			$scope.updateId=-1;
		}
		//切换任务选中状态
		$scope.isCheckedAll=false;
        $scope.selectAll=function(){
            todoSrv.selectAll($scope.isCheckedAll);
        }
        $scope.$watch("todoList",function(cur,old){
            if(cur===old)return;
            todoSrv.saveData();
        },true)
        $scope.isAll=function(){
            var i=0,list=$scope.todoList;
            for(;i<list.length;i++){
                var todo=list[i];
                if(!todo.isCompleted){
                    $scope.isCheckedAll=false;
                    return;
                }
            }
            $scope.isCheckedAll=true;
        }
		//清除已完成的任务
		$scope.clearCompleted=function(){
			todoSrv.clearCompleted();
			$scope.todoList=todoSrv.getData();
        }
		//控制清除按钮的显示和隐藏
		$scope.isShow=function(){
			var i=0,list=$scope.todoList;
			for(;i<list.length;i++){
				var todo=list[i];
				if(todo.isCompleted){
					return true;
				}
			}
			return false;
		}
		//显示未完成的任务数
		$scope.getCount=function(){
			var count=0;
			$scope.todoList.forEach(function(v){
				if(!v.isCompleted){
					count++;
				}
			})
			return count;
		}
        //显示不同状态的任务
        $scope.status={};
        //$scope.checked=function(){
        //    $scope.status={};
        //}
        //$scope.checkedCompleted=function(){
        //    $scope.status={isCompleted:true};
        //}
        //$scope.checkedActive=function(){
        //    $scope.status={isCompleted:false};
        //}

        //根据url变化显示相应任务
        switch ($routeParams.status){
            case 'active':
                $scope.status={isCompleted:false};
                break;
            case 'completed':
                $scope.status={isCompleted:true};
                break;
            default :
                $scope.status={};
                break;
        }
        //$scope.location=$location;
        //$scope.$watch('location.url()',function(cur,old){
        //    //if(cur===old)return;
        //    switch (cur){
        //        case '/active':
        //            $scope.status={isCompleted:false};
        //            break;
        //        case '/completed':
        //            $scope.status={isCompleted:true};
        //            break;
        //        default :
        //            $scope.status={};
        //            break;
        //    }
        //})

	}])

})(angular);
