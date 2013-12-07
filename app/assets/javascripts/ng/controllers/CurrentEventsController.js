angular.module('currentEvent.controllers').controller('CurrentEventsCtrl', ['$scope', '$http', '$routeParams', '$location','CurrentEvent','$resource', function($scope, $http, $routeParams, $location, CurrentEvent, $resource){

	$scope.master = {};
 
	$scope.create = function(currentEvent) {
		currentEvent.image = $('#imageUrlInput').val()
		$scope.master = angular.copy(currentEvent);		
		var currentEventObj = new CurrentEvent(currentEvent)
		
		currentEventObj.create().then(function(response){
			console.log("current event post created")
			console.log(response)
		})
	};
 
	$scope.reset = function() {
		$scope.currentEvent = angular.copy($scope.master);
	};
 
	$scope.reset();



}])