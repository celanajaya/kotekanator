app.directive('keyboard', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/visualizer/visualizer.html',
        controller: 'VIZCTRL'
    };
});


app.controller("KYBDCTRL", function($scope){

	var svgHeight = 500;
	var svgWidth = 1400;
	var barPadding = 1;
	var frequencyData = new Uint8Array(150);

	function createSvg(parent, height, width) {
		return d3.select(parent).append('svg').attr('height', height).attr('width', width);
	}
		
	var svg = createSvg('#graph', svgHeight, svgWidth);

	//render initial state for svg
	svg.selectAll('rect')
	   .data(frequencyData)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / frequencyData.length - barPadding)
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / frequencyData.length);
	   })

	//Create audio components
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	// var audioElement = document.getElementById('audioElement');
	// audioElement.crossOrigin = "anonymous";
	var audioSrc = audioCtx.createMediaElementSource(audioElement);
	var analyser = audioCtx.createAnalyser();

	// Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	//render audio components
	function renderChart() {

		//tells browser to run function again before repainting screen
	    requestAnimationFrame(renderChart);

	    // Copy frequency data to frequencyData array.
	    analyser.getByteFrequencyData(frequencyData);

	    // Update d3 chart with new data.
	    svg.selectAll('rect')
		    .data(frequencyData)
		    .attr('y', function(d) {
		       return svgHeight - d;
		    })
		    .attr('height', function(d) {
		    	if (d < 50) return 0;
		       	return d - 50;
		    })
		    .attr('fill', function(d) {
		       return 'rgb('+ d +', '+ d +', ' + d*2 + ')';
		    });
	}

	// Run the loop
	renderChart();
});