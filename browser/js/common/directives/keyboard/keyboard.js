app.directive('keyboard', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/keyboard/keyboard.html',
        controller: 'KYBDCTRL'
    };
});

app.controller("KYBDCTRL", function($scope, synthFactory, logicFactory){
	$scope._ = _;
	$scope.isOn = true;
	$scope.numKeys = 15;
	$scope.octaves = ['1','2','3','4','5','6'];
	$scope.octave = '3';
	$scope.tone = "sawtooth";
	$scope.duration = "16n";
	$scope.instrumentType = "keys";
	$scope.attack = '0.25';
	$scope.attackTypes = ['0', '0.25', '0.5', '0.75', '1'];
	$scope.key = "key";
	$scope.oscTypes = synthFactory.oscTypes;
	$scope.durations = synthFactory.durations;
	$scope.instrumentTypes = synthFactory.instrumentTypes;
	$scope.width = 100 / $scope.numKeys;
	$scope.current = [0,0];
	$scope.behaviors = ["norot", "telu", "empat", "nyogCag"];
	$scope.behavior = 'norot';

	$scope.toggleOn = function() {
		$scope.isOn = !$scope.isOn;
	};

	$scope.isCurrentKey = function(num) {
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

	//converting the $scope.skeleton into an array of arrays with each pair of notes, then ready for logic functions
	$scope.parsedSkel = function() {
		var parsed = $scope.skeleton.filter(function(note, index){
			if (index % 5 === 0) return note;
		});

		return parsed.map(function(note, index){
			if (parsed[index + 1]) return [note, parsed[index + 1]];
			else return [note, note];
		});
	};

	//convert an array of key numbers to a musical note (ie "1" to "C4")
	$scope.getElabNotes = function(arr) {
		if (Array.isArray(arr)) {
			return arr.map(function(num){
				var oct = parseInt($scope.octave);
				oct = num < 7 ? oct : (oct + 1);
				return synthFactory[$scope.tuning][num] + oct;
			});
		}
	};

	//take an array of skeleton tones and apply behaviors to them, returns an array of 
	//musical notes
	$scope.getElaborations = function(arr) {
		var elab = arr.map(function(arr){
			//call gongify and transport the array mapped to the tuning
			if ($scope.instrumentType === "gong") return logicFactory.gong(arr);
			//call jegogify and transport the array mapped to the tuning
			if ($scope.instrumentType === "bass") return logicFactory.bass(arr);
			if ($scope.behavior === "norot") return logicFactory.norot(arr);
			if (arr[0] === arr[1]) return logicFactory[$scope.behavior]["move"](arr);
			else return logicFactory[$scope.behavior]["stay"](arr);
		});
		
		//convert to musical note names
		return elab.map(function(arr){
			return $scope.getElabNotes(arr);
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
		if ($scope.isRecording && keyNum1) $scope.skeleton.push(keyNum1);
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
		if ($scope.isOn) {
			if ($scope.isNotPlaying) {
				var keyNum1 = parseInt(e.srcElement.id);
				var keyNum2 = (keyNum1 + 5) % 15;
				$scope.current = [keyNum1, keyNum2];
				$scope.play($scope.current);
				$scope.$digest();
			} 
			else {
				if ($scope.skeleton.length) {
					$scope.getElaborations($scope.parsedSkel()).forEach(function(notes){
						synthFactory.setSequence(notes, $scope.duration, $scope.synth);
					});
					Tone.Transport.start();
				}
			}
		}
	});

	window.addEventListener("mouseup", function(e){
		$scope.current = [];
		$scope.$digest();
	});
});

