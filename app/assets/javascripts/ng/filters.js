angular.module('app.filters', [])
.filter('time', function($filter) {
	return function(arr) {
		return arr.map(function(n){
			return (n <= 12 ? n + ':00 AM' : n - 12 + ':00 PM')
		});
	};
});