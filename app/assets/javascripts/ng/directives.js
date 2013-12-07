angular.module('app.directives')
	.directive('bikeradio', function(){
		return {
			restrict: 'A',
			link: function($scope, elem, attr) {
				elem.bind('click', function(){
					$(this).siblings('.selected').removeClass('selected')
					$(this).addClass('selected')
				})
			}
		}
	})
	.directive('ngMax', function(){
		return {
			restrict: 'A',
			link: function($scope, elem, attrs) {
				$scope.$watch(attrs.ngModel, function(){
					var maxQuant = parseInt(attrs.ngMax)
					var quant = elem.val();
					var valid = (maxQuant >= quant && quant >= 0)
					if(!valid && quant){
						elem.removeClass('ng-valid').addClass('ng-invalid')
					}else{
						elem.removeClass('ng-invalid').addClass('ng-valid')
					}
				});
			}
		}
	})