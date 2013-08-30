angular.module('tryout', []).controller('MyController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	$scope.comuneInserito = 'ZONE';
	$scope.PuntoSelezionato = 'Coordinate selezionate:';
	$scope.Raggio = 500;
	$scope.interroga = function(){
		$http.get('/comuni?name='+$filter('uppercase')($scope.comuneInserito), function(err){}).success(function(data){
			console.log(data[0]);
			L.geoJson(data[0],{
				onEachFeature: function (feature, layer) {
					layer.bindPopup(feature.properties.name);
				}
			}).addTo(map);

		});
	};
	map.on('click', function(e){
		console.log(e.latlng);
		popup.setLatLng(e.latlng).setContent('<p>Hai cliccato a <strong>'+e.latlng.toString()+'</strong></p>').openOn(map);
		$scope.$apply(function(){
			$scope.PuntoSelezionato = "Coordinate selezionate: latitudine " + e.latlng.lat + " longitudine " +e.latlng.lng;
			console.log($scope.Raggio);
			var circle = L.circle([e.latlng.lat, e.latlng.lng], $scope.Raggio, {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5
			}).addTo(map);
		});
	});
}]);
