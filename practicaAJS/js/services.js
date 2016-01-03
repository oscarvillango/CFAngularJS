angular.module("FinalApp")

.factory("postResource", ["$resource", function(r){
	return r("http://jsonplaceholder.typicode.com/posts/:id", {id: "@id"}, {update: {method: "PUT"}});
}]);