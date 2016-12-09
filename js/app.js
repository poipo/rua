(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var app=angular.module("toDoApp",[]);
	app.controller("toDoController",['$scope',function($scope){
		$scope.todoList = [
			{id: 0, name: '吃饭', isCompleted: false},
			{id: 1, name: '睡觉', isCompleted: true},
			{id: 2, name: '学习', isCompleted: false},
			{id: 3, name: '打豆豆', isCompleted: false}
		];
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
	}])

})(angular);
