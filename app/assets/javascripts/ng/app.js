angular.module('product.services', ['rails']);
angular.module('product.controllers', ['ui.bootstrap']);
angular.module('product.directives', []);
angular.module('product', ['product.services', 'product.controllers', 'product.directives']);

angular.module('inventory.services', ['rails']);
angular.module('inventory.controllers', []);
angular.module('inventory.directives', []);
angular.module('inventory', ['inventory.services', 'inventory.controllers', 'inventory.directives']);

angular.module('app.directives', []);
angular.module('app.filters', []);

angular.module('currentEvent.services', ['rails']);
angular.module('currentEvent.controllers', []);
angular.module('currentEvent.directives', []);
angular.module('currentEvent', ['currentEvent.services','currentEvent.controllers', 'currentEvent.directives']);

angular.module('usedBike.services', ['rails']);
angular.module('usedBike.controllers', ['ui.bootstrap']);
angular.module('usedBike.directives', []);
angular.module('usedBike', ['usedBike.services', 'usedBike.controllers', 'usedBike.directives']);

angular.module('rental.services', ['rails']);
angular.module('rental.controllers', ['ui.bootstrap']);
angular.module('rental.directives', []);
angular.module('rental', ['rental.services', 'rental.controllers', 'rental.directives']);

angular.module('customer.services', ['rails']);
angular.module('customer.controllers', ['ui.bootstrap']);
angular.module('customer', ['customer.services', 'customer.controllers']);

angular.module('store.services', ['rails']);
angular.module('store.controllers', ['ui.bootstrap']);
angular.module('store', ['store.services', 'store.controllers']);

angular.module('repairs.services', []);
angular.module('repairs.controllers', []);
angular.module('repairs', ['repairs.services', 'repairs.controllers']);

angular.module('app', ['ngResource', 'ngRoute', 'app.directives', 'app.filters', 'ui.date', 'bike', 'inventory', 'currentEvent', 'usedBike', 'rental', 'customer', 'store', 'repairs'])
.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {
	$routeProvider
	.when('/bikes/new', {
		templateUrl: '/ng/views/bikes/new.html',
		controller: 'ProductCtrl'
	})
	.when('/bikes/:bikeId', {
		templateUrl: '/ng/views/bikes/show.html'
	})
	.when('/bikes', {
		templateUrl: '/ng/views/bikes/index.html',
	})
	.when('/used_bike_inventory/new', {
		templateUrl: '/ng/views/used_bikes/new.html',
		controller: 'UsedBikesCtrl'
	})
	.when('/used_bikes', {
		templateUrl: '/ng/views/used_bikes/index.html',
		controller: 'UsedBikesCtrl'
	})
	.when('/inventory', {
		templateUrl: '/ng/views/inventory/index.html',
		controller: 'InventoryCtrl'
	})
	.when('/new_bike_inventory/new', {
		templateUrl: '/ng/views/inventory/new.html',
		controller: 'InventoryCtrl'
	})
	.when('/current_events/new', {
		templateUrl: '/ng/views/current_events/new.html',
		controller: 'CurrentEventsCtrl'
	})
	.when('/rentals/new', {
		templateUrl: '/ng/views/rentals/new.html',
		controller: 'RentalsCtrl'
	})
	.when('/stores', {
		templateUrl: '/ng/views/stores/index.html'
	})
	.when('/home', {
		templateUrl: '/ng/views/home.html'
	})
	.when('/admin', {
		templateUrl: '/ng/views/admin.html',
		controller: 'AdminCtrl'
	})
	.when('/repairs', {
		templateUrl: '/ng/views/repairs.html'
	})
	.otherwise({
		redirectTo: '/home'
	});
}]
);

