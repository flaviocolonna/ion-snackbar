// (c) 2016 Flavio Colonna Romano
// This code is licensed under MIT license (see license.txt for details)
angular.module("snackbar", ['ngAnimate']).service('$snackbar', function($http, $log, $animate, $q) {
  var timeout = null,
  snackbarContainer = null,
  initialize = false;

  function init() {
    if(!initialize) {
      $http({
        method: 'GET',
        url: '/snackbar.html'
      }).then(function(result) {
        var body = document.getElementsByTagName("body")[0];
        angular.element(body).append(result.data);
        snackbarContainer = document.getElementsByClassName('snackbar-wrapper')[0];
        initialize = true;
      }, function(err) {
        $log.log("Error getting html template", JSON.stringify(err))
        initialize = false;
      });
    }
  }

  function show(options) {
    return $q(function(resolve, reject) {
      if(!initialize) {
        reject("Snackbar not initialized. Call init() first.");
      }
      $animate.removeClass(snackbarContainer, "active").then(function() {
        if(timeout != undefined) {
          clearTimeout(timeout);
        }
        if (!options.message) {
          $log.error("Message in the snackbar not defined");
          reject("Message in the snackbar not defined");
          return;
        }
        var buttonName = options.buttonName ? options.buttonName.trim() : false;
        var buttonFunction = options.buttonFunction ? options.buttonFunction : hide;
        var buttonColor = options.buttonColor ? options.buttonColor : '#a1c2fa';
        var messageColor = options.messageColor ? options.messageColor : 'white';
        var time = options.time ? options.time : 'SHORT';
        var timeMs;
        switch(time) {
          case 'SHORT':
          timeMs = 3000;
          break;
          case 'LONG':
          timeMs = 8000;
          break;
          case 'INDETERMINATE':
          timeMs = 0;
          break;
          default:
          timeMs = 3000;
        }
        angular.element(document.getElementsByClassName("snackbar-btn")).remove();
        if(buttonName && buttonName.length > 0) {
          var button = angular.element(document.createElement("a"));
          button.addClass("snackbar-btn");
          button.text(buttonName);
          button.css('color', buttonColor);
          button.bind("click", buttonFunction);
          var content = document.getElementsByClassName("snackbar-content");
          angular.element(content).append(button);
        }
        angular.element(snackbarContainer).find('span').text(options.message);
        angular.element(snackbarContainer).find('span').css('color', messageColor);
        angular.element(snackbarContainer).addClass("active");
        if(timeMs > 0){
          timeout = setTimeout(hide, timeMs);
        }else{
          angular.element(snackbarContainer).on('snackbar-closed', function(){
            resolve();
          });
        }
      });
    });
  }

  function hide() {
    clearTimeout(timeout);
    angular.element(snackbarContainer).triggerHandler('snackbar-closed');
    angular.element(snackbarContainer).removeClass("active");
  }

  return {
    init: init,
    show: show,
    hide: hide
  };
});
