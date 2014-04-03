angular.module('customer.services')
  .factory('Customer', ['railsResourceFactory',
    function(railsResourceFactory) {
      return railsResourceFactory({
        url: '/customers',
        name: 'customer'
      });
    }
  ]);