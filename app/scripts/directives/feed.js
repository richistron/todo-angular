'use strict';

angular.module('main')
  .directive('feed', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the feed directive');
      }
    };
  });
