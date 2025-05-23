// Using Codetrain and personal p5 sketch for ref, curser for implementing music player
// https://editor.p5js.org/codingtrain/sketches/NiR0PAcbx
// https://editor.p5js.org/Macethebot/sketches/nzPGn8yyA
// https://editor.p5js.org/Macethebot/sketches/lur7zIhxl

// Visual elements
let i, canvas;
let balls = [];
const BALL_RADIUS = 50;
const MAX_BALLS = 40;
let currentColor = 'blue';
let colorOffset = 0;
let numRects = 80;
let noiseTimeFactor = 0.9;
let noiseScale = 0.05;

// Music player
let currentSong = 0;
let isPlaying = false;
let songs = [
  'sound/TerbujurKaku - Jablay.mp3',
  'sound/Ove-Naxx - Warte.mp3',
  'sound/No Loli-Gagging - Its Time for an Adventure.mp3',
  'sound/Duran Duran Duran - Lazer Furniture Designer.mp3',
  'sound/Desper - Basics Sessions - TorG.mp3',
];
let songNames = [
  'TerbujurKaku - Jablay',
  'Ove-Naxx - Warte',
  'No Loli-Gagging - Its Time for an Adventure',
  'Duran Duran Duran - Lazer Furniture Designer',
  'Desper - Basics Sessions - TorG'
];
let song;

function preload() {
  soundFormats('mp3');
  loadCurrentSong();
}

function loadCurrentSong() {
  try {
    song = loadSound(songs[currentSong], 
      () => console.log('Sound loaded successfully'),
      (err) => console.error('Error loading sound:', err)
    );
  } catch (error) {
    console.error('Error in preload:', error);
  }
}

function getNextColor() {
  colorOffset = (colorOffset + 1) % 3;
  const colors = [
    color(random(0, 50), random(50, 150), random(150, 255)),  // Blue
    color(random(100, 200), random(0, 50), random(150, 255)), // Purple
    color(random(0, 50), random(150, 255), random(50, 150))   // Green
  ];
  return colors[colorOffset];
}

function drawGrid() {
  noStroke();
  let gridSize = width / numRects;
  
  for (let y = 0; y < numRects; y++) {
    for (let x = 0; x < numRects; x++) {
      let shade = noise(x * noiseScale, y * noiseScale, noiseTimeFactor) * 100;
      let r = red(currentColor) * (shade/255);
      let g = green(currentColor) * (shade/255);
      let b = blue(currentColor) * (shade/255);
      fill(r, g, b);
      rect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
  noiseTimeFactor += 0.01;
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');

  // Set up music controls
  let playPauseBtn = document.getElementById('play-pause');
  let nextSongBtn = document.getElementById('next-song');
  let nowPlaying = document.getElementById('now-playing');
  let resetBallsBtn = document.getElementById('reset-balls');

  // Set initial display
  nowPlaying.textContent = 'No song playing';

  playPauseBtn.addEventListener('click', () => {
    try {
      if (isPlaying) {
        song.pause();
        playPauseBtn.textContent = 'Play';
      } else {
        song.play();
        playPauseBtn.textContent = 'Pause';
        nowPlaying.textContent = `Now playing: ${songNames[currentSong]}`;
      }
      isPlaying = !isPlaying;
    } catch (error) {
      console.error('Error playing/pausing:', error);
    }
  });

  nextSongBtn.addEventListener('click', () => {
    try {
      song.stop();
      currentSong = (currentSong + 1) % songs.length;
      loadCurrentSong();
      if (isPlaying) {
        song.play();
      }
      nowPlaying.textContent = `Now playing: ${songNames[currentSong]}`;
    } catch (error) {
      console.error('Error changing songs:', error);
    }
  });

  resetBallsBtn.addEventListener('click', resetBalls);

  // Initialize the first ball in the center
  balls = [createBall(width/2, height/2, BALL_RADIUS, getBallColor(1))];
}

function createBall(x, y, r, c) {
  return {
    x: x,
    y: y,
    r: r,
    color: c,
    xspeed: random([-1, 1]) * random(2, 4),
    yspeed: random([-1, 1]) * random(2, 4),
    growUntil: 0,
    targetR: r,
    bounced: false
  };
}

function getBallColor(n) {
  if (n > 30) return color(15, 180, 120); // Green
  if (n > 10) return color(80, 120, 255); // Blue
  return color(100, 80, 255); // Purple
}

function draw() {
  drawGrid();
  // Update color for all balls based on count
  let colorToUse = getBallColor(balls.length);
  for (let i = 0; i < balls.length; i++) {
    if (balls.length > 10 && balls.length <= 30) balls[i].color = color(80, 120, 255);
    if (balls.length > 30) balls[i].color = color(80, 255, 120);
    moveBall(balls[i]);
    updateBallSize(balls[i]);
    displayBall(balls[i]);
    // Only the first ball controls the background effect
    if (i === 0 && balls[i].bounced) {
      currentColor = getNextColor();
      balls[i].bounced = false;
    }
  }
}

function moveBall(ball) {
  ball.x += ball.xspeed;
  ball.y += ball.yspeed;
  // Bounce off walls
  if (ball.x < ball.r || ball.x > width - ball.r) {
    ball.xspeed *= -1;
    ball.x = constrain(ball.x, ball.r, width - ball.r);
    ball.bounced = true;
  }
  if (ball.y < ball.r || ball.y > height - ball.r) {
    ball.yspeed *= -1;
    ball.y = constrain(ball.y, ball.r, height - ball.r);
    ball.bounced = true;
  }
}

function updateBallSize(ball) {
  if (ball.growUntil > 0) {
    if (millis() < ball.growUntil) {
      ball.r = lerp(ball.r, ball.targetR, 0.2);
    } else {
      ball.targetR = BALL_RADIUS;
      ball.r = lerp(ball.r, BALL_RADIUS, 0.2);
      if (abs(ball.r - BALL_RADIUS) < 0.5) {
        ball.r = BALL_RADIUS;
        ball.growUntil = 0;
      }
    }
  } else if (ball.r !== BALL_RADIUS) {
    ball.r = lerp(ball.r, BALL_RADIUS, 0.2);
    if (abs(ball.r - BALL_RADIUS) < 0.5) {
      ball.r = BALL_RADIUS;
    }
  }
}

function displayBall(ball) {
  noStroke();
  fill(ball.color);
  ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2);
}

function mousePressed() {
  if (balls.length >= MAX_BALLS) {
    resetBalls();
    return;
  }
  // Only allow adding a ball if mouse is inside the first ball
  let b = balls[0];
  let d = dist(mouseX, mouseY, b.x, b.y);
  if (d < b.r) {
    let n = balls.length + 1;
    let newBall = createBall(mouseX, mouseY, BALL_RADIUS, getBallColor(n));
    // Every 5th ball grows for 5 seconds
    if (n % 5 === 0) {
      newBall.growUntil = millis() + 5000;
      newBall.targetR = BALL_RADIUS * 1.7;
    }
    balls.push(newBall);
  }
}

function resetBalls() {
  balls = [createBall(width/2, height/2, BALL_RADIUS, getBallColor(1))];
}

