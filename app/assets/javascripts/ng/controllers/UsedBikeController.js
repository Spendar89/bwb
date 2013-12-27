
angular.module('usedBike.controllers').controller('UsedBikesCtrl', ['$scope', '$http', '$routeParams', '$location','UsedBike','$resource', function($scope, $http, $routeParams, $location, UsedBike, $resource){
	// $scope.location = ($routeParams.location || "Bethesda");


	

	$scope.location = "Bethesda"

	$scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"]

	// $scope.$watch($scope.location, function() {
	// 	$scope.getUsedInventory()
	// })
	
	$scope.create = function(usedBike) {
		usedBike.location = $scope.location
		$scope.master = angular.copy(usedBike);		
		var usedBikeObj = new UsedBike(usedBike)
		console.log(usedBikeObj)
		
		usedBikeObj.create().then(function(response){
			$scope.getUsedInventory();
		})
	};

	$scope.update = function(usedBike) {
		usedBike.location = $scope.location || usedBike.location
		$scope.master = angular.copy(usedBike);		
		var usedBikeObj = new UsedBike(usedBike)
		usedBikeObj.update().then(function(response){
			usedBike.editing = false;
		})
	};

	$scope.order="brand"


	$scope.getUsedInventory = function() {
		if(!$scope.location) return $scope.usedInv = []
		
		return UsedBike.query({location: $scope.location }).then(function(response) {
			console.log(response)
			$scope.usedInv = response;
		})
	}

	$scope.getStockNumber = function(id){
		if (id<=999999) id = ("00000"+id).slice(-6)
			return id;
	}

	$scope.getUsedInventory()

}])