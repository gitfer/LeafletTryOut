angular.module('tryout', []).controller('MyController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	$scope.comuneInserito = 'ZONE';
	$scope.interroga = function(){
		$http.get('/comuni?name='+$filter('uppercase')($scope.comuneInserito), function(err){}).success(function(data){
			console.log(data[0]);
			L.geoJson(data[0]).addTo(map);
		});
	};

}]);
