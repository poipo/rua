(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var app=angular.module("todoApp.todoCtrl",[]);
	app.controller("toDoController",['$scope','$location',function($scope,$location){
		$scope.todoList = [
			{id: 0, name: '吃饭', isCompleted: false},
			{id: 1, name: '睡觉', isCompleted: true},
			{id: 2, name: '学习', isCompleted: false},
			{id: 3, name: '打豆豆', isCompleted: false}
		];
		//添加
		$scope.newTask='';
		$scope.add=function(){
			var id,list=$scope.todoList;
			if(!$scope.newTask){
				return;
			}
			if(list.length===0){
				id=0;
			}else{
				id=list[list.length-1].id+1;
			}
			$scope.todoList.push({
				id:id,
				name:$scope.newTask,
				isCompleted: false
			})
			$scope.newTask='';
		}
		//删除
		$scope.remove=function(id){
			var i= 0,list=$scope.todoList;
			for(;i<list.length;i++){
				var temp=list[i];
				if(temp.id===id){
					$scope.todoList.splice(i,1);
					return;
				}
			}
		}
		//改
		$scope.updateId=-1;
		$scope.update=function(id){
			$scope.updateId=id;
		}
		$scope.save=function(){
			console.log($scope.updateId);
			$scope.updateId=-1;
		}
		//切换任务选中状态
		$scope.isCheckedAll=false;
		//$scope.isAll=function(){
		//	var i=0,list=$scope.todoList;
		//	for(;i<list.length;i++){
		//		if(!$scope.todoList[i].isCompleted){
		//			$scope.isCheckedAll=false;
		//			return;
		//		}
		//	}
		//	$scope.isCheckedAll=true;
		//}
		//$scope.$watch('isCheckedAll',function(cur,old){
		//	if(cur===old)return;
		//	var i=0,list=$scope.todoList;
		//	for(;i<list.length;i++){
		//		$scope.todoList[i].isCompleted=cur;
		//	}
		//})
        $scope.selectAll=function(){
            var i=0,list=$scope.todoList;
            for(;i<list.length;i++){
                $scope.todoList[i].isCompleted=$scope.isCheckedAll;
            }
        }
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
			var temp=[];
			var i=0,list=$scope.todoList;
			for(;i<list.length;i++){
				var todo=list[i];
				if(!todo.isCompleted){
					temp.push(todo);
				}
			}
			$scope.todoList=temp;
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
        $scope.status='';
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
        $scope.location=$location;
        $scope.$watch('location.url()',function(cur,old){
            //if(cur===old)return;
            switch (cur){
                case '/active':
                    $scope.status={isCompleted:false};
                    break;
                case '/completed':
                    $scope.status={isCompleted:true};
                    break;
                default :
                    $scope.status={};
                    break;
            }
        })
	}])

})(angular);
