angular.module('app').controller('HomeCtrl', ['$scope', '$http', '$routeParams', '$location','CurrentEvent', 'Bike', function($scope, $http, $routeParams, $location, CurrentEvent, Bike){


  CurrentEvent.query().then(function(data) {
    $scope.currentEvents = data;
    $scope.currentEventIndex = 0;
  });

  $scope.$watch("currentEventIndex", function() {
    if(!$scope.currentEvents) return false;
      if($scope.currentEventIndex > $scope.currentEvents.length - 1) {

        $scope.currentEventIndex = 0;
      }else if($scope.currentEventIndex < 0 ){
        $scope.currentEventIndex = $scope.currentEvents.length - 1;
      }else {
        $scope.currentEvent = $scope.currentEvents[$scope.currentEventIndex];
      }

  });

  Bike.smartQuery(function(bikes) {
    $scope.featuredBikes = bikes.slice(2, 8);
  });



}]);