/* ng-Route in AngularJS */

angular.module("ngRouteApp")

.controller("ngRouteController", ["$scope", "$http", function(s, h){
	s.repos = [];

	h.get("https://api.github.com/users/twitter/repos")
		.success(function(data){
			s.posts = data;
			for(var i = data.length -1; i >= 0; i-- ){
				var repo = data[i];
				s.repos.push(repo.name);
			}
		})
		.error(function(err){
			console.log(err);
		});

	s.optionSelected = function(data){
		s.$apply(function(){
			s.main_repo = data;
		});
	}
}])
.controller("repoController", ["$scope", "$http", "$routeParams", function(s, h, r){
	s.repo = {};

	h.get("https://api.github.com/repos/twitter/" + r.name)
		.success(function(data){
			s.repo = data;
		})
		.error(function(err){
			console.log(err);
		});
}])
;