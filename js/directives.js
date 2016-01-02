/* ng-Route in AngularJS */

angular.module("ngRouteApp")

.directive("backImg", function(){
	return function(scope, element, attrs){
		attrs.$observe("backImg", function(value){
			element.css({
				"background": "url("+ value +")",
				"background-position": "center",
				"background-size": "cover"
			});
		});
	}
})

.directive("myAutocomplete", function(){
	function link(scope, element, attrs){
		jQuery(element).autocomplete({
			source: scope.$eval(attrs.myAutocomplete),
			select: function(ev, ui){
				ev.preventDefault();
				if(ui.item){
					scope.optionSelected(ui.item.value);
				}
			},
			focus: function(ev, ui){
				ev.preventDefault();
				jQuery(this).val(ui.item.label);
			}
		});
	};
	return {
		link: link
	};
});