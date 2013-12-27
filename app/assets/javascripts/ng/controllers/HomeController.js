angular.module('app').controller('HomeCtrl', ['$scope', '$http', '$routeParams', '$location','CurrentEvent', 'Bike','$resource', function($scope, $http, $routeParams, $location, CurrentEvent, Bike, $resource){
	
	CurrentEvent.query().then(function(data) {
		$scope.currentEvents = data
	})
	
	Bike.query().then(function(data) {
		$scope.bikes = data.slice(2, 7)
	})

	$(document).ready(function() {
		setTimeout(function() {
			var $firstPost = $('.current-event').first();
			$firstPost.addClass('double');
		}, 1000)
		
	})

	
}])