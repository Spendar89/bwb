angular.module('bike.services')
.factory('Bike', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/bikes', name: 'bike'});
}])
.factory('BikeImages', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory({url: '/bikes/images', name: 'bike_images'});
}])
.factory('FilterService', function() {
	var FilterObj = {}
	
	FilterObj.filter = function(bike, filterTerms){
		var excludeTerms = ["with", "by", "and", "for", "the", "it", "by", 
		"bike", "bikes", "brand", "brands", "model", 
		"models", "speed", "kind", "type", "has", 
		"speeds", "has", "which", "whose", "year", 
		"from", "less", "greater", "than", "that", "are", "dollars"]
		var matches = function(attr_array){
			var hasTerm = true;
			
			var numValid = _.filter(attr_array, function(attr){
				var counter = 0
				var attr = attr.toString().toLowerCase();
				
				
				var termsArray = filterTerms.split(" ")
				
				_.each(termsArray, function(filterTerm){
					
					var inPriceRange = function(bikePrice){
						var isPriceAttr = (bikePrice > 0 && !(bikePrice > 2004 && bikePrice < 2015))						
						var termIndex = termsArray.indexOf("greater")
						if(termIndex == -1 || !isPriceAttr) return null
						if(termsArray.indexOf("than") == (termIndex + 1)){							
							var greaterTerm = parseInt(termsArray[termIndex + 2])
						}		
						return (bikePrice > greaterTerm)
					}
					
					
					if((attr == filterTerm.toLowerCase()) || (inPriceRange(attr) == true)){
						hasTerm = true
						counter -= 2
						alert("hey")
					}else if(!(attr == filterTerm.toLowerCase()) && !(excludeTerms.indexOf(filterTerm) > -1)){
						hasTerm = false
						counter += 1
					}else if (inPriceRange(attr) == false){
						hasTerm = false
						counter += 1
					}
					
				})
				counter == 0
			});
			return numValid > 0
		}
	
		if(filterTerms && filterTerms.length > 2){
			var attr_array = [bike.model, bike.brand, bike.year, bike.kind, bike.price, bike.groupset, bike.material]
			return matches(attr_array); 
		}else{
			return true
		}
	}
	
	return FilterObj
	
})
