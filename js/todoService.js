(function (angular) {

    // 创建服务，用来处理 数据的CRUD
    angular.module('todoApp.todoSrv', [])
        .service('todoSrv', ['$window',function($window){

            // todo: 将控制器中所有与数据相关的操作全部都放到服务中
            var storage=$window.localStorage;
            var str=storage.getItem('todo');
            var todoList=JSON.parse(str)||[];
            this.getData= function () {
                return todoList;
            }
            //保存数据
            this.saveData=function(){
                storage.setItem('todo',JSON.stringify(todoList));
            };
            //添加数据
            this.addData=function(newTask){
                var id,list=todoList;
                if(list.length===0){
                    id=0;
                }else{
                    id=list[list.length-1].id+1;
                }
                todoList.push({
                    id:id,
                    name:newTask,
                    isCompleted: false
                })
                this.saveData();
            }
            //删除数据
            this.removeData=function(id){
                var i= 0,list=todoList;
                for(;i<list.length;i++){
                    var temp=list[i];
                    if(temp.id===id){
                        todoList.splice(i,1);
                        this.saveData();
                        return;
                    }
                }
            }
            //切换任务选中状态
            this.selectAll=function(isCheckedAll){
                var i=0,list=todoList;
                for(;i<list.length;i++){
                    todoList[i].isCompleted=isCheckedAll;
                }
                this.saveData();
            }
            //清除已完成的任务
            this.clearCompleted=function(){
                var temp=[];
                var i=0,list=todoList;
                for(;i<list.length;i++){
                    var todo=list[i];
                    if(!todo.isCompleted){
                        temp.push(todo);
                    }
                }
                todoList=temp;
                this.saveData();
            }
        }]);

})(angular);