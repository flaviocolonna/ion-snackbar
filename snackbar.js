// (c) 2016 Flavio Colonna Romano
// This code is licensed under GNU AGP v3 license (see license.txt for details)
angular.module("snackbar", ['ngAnimate']).service('$snackbar', function($http, $log, $animate, $q) {
  var timeout = {};
  var template = $http({
    method: 'GET',
    url: 'lib/snackbar/snackbar.html'
  }).then(function(result) {
    var body = document.getElementsByTagName("body")[0];
    var previousSnackbar = document.getElementsByClassName('snackbar-wrapper');
    if (previousSnackbar.length == 0) {
      angular.element(body).append(result.data)
    }
    return result.data;
  }, function(err) {
    $log.log("Error getting html template", JSON.stringify(err))
  });
  this.show = function(options) {
    return $q(function(resolve, reject) {
      clearTimeout(timeout);
      var wrapper = document.getElementsByClassName("snackbar-wrapper");
      $animate.removeClass(wrapper[0], "active").then(function() {
        if (!options.message) {
          $log.error("Message in the snackbar not defined");
          reject("Message in the snackbar not defined");
          return;
        }
        var buttonName = options.buttonName ? options.buttonName : false;
        var buttonFunction = options.buttonFunction ? options.buttonFunction : this.hide;
        var buttonColor = options.buttonColor ? options.buttonColor : '#a1c2fa';
        var messageColor = options.messageColor ? options.messageColor : 'white';
        var time = options.time ? parseInt(options.time) : 3000;
        template.then(function(res) {
          angular.element(document.getElementsByClassName("snackbar-btn")).remove();
          if(buttonName) {
            var button = angular.element(document.createElement("a"));
            button.addClass("snackbar-btn")
            button.text(buttonName);
            button.css('color', buttonColor);
            button.bind("click", buttonFunction)
            var content = document.getElementsByClassName("snackbar-content");
            angular.element(content).append(button)
          }
          angular.element(wrapper).find('span').text(options.message);
          angular.element(wrapper).find('span').css('color', messageColor);
          angular.element(wrapper).addClass("active");
        });
        timeout = setTimeout(function() {
          angular.element(wrapper).removeClass("active");
          resolve("1");
        }, time);
      });
    });
  };
  this.hide = function() {
    clearTimeout(timeout);
    var wrapper = document.getElementsByClassName("snackbar-wrapper");
    angular.element(wrapper).removeClass("active");
  };
})
