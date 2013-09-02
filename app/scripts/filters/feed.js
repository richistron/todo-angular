'use strict';

angular.module('main')
  .filter('feed', function () {
    return function (input) {
      return 'feed filter: ' + input;
    };
  });
