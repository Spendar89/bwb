angular.module('currentEvent.controllers').controller('CurrentEventsCtrl', ['$scope', '$http', '$routeParams', '$location','$document', 'CurrentEvent','$resource', '$timeout',function($scope, $http, $routeParams, $location, $document, CurrentEvent, $resource, $timeout){

	$scope.master = {};

	$scope.create = function(currentEvent) {
		currentEvent.image = $('#imageUrlInput').val()
		var currentEventObj = new CurrentEvent(currentEvent)
		currentEventObj.create().then(function(response){
      $scope.postCreated = true;
      $scope.refresh();
    }, function(error) {
      $scope.postCreated = false;
    })
	};

  $scope.update = function(currentEvent) {
    var $image = $('#imageUrlInput').val()
    if($image) currentEvent.image = $image;
    var currentEventObj = new CurrentEvent(currentEvent)
    currentEventObj.update().then(function(response){
      $scope.postCreated = true;
      $scope.refresh();
    }, function(error) {
      $scope.postCreated = false;
    })
  }

  $scope.save = function(currentEvent) {
    if(!currentEvent) {
      $timeout(function() {
       $scope.postCreated = false;
     })
    } else if(currentEvent.id) {
      $scope.update(currentEvent)
    } else {
      $scope.create(currentEvent)
    }
  }

  $scope.show = function(currentEvent) {
    $scope.currentEvent = currentEvent
  }

  $scope.delete = function(currentEvent) {
    currentEvent.remove();
  }

  $scope.refresh = function() {
    CurrentEvent.query().then(function(data) {
     $scope.currentEvents = data;
     $scope.currentEvent = undefined;
   })
  }

  $document.ready(function(){
    $scope.refresh();
  })

}])