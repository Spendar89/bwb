angular.module('inventory.controllers').controller('InventoryCtrl', ['$scope', '$http', '$routeParams', '$location','Inventory','$resource', function($scope, $http, $routeParams, $location, Inventory, $resource){
	
	$scope.order="bike.brand"
	
	
	Inventory.query().then(function(response){
		$scope.inventories = response
	})
	
	$scope.getStockNumber = function(id){
		if (id<=999999) id = ("00000"+id).slice(-6)
		return id;
	}
	
}])

