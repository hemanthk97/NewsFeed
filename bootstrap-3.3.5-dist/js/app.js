
(function () {
    "use strict";
    var App = angular.module('RSSFeedApp', ['angular-loading-bar'])
    
    var products = [];
    var api = [];
    var newss = [];
    var fi = "";
    App.controller("FeedCtrl", ['$scope', '$http', 'FeedLoader',
  function ($scope, $http, Loader) {
  
          $http.get('bootstrap-3.3.5-dist/feeds.json').success(function (data) {
          $scope.products = data;

      });
   
      this.current = null;
      this.setCurrent = function (setCurrent) {
          this.current = setCurrent;
      };
      var sss = this;
      this.loadFeed = function (e) {
          Loader.parseFeed(e).then(function (res) {

              sss.newss = res.data.responseData.feed.entries;

          });
      };
 
  }]);

 

    App.filter('findImage', function () {
        return function (input) {
            var ss = "< " + input;
            return $(ss).find("img").eq(0).attr("src");
            
        };
    });



    App.filter('split', function () {
        return function (input, splitChar, splitIndex) {
            var da = input;
            var ss = input.split(splitChar)[splitIndex];
            if (ss == null) {
                return da;
                
            }
            else {
                return ss;
            }
        };
    });
    App.factory("FeedLoader", ['$http', function ($http) {
        return {
            parseFeed: function (url) {
                return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            }
        }
    }]);
})();


