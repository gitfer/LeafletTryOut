angular.module('tryout', []).controller('MyController', ['$scope', '$http', function($scope, $http){
	$scope.comuneInserito = 'ZONE';
	$scope.interroga = function(){
		$http.get('/comuni?name='+$scope.comuneInserito, function(err){}).success(function(data){
			console.log(data[0]);
			L.geoJson(data[0]).addTo(map);
		});
	};

}]);
