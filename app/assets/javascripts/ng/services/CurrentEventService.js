angular.module('currentEvent.services').factory('CurrentEvent', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/current_events', name: 'currentEvent'});
}])