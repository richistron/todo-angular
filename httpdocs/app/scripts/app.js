'use strict';

var define = define;

var Backbone = Backbone;

define(function(){

    var App = App || {};

    App.b = Backbone;

    App.getRouter = function(){
        require(['routes/feeds'],function(Router){
            App.router = new Router();
            Backbone.history.start();
        });
    };

    App.start = function(){
        App.getRouter();
    };

    return App;

});