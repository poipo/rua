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
        }]);

})(angular);