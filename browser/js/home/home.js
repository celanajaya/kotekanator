app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "MAINCTRL"
    });

    $stateProvider.state('home.record', {
    	url: '/record',
    	templateUrl: 'js/home/record.html'
    });
});

app.controller("MAINCTRL", function($scope){
	$scope.tuning = "minor";
	$scope.synths = [];
	$scope.home = document.getElementsByClassName("home")[0];
	
	$scope.addSynth = function() {
		var el = document.createElement("keyboard");
		home.appendChild(el);
		$scope.synths.push(el);
	};
	
	$scope.removeSynth = function() {
		var home = document.getElementById("home");
		home.removeChild(home.childNodes[0]);
	}
})
