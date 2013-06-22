
/*
	models
*/

(function() {
  var APP, blogsModel, sectionModel;

  APP = window.APP || {};

  APP.Models = APP.Models || {};

  sectionModel = Backbone.Model.extend({});

  blogsModel = Backbone.Model.extend({});

  APP.Models = {
    "blogsModel": blogsModel,
    "sectionModel": sectionModel
  };

  window.APP = APP;

}).call(this);
