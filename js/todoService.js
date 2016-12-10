(function (angular) {

    // 创建服务，用来处理 数据的CRUD
    // 也需要有一个模块
    angular.module('todoApp.todoSrv', [])
        .service('todoSrv', ['$window',function($window){
            // this.test = "这是测试数据！！！";

            // todo: 将控制器中所有与数据相关的操作全部都放到服务中
            // 			 控制器中如果要操作数据，只需要调用服务中相应的方法即可！
            var storage=$window.localStorage;
            var str=storage.getItem('todo');
            var todoList=JSON.parse(str)||[];
            this.getData= function () {
                return todoList;
            }
        }]);

})(angular);