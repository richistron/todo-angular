/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        mustache: {
            exports: 'Mustache'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        app: {
            deps: [
                'backbone',
                'underscore',
                'mustache',
                'backbone',
                'bootstrap',
                'jquery'
            ],
            exports:'app'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        mustache: '../bower_components/mustache/mustache',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'app'
], function (App) {
    App.start();
});