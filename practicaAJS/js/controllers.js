angular.module("FinalApp")

.controller("mainController", ["$scope", "$resource", "postResource", function(s, r, pr){
	User = r("http://jsonplaceholder.typicode.com/users/:id", {id: "@id"});

	s.posts = pr.query();
	s.users = User.query();

	s.removePost = function(post){
		pr.delete({id: post.id}, function(data){
			console.log(data);
		});
		s.posts = s.posts.filter(function(element){
			return element.id !== post.id;
		});
	}

}])

.controller("postController", ["$scope", "$resource", "$routeParams", "postResource", "$location", function(s, r, p, pr, l){
	
	s.loading = false;
	s.title = "Edit Post";
	s.post = pr.get({id: p.id});

	s.savePost = function(){
		s.loading = true;
		pr.update({id: s.post.id}, {data: s.post}, function(data){
			s.loading = false;
			console.log(data);
			s.post = {};
		});

		l.path("/post/" + s.post.id);
	}

}])

.controller("newPostController", ["$scope", "$resource", "postResource", "$location", function(s, r, pr, l){
	
	s.loading = false;
	s.title = "Add new Post";
	s.post = {};

	s.savePost = function(){
		s.loading = true;
		pr.save({data: s.post}, function(data){
			s.loading = false;
			console.log(data);
			s.post = {};
		});

		l.path("/");
	}
}]);