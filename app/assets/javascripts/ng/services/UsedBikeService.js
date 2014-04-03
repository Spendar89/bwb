angular.module('usedBike.services')
  .factory('UsedBike', ['railsResourceFactory', '$cacheFactory',
    function(railsResourceFactory, $cacheFactory) {
      var usedBike = railsResourceFactory({
        url: '/used_bikes',
        name: 'usedBike'
      });

      usedBike.cache = $cacheFactory('usedBikes');

      usedBike.smartQuery = function(store, callback) {
        var self = this;
        var storeId = (store) ? store.id : undefined;
        var cachedUsedBikes = this.cache.get("usedBikes");
        if (cachedUsedBikes) {
          if (storeId) {
            cachedUsedBikes = _.filter(cachedUsedBikes, function(usedBike) {
              return usedBike.storeId == storeId;
            });
          }
          callback(cachedUsedBikes);
        } else {
          this.query().then(function(data) {
            self.cache.put("usedBikes", data);
            if (storeId) {
              self.smartQuery(storeId, callback);
            } else {
              callback(data);
            }
          });
        }
      };
      return usedBike;
    }
  ]);