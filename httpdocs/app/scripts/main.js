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
                'jquery',
                // "mustache",
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        app: {
            deps: ["backbone"]
        },        
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        mustache: "../bower_components/mustache/mustache",
        app: "app",
        tools: "tools/tools"
    }
});

require([
    'app',        
], function (app) {    
    console.log( app );
    app.start();
});
