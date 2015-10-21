"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    ctrl.result = "";

    ctrl.list = null;

    var cardIOResponseFields = [
      "card_type",
      "redacted_card_number",
      "card_number",
      "expiry_month",
      "expiry_year",
      "cvv",
      "zip"
    ];

    var onCardIOComplete = function(response) {
      alert("card.io scan complete");
      ctrl.result = response;
      for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
        var field = cardIOResponseFields[i];
        alert(field + ": " + response[field]);
      }
      ctrl.list = cardIOResponseFields;
    };

    var onCardIOCancel = function() {
      alert("card.io scan cancelled");
    };

    ctrl.scanCardIO = function () {
      alert("Start");
      window.plugins.CardIO.scan({
        "expiry": true,
        "cvv": true,
        "zip": true,
        "suppressManual": false,
        "suppressConfirm": false,
        "hideLogo": true
      },
        onCardIOComplete,
        onCardIOCancel
      );
      alert("End");
    };

    /*
    ctrl.auth = shared.info.auth;


    ctrl.toggle = angular.noop;


    ctrl.seed = function(){
        alert(shared.info.title);
    };


    ctrl.link = function(){
        alert("https://github.com/marioaleogolsat/cordova-angular-angularMaterial-seed");
    };


    ctrl.isOpen = function() { return false };
    $mdComponentRegistry
    .when("right")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });


    ctrl.toggleRight = function() {
    $mdSidenav("right").toggle()
        .then(function(){
        });
    };


    ctrl.close = function() {
    $mdSidenav("right").close()
        .then(function(){
        });
    };
    */


    $scope.$watch("$state.current.title", function() {
        ctrl.title = $state.current.title;
        $scope.$apply();
    }, true);
});
