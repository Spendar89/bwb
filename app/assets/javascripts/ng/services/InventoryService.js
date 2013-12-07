angular.module('inventory.services').factory('Inventory', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/bike_inventories', name: 'inventory'});
}]);
