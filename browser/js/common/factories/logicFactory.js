app.factory("logicFactory", function(){
	var telufunc = 	{
			move: function(arr) {
				var w = arr[0];
				var z = arr[1];
				var x, y;
				if (arr[0] > arr[1]) {
					y = (arr[1] - 1) % 15;
					x = (arr[1] - 2) % 15;
				} else {
					y = (arr[1] + 1) % 15;
					x = (arr[1] + 2) % 15;
				}
				return [x,y,z,x,y,z,x,y];
			},
			stay: function(arr) {
				var x = arr[0];
				var	y = (arr[1] + 1) % 15;
				var	z = (arr[1] + 2) % 15;
				return [x,y,z,x,z,y,x,z];
			}
		};

	return {

		norot: function(arr) {
			var x = arr[0];
			var y = (arr[0] + 1) % 8;
			var z = arr[1];
			var w = (arr[1] + 1) % 8;

			return [x,y,x,y,x,z,z,w];
		},

		telu: telufunc,

		empat: {
			move: function(arr) {
				var teluArr = telufunc.move(arr);
				for (var i = 0; i < teluArr.length; i++) {
					if (i % 3 === 2) teluArr[i] = [teluArr[i], (teluArr[i] + 4) % 15];
				}
				return teluArr;
			},
			stay: function(arr) {
				var teluArr = telufunc.stay(arr);
				for (var i = 0; i < teluArr.length; i++) {
					if (i % 3 === 2) teluArr[i] = [teluArr[i], (teluArr[i] + 4) % 15];
				}
				return teluArr;
			}
		},

		nyogCag: {
			move: function(arr) {
				var z = arr[0];
				var w, x, y;
				if (arr[0] > arr[1]) {
					y = (arr[1] - 1) % 8;
					x = (arr[1] - 2) % 8;
					w = (arr[1] - 3) % 8;
				} else {
					y = (arr[1] + 1) % 8;
					x = (arr[1] + 2) % 8;
					w = (arr[1] + 3) % 8;
				}
				var options = [[z,y,z,y,z,w,x,y], [z,y,z,x,y,w,x,y]];

				return options[Math.floor((Math.random() * 2) + 1)];
			},

			stay: function(arr) {
				var y = arr[0];
				var z = (arr[0] + 1) % 8;
				var a = (arr[0] + 2) % 8;
				var x = (arr[0] - 1) % 8;
				var w = (arr[0] - 2) % 8;

				var options = [[y,z,y,z,y,x,w,x], [y,z,a,z,y,x,w,x]];

				return options[Math.floor((Math.random() * 2) + 1)];
			}
		},

		bass: function(arr) {
			return [arr[0],0,0,0];
		},

		gong: function() {
			return [arr[0],0,0,0];
		},

		padded: function(skel) {
			var arr = [];
			skel.forEach(function(note){
				arr.push(note, 0, 0, 0);
			});
			return arr;
		},

		arpeggiator: {
			move: function(arr) {
				var x = arr[0];
				var y = (arr[1] + 3) % 8;
				var z = (arr[1] + 5) % 8; 
				return [x,y,z,x,y,z,y,z];
			},
			stay: function(arr) {
				var x = arr[0];
				var y = (arr[1] + 3) % 8;
				var z = (arr[1] + 5) % 8;
				return [x,z,y,z,x,z,y,z]; 
			}
		},

		harmonizer: {
			move: function(arr) {
				var x = arr[0];
				var y = arr[0] + 3;
				var z = arr[0] + 5;
				return [[x,y,z]];
			},
			stay: function(arr) {
				var x = arr[0];
				var y = arr[0] + 3;
				var z = arr[0] + 5;
				return [[x,y,z]];
			}
		}
	};

});