angular.module('app').controller('HomeCtrl', ['$scope', '$http', '$routeParams', '$location', 'CurrentEvent', 'Bike', '$window', '$timeout',
  function($scope, $http, $routeParams, $location, CurrentEvent, Bike, $window, $timeout) {


    $scope.currentEventIndex = 0;

    CurrentEvent.query().then(function(data) {
      $scope.currentEvents = data;
    });

    $scope.currentEvents = [];
    
    // *** current event slider code START ***

    $scope.isLastIndex = function () {
        return $scope.currentEventIndex == $scope.currentEvents.length - 1;    
    };

    $scope.isFirstIndex = function () {
        return $scope.currentEventIndex == 0;
    };


    $scope.setSlideHolderStyle = function () {
        if ($scope.currentEvents) {
            var width = $("#big-slide-div").css("width").split("px")[0];
            var count = $scope.currentEvents.length;
            $scope.slideHolderStyle = {
                width: (width * count),
                right: ((width * $scope.currentEventIndex) + 15)
            };
            return $scope.slideHolderStyle;
        }
    };

    $scope.setCurrentEventStyle = function (currentEvent) {
        if (currentEvent) {
            var imageUrl = currentEvent.imageUrl;
            currentEvent.style = {
                background: "url(" + imageUrl + ") no-repeat",
                "background-size": "cover",
                width: $("#big-slide-div").css("width")
            };
            return currentEvent.style;
        }
    };

    $(window).resize(function () {
        $scope.setSlideHolderStyle();
        _.each($scope.currentEvents, function(ce) {
            $scope.setCurrentEventStyle(ce);
        })
        $scope.$apply();
    });

    // *** current event slider code END ***

     $scope.$watch("currentEventIndex", function() {
       if (!$scope.currentEvents) return false;
       if ($scope.currentEventIndex > $scope.currentEvents.length - 1) {

         $scope.currentEventIndex = 0;
       } else if ($scope.currentEventIndex < 0) {
         $scope.currentEventIndex = $scope.currentEvents.length - 1;
       } else {
         $scope.currentEvent = $scope.currentEvents[$scope.currentEventIndex];
       }
       $scope.setSlideHolderStyle();

     });

     $scope.slideLeft = function() {
         $scope.currentEventIndex -- 
     }

     $scope.slideRight = function() {
         $scope.currentEventIndex ++ 
     }

    Bike.smartQuery(function(bikes) {
      $scope.featuredBikes = bikes.slice(0, 8);
    });

    $scope.brands = ['bianchi', 'blue_cycles', 'breezer', 'electra', 'fuji', 'gt_bicycles', 'khs', 'kona', 'linus', 'marin', 'schwinn', 'scott'];



  }
]);
