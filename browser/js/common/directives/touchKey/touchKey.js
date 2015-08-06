app.directive('touchKey', function () {

    return {
        restrict: 'E',
        scope: {
        	numKeys: "=",
        	index: "@",
        	note: "@"
        },
        templateUrl: 'js/common/directives/touchKey/touchKey.html',
        controller: "tchkyCTRL"
    };

});

app.controller("tchkyCTRL", function($scope, synthFactory){
	$scope.width = 100 / $scope.numKeys;

	addEventListener("keydown", function(e){
		if (synthFactory.keyToId[e.keyCode]) console.log('yes!');
	});
});