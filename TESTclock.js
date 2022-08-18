let cx, cy;
let secondsRadius;
var fade;
var fadeAmount = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  fade = 0;

  let radius = min(width, height) / 2;
  secondsRadius = radius * 1;

  cx = width / 2;
  cy = height / 2;

  mic = new p5.AudioIn();
  mic.start();

  //background(250);
}

function draw() {

  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;

  var micvol = mic.getLevel();
  mv = map(micvol, 0, .01, 0, 10);
  print(mv);

  if (mv > 1){
    //console.log('yep');
    stroke(250, 0, 0, fade);
    strokeWeight(.5);
    line(cx + cos(s) * secondsRadius,
        cy + sin(s) * secondsRadius,
        cx - cos(s) * secondsRadius,
        cy - sin(s) * secondsRadius);
  } else {
    //console.log('nah');
    stroke(250, 0, 0);
    strokeWeight(.5);
    line(cx + cos(s) * secondsRadius,
        cy + sin(s) * secondsRadius,
        cx - cos(s) * secondsRadius,
        cy - sin(s) * secondsRadius);
    background(250);

    if (fade < 0) fadeAmount = 10;
    if (fade > 255) fadeAmount = -10;

    fade += fadeAmount;
    print(fade);
  }
}

function touchStarted() {
	getAudioContext().resume();
}
