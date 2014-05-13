angular.module('bike.services')
  .factory('Bike', ['railsResourceFactory', '$cacheFactory', 'FilterService',
    function (railsResourceFactory, $cacheFactory, FilterService) {

      var bike = railsResourceFactory({
        url: '/bikes',
        name: 'bike'
      });

      bike.cache = $cacheFactory('bikesCache');

      bike.smartQuery = function (callback) {
        var self = this;
        var cachedBikes = this.cache.get("bikes");
        if (cachedBikes) {
          callback(cachedBikes);
        } else {
          this.query().then(function (data) {
            var bikes = _.map(data, function (b) {
              var attrs = [b.model, b.brand, b.year, b.kind, b.price, b.groupset, b.material];
              b.attrsString = _.map(attrs, function (attr) {
                return attr.toString().split(" ");
              }).join("").replace(/\s|,/g, '').toLowerCase();
              b.filterService = new FilterService(b);
              return b;
            });
            self.cache.put("bikes", bikes);
            callback(bikes);
          });
        }
      };

      bike.get = function (bikeId, callback) {
        var self = this;
        this.smartQuery(function (bikes) {
          var bike = _.detect(bikes, function (b) {
            return b.id == bikeId;
          });
          callback(bike);
        });
      };

      bike.clearCache = function (callback) {
        this.cache.remove("bikes");
        if (callback) callback();
      };
      return bike;
    }
  ])

.factory('BikeImages', ['railsResourceFactory',
  function (railsResourceFactory) {
    return railsResourceFactory({
      url: '/bikes/images',
      name: 'bike_images'
    });
  }
])
  .factory('FilterService', function () {

    var FilterService = function (bike) {
      var excludeTerms = ["with", "by", "and", "for", "the", "it", "by",
        "bike", "bikes", "brand", "brands", "model",
        "models", "speed", "kind", "type", "has", "more",
        "speeds", "has", "which", "whose", "year", "cost", "costs",
        "from", "less", "greater", "than", "that", "are",
        "dollars", "price", "is", "equals", "="
      ];
      this.excludeTermsString = excludeTerms.join("").replace(/\s|,/g, '').toLowerCase();
      this.attrsString = bike.attrsString;
      this.price = bike.price;
    };

    FilterService.prototype = {
      termMatches: function (term) {
        var termMatch = this.attrsString.indexOf(term) > -1;
        var excludeTermMatch = this.excludeTermsString.indexOf(term) > -1;
        return termMatch || excludeTermMatch;
      },


      allTermsMatch: function (filterTerms) {
        var self = this;
        return _.all(filterTerms, function (term) {
          var regMatch = self.termMatches(term),
            postMatch = self.termMatches(term.slice(0, -1)),
            preMatch = self.termMatches(term.slice(1));
          return regMatch || preMatch || postMatch;
        });
      },

      getPriceTermObj: function (filterTermsString) {
        var priceTerm = filterTermsString.match(/(\$\d+)|(\d+\s*dollars)/);
        if (priceTerm) {
          priceTerm = priceTerm[0].match(/\d+/)[0];
          var greaterRx = /(greater than)|(cost more than)|(more than)/;
          var greaterThan = (filterTermsString.match(greaterRx)) ? true : false;
          var lessThan = (filterTermsString.match(/(less than)/)) ? true : false;
          return {
            priceTerm: parseInt(priceTerm),
            greaterThan: greaterThan,
            lessThan: lessThan
          };
        } else {
          return false;
        }
      },

      priceMatches: function (priceTermObj) {
        if (!priceTermObj) return true;
        var bikePrice = this.price;
        var termPrice = priceTermObj.priceTerm;
        var match = (priceTermObj.greaterThan) ? (bikePrice > termPrice) : (bikePrice < termPrice);
        return match;
      },

      showBike: function (filterTermsString) {
        if (!filterTermsString) return true;
        var priceTermObj = this.getPriceTermObj(filterTermsString);
        if (priceTermObj) filterTermsString = filterTermsString.replace(priceTermObj.priceTerm, "");
        var filterTerms = filterTermsString.replace(/\$|,|=/g, '').toLowerCase().split(" ");
        return this.allTermsMatch(filterTerms) && this.priceMatches(priceTermObj);
      }
    };

    return FilterService;

  });