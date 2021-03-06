// public/core.js
// var app = angular.module('app', []);
var app = angular.module('app', []);

app.factory('socket', function($rootScope){ 
    var socket = io.connect(); 
    return{ 
        on: function(eventName, callback){ 
            socket.on(eventName, function(){ 
                var args = arguments; 
                $rootScope.$apply(function(){ 
                    callback.apply(socket, args); 
                }); 
            }); 
        }, 
        emit: function(eventName, data, callback){ 
            socket.emit(eventName, data, function(){ 
                var args = arguments; 
                $rootScope.$apply(function(){ 
                    if(callback){ 
                        callback.apply(socket.args); 
                    } 
                }); 
            }) 
        } 
    }; 
}); 


function mainController($scope, $http, socket) {
	$scope.formData = {};

	$scope.initialize = function() {
		$scope.formData.search = "";
		$scope.check = false;
		
		console.log("initialize() body !");
	};

	$scope.search = function() {
		
		socket.on('number', function (data) {
			$scope.number = data.numberOfFiles;
			$scope.check = data.check;
		});

		console.log("search() body !");
		$scope.check = true;
		$http.post('/search', $scope.formData)
			.success(function() {
				$('input').val('');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.xmlConvert = function() {
		
		$http.post('/xmlconvert', $scope.formData)
			.success(function() {})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.jsonConvert = function() {
		
		$http.post('/jsonconvert', $scope.formData)
			.success(function() {})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}

