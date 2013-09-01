'use strict';

var define = define;

var Backbone = Backbone;

define(function(){

	var Router = Backbone.Router.extend({
		routes:{
			'': 'index'
		},
		index: function(){
			console.log('loading App...');
		}
	});

	return Router;
});