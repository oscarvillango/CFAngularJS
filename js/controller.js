/* First App AngularJS */

var app = angular.module("MyFirstApp", []);

app.controller("firstController", function($scope){
	$scope.nombre = "Oscar";
});


/* ng-Model */
var app = angular.module("NgModelApp", []);

app.controller("ngmFirstController", function($scope){
	$scope.nombre = "Oscar";
	$scope.nuevoComentario = {};
	$scope.comentarios = [
		{
			comentario : "Primer comentario",
			usuario : "User 1"
		},
		{
			comentario : "Segundo comentario",
			usuario : "User 2"
		}
	];

	$scope.agregarComentario = function(){
		$scope.comentarios.push($scope.nuevoComentario);
		$scope.nuevoComentario = {};
	}
});

/* Dependency Inyection */

var appDI = angular.module("DIApp", []);

appDI.controller("depInyFirstController", ["$scope", function(m){
	m.nombre = "Oscar";
	m.nuevoComentario = {};
	m.comentarios = [
		{
			comentario : "Primer comentario",
			usuario : "User 1"
		},
		{
			comentario : "Segundo comentario",
			usuario : "User 2"
		}
	];

	m.agregarComentario = function(){
		m.comentarios.push(m.nuevoComentario);
		m.nuevoComentario = {};
	}
}]);

/* Ajax in AngularJS */

var ajaxApp = angular.module("ajaxApp", []);

ajaxApp.controller("ajaxController", ["$scope", "$http", function(m, h){
	m.posts = [];
	h.get("http://jsonplaceholder.typicode.com/posts")
		.success(function(data){
			console.log(data);
			m.posts = data;
		})
		.error(function(err){
			console.log(err);
		});

}]);

/* Ajax - Post in AngularJS */

var ajaxPostApp = angular.module("ajaxPostApp", []);

ajaxPostApp.controller("ajaxPostController", ["$scope", "$http", function(m, h){
	m.posts = [];
	m.newPost = {};
	h.get("http://jsonplaceholder.typicode.com/posts")
		.success(function(data){
			console.log(data);
			m.posts = data;
		})
		.error(function(err){
			console.log(err);
		});

	m.addPost = function(){
		h.post("http://jsonplaceholder.typicode.com/posts", {
			title: m.newPost.title,
			body: m.newPost.body,
			userId: 1
		})
		.success(function(data, status, headers, config){
			m.posts.push(m.newPost);
			console.log(data);
			m.newPost = {};
		})
		.error(function(err){
			console.log(err);
		});
	}
}]);

/* To do list example in AngularJS */

var toDoApp = angular.module("toDoApp", ["LocalStorageModule"]);

toDoApp.controller("toDoController", ["$scope", "localStorageService", function(m, l){
	
	if(l.get("toDoList")){
		m.toDo = l.get("toDoList");		
	}else{
		m.toDo = [];
	}

	m.newActv = {};

	/*
		{
			descripcion: "Terminar el curso",
			fecha: "01-01-16 6:00pm"
		}
	*/

	m.$watchCollection("toDo", function(newValue, oldValue){
		l.set("toDoList", m.toDo);
	});

	m.addActividad = function(){
		m.toDo.push(m.newActv);
		m.newActv = {};
	}

	m.clearAct = function(){
		m.toDo = [];
	}

}]);

/* Filters example in AngularJS */

var filtersApp = angular.module("filtersApp", []);

filtersApp.filter("removeHTML", function(){
	return function(texto){
		return String(texto).replace(/<[^>]+>/gm, "");
	}
});

filtersApp.controller("filtersController", ["$scope", function(m){
	
	m.textHTML = "<p>Hola Mundo!</p>";

	m.jsonEx = {};
	m.jsonEx.title = "Titulo";
	m.jsonEx.body = "Cuerpo del mensaje";

	m.price = 3000;

}]);

/* Filters example in AngularJS */

var wapdiApp = angular.module("wapdiApp", []);

wapdiApp.controller("wapdiController", ["$scope", function(m){
	
	m.nombre = "Oscar";

	/*setTimeout(function(){
		//m.$digest();
		m.$apply(function(){
			m.nombre = "Prueba";
		});
		console.log(m.nombre);
	}, 2000);*/

	document.querySelector("#change-name").addEventListener("click", function(){
		/*m.nombre = "Prueba boton";
		console.log(m.nombre);*/
		m.$apply(function(){
			m.nombre = "Prueba";
		});
	});

}]);

/* ng Hide - Show in AngularJS */

var ngHSApp = angular.module("ngHSApp", []);

ngHSApp.controller("ngHSController", ["$scope", "$http", function(m, h){
	m.posts = [];
	m.loading = true;
	h.get("http://jsonplaceholder.typicode.com/posts")
		.success(function(data){
			console.log(data);
			m.posts = data;
			m.loading = false;
		})
		.error(function(err){
			console.log(err);
			m.loading = false;
		});

}]);

/* rootScope and Child in AngularJS */

var rootScopeChildApp = angular.module("rootScopeChildApp", []);

rootScopeChildApp.run(function($rootScope){
	$rootScope.nombre = "Oscar Villafuerte";
});

rootScopeChildApp.controller("rootScopeChildController", ["$scope", function(m){
	m.nombre = "Tracy Villafuerte";
	setTimeout(function(){
		m.$apply(function(){
			m.nombre = "Fiorella Villafuerte";
		});
	}, 1000);
}]);

rootScopeChildApp.controller("childController",["$scope", function(s){

}]);

/* Factories in AngularJS */

var factoriesApp = angular.module("factoriesApp", ["LocalStorageModule"]);

factoriesApp.factory("toDoService", ["localStorageService", function(l){
	var toDoService = {};

	toDoService.key = "toDoList";

	if(l.get(toDoService.key)){
		toDoService.toDo = l.get(toDoService.key);
	}else{
		toDoService.toDo = [];
	}

	toDoService.add = function(newActv){
		toDoService.toDo.push(newActv);
		toDoService.updateLocalStorage();
	}

	toDoService.updateLocalStorage = function(){
		l.set(toDoService.key, toDoService.toDo);
	}

	toDoService.clear = function(){
		toDoService.toDo = [];
		toDoService.updateLocalStorage();
		return toDoService.getActivities();	
	}

	toDoService.getActivities = function(){
		return toDoService.toDo;
	}

	toDoService.removeItem = function(item){
		toDoService.toDo = toDoService.toDo.filter(function(activity){
			return activity != item;
		});
		toDoService.updateLocalStorage();
		return toDoService.getActivities();	
	}

	return toDoService;
}]);

factoriesApp.controller("factoriesController", ["$scope", "toDoService", function(m, t){


	m.newActv = {};
	m.toDo = t.getActivities();

	m.addActividad = function(){
		t.add(m.newActv);
		m.newActv = {};
	}

	m.removeActv = function(item){
		m.toDo = t.removeItem(item);
	}

	m.clearAct = function(){
		m.toDo = t.clear();
	}

}]);

/* Services in AngularJS */

var servicesApp = angular.module("servicesApp", ["LocalStorageModule"]);

servicesApp.service("toDoService", ["localStorageService", function(l){
	
	this.key = "toDoList";

	if(l.get(this.key)){
		this.toDo = l.get(this.key);
	}else{
		this.toDo = [];
	}

	this.add = function(newActv){
		this.toDo.push(newActv);
		this.updateLocalStorage();
	}

	this.updateLocalStorage = function(){
		l.set(this.key, this.toDo);
	}

	this.clear = function(){
		this.toDo = [];
		this.updateLocalStorage();
		return this.getActivities();	
	}

	this.getActivities = function(){
		return this.toDo;
	}

	this.removeItem = function(item){
		this.toDo = this.toDo.filter(function(activity){
			return activity != item;
		});
		this.updateLocalStorage();
		return this.getActivities();	
	}
}]);

servicesApp.controller("servicesController", ["$scope", "toDoService", function(m, t){


	m.newActv = {};
	m.toDo = t.getActivities();

	m.addActividad = function(){
		t.add(m.newActv);
		m.newActv = {};
	}

	m.removeActv = function(item){
		m.toDo = t.removeItem(item);
	}

	m.clearAct = function(){
		m.toDo = t.clear();
	}

}]);