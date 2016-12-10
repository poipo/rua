(function (angular) {

    // ���������������� ���ݵ�CRUD
    // Ҳ��Ҫ��һ��ģ��
    angular.module('todoApp.todoSrv', [])
        .service('todoSrv', ['$window',function($window){
            // this.test = "���ǲ������ݣ�����";

            // todo: ����������������������صĲ���ȫ�����ŵ�������
            // 			 �����������Ҫ�������ݣ�ֻ��Ҫ���÷�������Ӧ�ķ������ɣ�
            var storage=$window.localStorage;
            var str=storage.getItem('todo');
            var todoList=JSON.parse(str)||[];
            this.getData= function () {
                return todoList;
            }
            //��������
            this.saveData=function(){
                storage.setItem('todo',JSON.stringify(todoList));
            };
            //�������
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
            //ɾ������
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
            //�л�����ѡ��״̬
            this.selectAll=function(isCheckedAll){
                var i=0,list=todoList;
                for(;i<list.length;i++){
                    todoList[i].isCompleted=isCheckedAll;
                }
                this.saveData();
            }
            //�������ɵ�����
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