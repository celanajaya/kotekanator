app.factory('ScoreEditor', function () {
  var canvas = document.getElementsByTagName('canvas');
  var renderer = new Vex.Flow.Renderer(canvas,
    Vex.Flow.Renderer.Backends.CANVAS);

  var ctx = renderer.getContext();
  var stave = new Vex.Flow.Stave(10, 0, 500);

    return {
        ctx: ctx,
        stave: stave
    };
});
