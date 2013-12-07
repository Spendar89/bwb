angular.module('usedBike.controllers').controller('UsedBikesCtrl', ['$scope', '$http', '$routeParams', '$location','UsedBike','$resource', function($scope, $http, $routeParams, $location, UsedBike, $resource){

	$scope.create = function(usedBike) {
		$scope.master = angular.copy(usedBike);		
		var usedBikeObj = new UsedBike(usedBike)
		
		usedBikeObj.create().then(function(response){
			console.log("used bike created")
			console.log(response)
		})
	};
}])