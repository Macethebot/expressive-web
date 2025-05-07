function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameCount = 0;
}

function draw() {
  background('#7b2ff2'); // base sky color
  let a = color('#7b2ff2');
  let b = color('#1e90ff');
  let yStep = 32;
  let xStep = 32;
  let t = millis() * 0.0007; // faster, more visible movement
  for (let y = 0; y < height; y += yStep) {
    for (let x = 0; x < width; x += xStep) {
      let n = noise(x * 0.04, y * 0.04, t);
      let c = lerpColor(a, b, n);
      c.setAlpha(60);
      fill(c);
      ellipse(x + n * 60, y + n * 60, 160 + n * 80, 60 + n * 40);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}