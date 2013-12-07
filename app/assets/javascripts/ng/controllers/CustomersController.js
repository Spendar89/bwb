angular.module('customer.controllers').controller('CustomersCtrl', ['$scope', '$http', '$routeParams', '$location', 'Customer', '$resource', function($scope, $http, $routeParams, $location, Customer, $resource){
	
	$scope.create = function(customer) {
		var customerObj = new Customer(customer)		
		customerObj.create().then(function(response){
			$scope.customer.id = response.customerId;
			var pos = $('#store-step').show().offset();
			$('body').animate({ scrollTop: (pos.top) });
		})
	};
	
}])

