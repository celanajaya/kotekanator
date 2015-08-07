app.directive('keyboard', function () {
    return {
        restrict: 'E',
        scope:{
        	tuning: "=",
        	filter: "=",
        	isRecording: "="
        },
        templateUrl: 'js/common/directives/keyboard/keyboard.html',
        controller: 'KYBDCTRL'
    };
});

app.controller("KYBDCTRL", function($scope, synthFactory, logicFactory){
	$scope._ = _;
	$scope.isOn = true;
	$scope.numKeys = 15;
	$scope.octaves = ['1','2','3','4','5','6'];
	$scope.octave = '2';
	$scope.tone = "sine";
	$scope.duration = "4n";
	$scope.instrumentType = "keys";
	$scope.attack = '0.25';
	$scope.attackTypes = ['0', '0.25', '0.5', '0.75', '1'];
	$scope.key = "key";
	$scope.oscTypes = synthFactory.oscTypes;
	$scope.durations = synthFactory.durations;
	$scope.instrumentTypes = synthFactory.instrumentTypes;
	$scope.width = 100 / $scope.numKeys;
	$scope.current = [0,0];
	console.log($scope.isRecording);

	$scope.toggleOn = function() {
		$scope.isOn = !$scope.isOn;
	};

	$scope.iscurrentKey = function(num) {
		return num === $scope.current[0];
	};

	$scope.synth = new Tone.PolySynth(2, Tone.MonoSynth).toMaster();

	//synthFactor.params order: octave, range, oscillator, duration
	$scope.changeInstrument = function(inst) {
		_.forOwn(synthFactory.params, function(value, key){
			if (key === inst) {
				$scope.octave = value[0];
				$scope.numKeys = parseInt(value[1]); 
				$scope.tone = value[2];
				$scope.duration = value[3];
				$scope.key = value[4];
			}
		});
	};

	$scope.play = function(keyArr) {
		if (keyArr[0] && $scope.isOn) {
			var oct = parseInt($scope.octave);
			oct = keyArr[0] < 7 ? oct : (oct + 1);

			//convert current notes to musical letters
			if (synthFactory[$scope.tuning][keyArr[0]]) {
				var keyArr2 = [];
				keyArr2[0] = synthFactory[$scope.tuning][keyArr[0]] + oct;
				keyArr2[1] = synthFactory[$scope.tuning][keyArr[1]] ? synthFactory[$scope.tuning][keyArr[1]] + oct : keyArr[0];

				$scope.synth.set(
					{"oscillator": {"type": $scope.tone}}, 
					{"filter": {"type": $scope.filter}},
					{"envelope": {"attack": $scope.attack}}
				);

				$scope.synth.triggerAttackRelease(keyArr2, $scope.duration);
			}
		}
	};

	window.addEventListener("keydown", function(e){
		var letterCode = e.keyCode.toString();
		var keyNum1 = synthFactory.keyToId[letterCode];
		if ($scope.isRecording) logicFactory.pokok.push(keyNum1);
		var keyNum2 = (keyNum1 + 5) % 15;
		$scope.current = [keyNum1, keyNum2];
		$scope.play($scope.current);
		$scope.$digest();
	});

	window.addEventListener('keyup', function(){
		$scope.current = [];
		$scope.$digest();
	});

	window.addEventListener("mousedown", function(e){
		var keyNum1 = parseInt(e.srcElement.id);
		var keyNum2 = (keyNum1 + 5) % 15;
		if ($scope.isRecording) logicFactory.pokok.push(keyNum1);
		$scope.current = [keyNum1, keyNum2];
		$scope.play($scope.current);
		$scope.$digest();
	});

	window.addEventListener("mouseup", function(e){
		$scope.current = [];
		$scope.$digest();
	});
});

