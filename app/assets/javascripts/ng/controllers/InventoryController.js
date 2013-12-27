angular.module('inventory.controllers').controller('InventoryCtrl', ['$scope', '$http', '$routeParams', '$location','Inventory', 'Bike', '$resource', '$timeout', '$anchorScroll', function($scope, $http, $routeParams, $location, Inventory, Bike, $resource, $timeout, $anchorScroll){

	$scope.order="bike.brand"

	$scope.locationNames = ["Bethesda", "Georgetown", "Old Town", "Arlington", "Potomac"]

	$scope.disableBtn = false;

	$scope.showNumber = 50;
	
	Inventory.query().then(function(response){
		$scope.inventories = response
	})

	Bike.query().then(function(response){
		$scope.bikes = response
		$scope.bikeBrands = _.uniq($scope.bikes.map(function(bike){
			return bike.brand
		}))

		$scope.bikeModels = function(brand){
			var bikes = $scope.bikes.filter(function(bike){
				return bike.brand == brand
			})
			return window.bikeModels = bikes.map(function(bike){
				return { model: bike.model, id: bike.id }
			})
		}
	})
	
	$scope.getStockNumber = function(id){
		if (id<=999999) id = ("00000"+id).slice(-6)
			return id;
	};

	$scope.create = function(inventory) {
		var invObj = new Inventory(inventory)
		invObj.create().then(function(response) {
			$scope.inventoryAdded = response.success;
		});
	};

	$scope.update = function(inventory) {
		var invObj = new Inventory(inventory)
		invObj.update().then(function(response){
			inventory.editing = false;
		});
	};

	$scope.makeTransfer = function() {
		var filteredTransfers = _.filter($scope.inventories, function(inv) {
			return inv.transfer;
		})

		var transfers = _.map(filteredTransfers, function(inv) {
			return inv.id
		})

		console.log(transfers)

		$scope.transferLocation = "Bethesda"

		Inventory.$post("bike_inventories/transfer", { inventory: transfers, location: $scope.transferLocation }).then(function(response) {
			console.log(response)
			$scope.transferSuccess = true;
		})
	}


	$scope.gotoBottom = function (){
    	// set the location.hash to the id of
    	// the element you wish to scroll to.
    	$location.hash('bottom');

    	// call $anchorScroll()
    	$anchorScroll();
    }

}])



