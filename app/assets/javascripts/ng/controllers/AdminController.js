angular.module('app').controller('AdminCtrl', ['$scope', '$http', '$routeParams', '$location','$resource', function($scope, $http, $routeParams, $location, $resource){
	
	$scope.adminLinks = [
		{ href: "#/used_bike_inventory/new", description: "Manage Used Bike Inventory"},
		{ href: "#/new_bike_inventory/new", description: "Manage New Bike Inventory"},
		{ href: "#/rentals/new", description: "View Rentals"},
		{ href: "#/current_events/new", description: "Create Current Event Post"},
		{ href: "", description: "View Reports"}

	]
	
}])