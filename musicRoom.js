// Using Codetrain and personal p5 sketch for ref
// https://editor.p5js.org/codingtrain/sketches/NiR0PAcbx
// https://editor.p5js.org/Macethebot/sketches/nzPGn8yyA


let i; 
let xPos = 150;
let yPos = 150;
let xspeed = 2.5;
let yspeed = -1;

var canvas;

function preload() {
  i = loadImage('img/Arrow Button.svg');
}

function windowResized(){
  rezizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index','-1' );
  frameCount = 0;
 
}

function draw(){
 background('blue');
 image(i, xPos, yPos, 100, 100);
  
  // Move x and y
  xPos = xPos + xspeed;
  yPos = yPos + yspeed;
  
  // If image hits right or left edge
  if (xPos < 0 || xPos > width - 100) {
    // Turn around!
    xspeed = -xspeed;    
  }

  if (yPos < 0 || yPos > height - 100) {
    // Turn around!
    yspeed = -yspeed;    
  }
}