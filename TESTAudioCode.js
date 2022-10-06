var cx, cy;
var secondsRadius;
var mv;
var fade;
var fadeAmount = 1;
var permanentLines = [];
var currentLine = [];
var currentSecond;

var secondsElapsed = 0;
var minutesElapsed = 0;
var hoursElapsed = 0;
var totalSecondsElapsed = 0;

function setup() {
  createCanvas(windowWidth, windowWidth);
  colorMode(RGB, 255, 255, 255, 1);
  stroke(255);
  fade = 0;

  let radius = min(width, height) / 2;
  secondsRadius = radius * 1;

  cx = width / 2;
  cy = height / 2;

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // the incrementTime() function ticks up seconds, minutes, and hours
  // this is so you can use biiiiiiig cycles for interesting movements!
  incrementTime();
  currentLineAngle = map(secondsElapsed, 0, 60, 0, TWO_PI) - HALF_PI;
  let x1 = cx + cos(currentLineAngle) * secondsRadius;
  let y1 = cy + sin(currentLineAngle) * secondsRadius;
  let x2 = cx - cos(currentLineAngle) * secondsRadius;
  let y2 = cy - sin(currentLineAngle) * secondsRadius;
  // the wobble() function takes two variables
  // the first is the length of the cycle - so the bigger the number,
  // the slower the line will shift
  // the second variable is how much it moves over the length of that cycle
  x1 += wobble(1000, 200);
  y1 += wobble(100, 150);
  x2 += wobble(20, 200);
  y2 += wobble(60, 100);

  currentLine = [x1, y1, x2, y2];
  drawCurrentLine();
  drawPermanentLines();
  fadeSquare(0.1);

  if (microphoneVolume() > 15) {
      permanentLines.push(currentLine);
    }
}

function touchStarted() {
	getAudioContext().resume();
}

function microphoneVolume() {
   let micvol = mic.getLevel();
   let mv = map(micvol, 0, .01, 0, 10);
   console.log(mv);
   return mv;
}

function incrementTime() {
  // basically this just counts up seconds from 0-59
  // and minutes from 0-59
  // and hours from 0 to infinity
  // this is so the wobble() function can use cycles that move really slow
  if(secondsElapsed != second()) { // if the clock ticks to a new second
    secondsElapsed = second();
    if (secondsElapsed == 59) { // tick to a new minute
      minutesElapsed++
      if (minutesElapsed == 60) { // tick to a new hour
        minutesElapsed = 0;
        hoursElapsed++
      }
    }
    // console.log(hoursElapsed + ":" + minutesElapsed + ":" + secondsElapsed);
  }
  totalSecondsElapsed = secondsElapsed + (minutesElapsed * 60) + (hoursElapsed * 3600);
}

function drawCurrentLine() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(.25);
  line(currentLine[0], currentLine[1], currentLine[2], currentLine[3]);
}

function fadeSquare(opacity) {
  noStroke();
  fill(250, 250, 250, opacity);
  rect(0, 0, width, height);
}

function wobble(lengthOfCycle, amplitude) {
  // lengthOfCycle is how many minutes it takes for each wobble to get back to the same position
  // so lengthOfCycle = 15 would return to its original position in 15 minutes
  // amplitude is the pixel displacement, so a bigger number is a more dramatic pattern
  // the wobble uses the current second, so each tick-line doesn't move
  return (sin(float(totalSecondsElapsed) / lengthOfCycle) * amplitude);
  // remember that sin() goes from -1 to 1, so
  // if your amplitude is too high the line will stretch off the screen
}

function drawPermanentLines() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(.25);
  for (let i in permanentLines) {
    line(permanentLines[i][0],
        permanentLines[i][1],
        permanentLines[i][2],
        permanentLines[i][3]);
  }
}


//function mouseMoved() {
  // you can get rid of this function once the mic stuff is working!
  //permanentLines.push(currentLine);
//}

// function touchStarted() {
// 	getAudioContext().resume();
// }
