app.directive('scoreEditor', function (ScoreEditor) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/score-editor/score-editor.html',
        link: function(){
        	stave.addClef("treble").setContext(ctx).draw();
        }
    };

});