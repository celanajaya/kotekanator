app.directive('keyboard', function () {
    return {
        restrict: 'E',
        scope:{
        	tuning: "="
        },
        templateUrl: 'js/common/directives/keyboard/keyboard.html',
        controller: 'KYBDCTRL'
    };
});

app.controller("KYBDCTRL", function($scope, synthFactory){
	$scope._ = _;
	$scope.params = {
		isOn: true,
		numKeys: 15,
		octave: "1",
		tone: "sine",
		duration: "8n"
	};

	$scope.toggleOn = function() {
		$scope.params.isOn = !$scope.params.isOn;
	};

	$scope.synth = synthFactory.makeSynth();
	$scope.synth.play = synthFactory.play;

	window.addEventListener("keydown", function(e){
		var letterCode = e.keyCode.toString();
		var keyNum = synthFactory.keyToId[letterCode];
		if (keyNum && $scope.params.isOn) {
			var oct = parseInt($scope.params.octave);
			oct = keyNum < 7 ? oct : (oct + 1);
			if (synthFactory[$scope.tuning][keyNum]) {
				var note = synthFactory[$scope.tuning][keyNum] + oct;
				$scope.synth.voices.forEach(function(voice){
					voice.oscillator._oscillator._type = $scope.params.tone;
				});
				$scope.synth.play(note, $scope.params.duration);
			}
		}
	});
});

