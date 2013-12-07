angular.module('bike.services', ['rails'])
angular.module('bike.controllers', ['ui.bootstrap'])
angular.module('bike.directives', [])
angular.module('bike', ['bike.services', 'bike.controllers', 'bike.directives'])

angular.module('inventory.services', ['rails'])
angular.module('inventory.controllers', [])
angular.module('inventory.directives', [])
angular.module('inventory', ['inventory.services', 'inventory.controllers', 'inventory.directives'])

angular.module('app.directives', [])
angular.module('app.filters', [])

angular.module('currentEvent.services', ['rails'])
angular.module('currentEvent.controllers', [])
angular.module('currentEvent.directives', [])
angular.module('currentEvent', ['currentEvent.services','currentEvent.controllers', 'currentEvent.directives'])

angular.module('usedBike.services', ['rails'])
angular.module('usedBike.controllers', ['ui.bootstrap'])
angular.module('usedBike.directives', [])
angular.module('usedBike', ['usedBike.services', 'usedBike.controllers', 'usedBike.directives'])

angular.module('rental.services', ['rails'])
angular.module('rental.controllers', ['ui.bootstrap'])
angular.module('rental.directives', [])
angular.module('rental', ['rental.services', 'rental.controllers', 'rental.directives'])

angular.module('customer.services', ['rails'])
angular.module('customer.controllers', ['ui.bootstrap'])
angular.module('customer', ['customer.services', 'customer.controllers'])

angular.module('app', ['ngResource', 'app.directives', 'app.filters', 'ui.date', 'bike', 'inventory', 'currentEvent', 'usedBike', 'rental', 'customer'])
	.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {
		$routeProvider
			.when('/bikes/:bikeId', {
				templateUrl: '/ng/views/bikes/show.html', 
				controller: 'BikesCtrl'
			})
			.when('/bikes', {
				templateUrl: '/ng/views/bikes/index.html', 
				controller: 'BikesCtrl'
			})
			.when('/used_bikes/new', {
				templateUrl: '/ng/views/used_bikes/new.html', 
				controller: 'UsedBikesCtrl'
			})
			.when('/inventory', {
				templateUrl: '/ng/views/inventory/index.html', 
				controller: 'InventoryCtrl'
			})
			.when('/home', {
				templateUrl: '/ng/views/home.html',
				controller: 'HomeCtrl'
			})
			.when('/current_events/new', {
				templateUrl: '/ng/views/current_events/new.html',
				controller: 'CurrentEventsCtrl'
			})
			.when('/rentals/new', {
				templateUrl: '/ng/views/rentals/new.html',
				controller: 'RentalsCtrl'
			})
			.otherwise({
					redirectTo: '/home'
			});
		}]
);