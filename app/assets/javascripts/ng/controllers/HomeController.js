angular.module('app').controller('HomeCtrl', ['$scope', '$http', '$routeParams', '$location','CurrentEvent', 'Bike','$resource', function($scope, $http, $routeParams, $location, CurrentEvent, Bike, $resource){
	
	CurrentEvent.query().then(function(data) {
		$scope.currentEvents = data
		console.log(	$scope.currentEvents)
	})
	
	Bike.query().then(function(data) {
		$scope.bikes = data.slice(2, 7)
	})

	
}])