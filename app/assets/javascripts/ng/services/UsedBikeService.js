angular.module('usedBike.services')
.factory('UsedBike', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/used_bikes', name: 'usedBike'});
}])