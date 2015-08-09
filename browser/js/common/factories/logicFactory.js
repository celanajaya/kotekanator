app.factory("logicFactory", function(){
	var telufunc = 	{
			move: function(arr) {
				var w = arr[0];
				var z = arr[1];
				var x, y;
				if (arr[0] > arr[1]) {
					y = arr[1] - 1;
					x = arr[1] - 2;
				} else {
					y = arr[1] + 1;
					x = arr[1] + 2;
				}
				return [x,y,z,x,y,z,x,y];
			},
			stay: function(arr) {
				var x = arr[0];
				var y = arr[0] + 1;
				var z = arr[0] + 2;
				return [x,y,z,x,z,y,x,z];
			}
		}

	return {

		norot: function(arr) {
			var x = arr[0];
			var y = arr[0] + 1;
			var z = arr[1];
			var w = arr[1] + 1;

			return [x,y,x,y,x,z,z,w];
		},

		telu: telufunc,

		empat: {
			move: function(arr) {
				var teluArr = telufunc.move(arr);
				for (var i = 0; i < teluArr.length; i++) {
					if (i % 3 === 2) teluArr[i] = [teluArr[i], teluArr[i] + 4];
				}
				return teluArr;
			},
			stay: function(arr) {
				var teluArr = telufunc.stay(arr);
				for (var i = 0; i < teluArr.length; i++) {
					if (i % 3 === 2) teluArr[i] = [teluArr[i], teluArr[i] + 4];
				}
				return teluArr;
			}
		},

		nyogCag: {
			move: function(arr) {
				var z = arr[0];
				var w, x, y;
				if (arr[0] > arr[1]) {
					y = arr[1] - 1;
					x = arr[1] - 2;
					w = arr[1] - 3;
				} else {
					y = arr[1] + 1;
					x = arr[1] + 2;
					w = arr[1] + 3;
				}
				var options = [[z,y,z,y,z,w,x,y], [z,y,z,x,y,w,x,y]];

				return options[Math.floor((Math.random() * 2) + 1)];
			},

			stay: function(arr) {
				var y = arr[0];
				var z = arr[0] + 1;
				var a = arr[0] + 2;
				var x = arr[0] - 1;
				var w = arr[0] - 2;

				var options = [[y,z,y,z,y,x,w,x], [y,z,a,z,y,x,w,x]];

				return options[Math.floor((Math.random() * 2) + 1)];
			}
		},

		bass: function(arr) {
			return arr[0];
		},

		gong: function() {
			return [1,3,2,1];
		}
	};

});