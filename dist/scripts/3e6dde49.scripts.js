"use strict";var _app=angular.module("main",[]);_app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"TodosCtrl"}).when("/about",{templateUrl:"views/pages.html",controller:"PagesCtrl"}).when("/contact",{templateUrl:"views/pages.html",controller:"PagesCtrl"}).otherwise({redirectTo:"/"})}]);var _app=angular.module("main");_app.controller("TodosCtrl",["$scope","TodosStorage","Todo","underscore",function(a,b,c,d){!function(){a.todos=b.get(),a.formTodoNewTitle="",a.formTodoNewDescription="",a.hideComplete=!1,a.availableTodos=0}(),a.clearForm=function(){a.formTodoNewTitle="",a.formTodoNewDescription=""},a.$watch("todos",function(c,d){c!==d&&b.put(a.todos)},!0),a.addTodo=function(){""!==a.formTodoNewTitle.trim()&&(a.todos.push(new c({title:a.formTodoNewTitle,description:a.formTodoNewDescription})),a.clearForm())},a.editTodo=function(c,e){var f=d.extend(c,e),g=d.filter(a.todos,function(a){return a.$$hashKey===f.$$hashKey&&(a=f.$$hashKey),a});a.todos=g,b.put(a.todos),a.$digest()},a.deleteComplete=function(){var c=d.filter(a.todos,function(a){return a.done!==!0?a:void 0});a.todos=c,b.put(a.todos)},a.getTodosTotal=function(){return a.hideComplete!==!0?a.todos.length:d.filter(a.todos,function(a){return!a.done}).length},a.deleteThis=function(c){var e=d.filter(a.todos,function(a){return c.$$hashKey!==a.$$hashKey?a:void 0});a.todos=e,b.put(a.todos)}}]);var _app=angular.module("main");_app.directive("deleteComplete",function(){return{restrict:"M",replace:!0,template:'<button type="submit" btn-disabled class="btn btn-danger"><span class="icon-minus"></span>Delete complete</button>',link:function(a,b){b.click(function(){var c=b.closest("#container").find(".modal");c.length>0&&(c.modal("show"),c.find(".cancel").bind("click",function(){c.modal("hide")}),c.find(".delete").bind("click",function(){c.modal("hide"),a.deleteComplete()}))})}}}),_app.directive("modal",function(){return{restrict:"M",replace:!0,templateUrl:"views/modal.html",link:function(){}}}),_app.directive("toogleTodo",[function(){return{restrict:"M",template:'<input toggle-done type="checkbox" />',replace:!0,link:function(a,b){a.todo.done===!0&&b.attr("checked",!0),b.bind("click",function(){b.closest("tr").find(".todo-item").toggleClass("todo-done-true"),a.editTodo(a.todo,{done:b.is(":checked")})})}}}]),_app.directive("todoItem",["$",function(a){return{restrict:"M",templateUrl:"views/todo.html",replace:!0,link:function(b,c){!function(){c.find(".todoItemForm").addClass("hide")}();var d=function(){var a=c.closest("#container").find(".modal");a.length>0&&(a.modal("show"),a.find(".cancel").bind("click",function(){a.modal("hide")}),a.find(".delete").bind("click",function(){a.modal("hide"),b.deleteThis(b.todo)}))};c.find(".todoItem").find(".btns").find("button").filter(".btn-primary").on("click",function(){a(this).closest(".todoItem").hide(),a(this).closest(".todo-item").find(".todoItemForm").show()}),c.find(".todoItem").find(".btns").find("button").filter(".btn-danger").on("click",function(){d()}),c.find(".todoItemForm").find("button").on("mouseenter mouseleave",function(){a(this).toggleClass("disabled")}),c.find(".todoItemForm").find("button").click(function(){a(this).hasClass("btn-primary")?(a(this).closest(".todo-item").find(".todoItemForm").hide(),a(this).closest(".todo-item").find(".todoItem").show()):a(this).hasClass("btn-danger")&&d()})}}}]),_app.directive("controls",function(){return{restrict:"M",templateUrl:"views/controls.html",replace:!0,link:function(){}}}),_app.directive("todosList",function(){return{restrict:"M",templateUrl:"views/todos-list.html",replace:!0,link:function(){}}}),_app.directive("btnDisabled",function(){return{restrict:"A",link:function(a,b){b.addClass("disabled"),b.on("mouseenter mouseleave",function(){b.toggleClass("disabled")})}}}),_app.directive("mainNav",function(){return{templateUrl:"views/main-nav.html",restrict:"M",replace:!0,link:function(){}}}),_app.directive("staticPage",["$location",function(a){return{restrict:"A",link:function(b,c){a.$$path!==b.page.path&&c.hide()}}}]),_app.directive("ulNav",["$","underscore","$location",function(a,b,c){return{restrict:"A",link:function(d,e){"/"===c.$$path?e.find("li").filter(":eq(0)").addClass("active"):b.each(e.find("li"),function(b){var d=a(b).find("a").attr("href").replace("#","");d===c.$$path&&a(b).addClass("active")})}}}]);var _app=angular.module("main"),_=_||window._;_app.filter("titleize",function(){return function(a){return _.string.titleize(a)}}),_app.filter("completedTodos",function(){return function(a,b){return b===!1?a:_.filter(a,function(a){return!a.done})}});var _app=angular.module("main");_app.factory("TodosStorage",function(){var a="angular-todo-app";return{get:function(){return JSON.parse(localStorage.getItem(a)||"[]")},put:function(b){localStorage.setItem(a,JSON.stringify(b))}}}),_app.factory("underscore",function(){return window._}),_app.factory("$",function(){return window.$}),_app.factory("Todo",["underscore",function(a){return function(b){return(void 0===b||null===b)&&(b={}),(void 0!==b.description||null!==b.description)&&0===b.description.trim().length&&delete b.description,a.extend({title:"Hello world",description:"create youre first yeoma app with angular-generator",done:!1},b)}}]),angular.module("main").controller("PagesCtrl",["$scope",function(a){!function(){a.pages=[{name:"About",text:"Todo App 0.0.1 builded with yeoman. @richistron 2013",path:"/about"},{name:"Contact",text:"Github https://github.com/richistron",path:"/contact"}]}()}]);