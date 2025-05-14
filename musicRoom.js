// Using Codetrain and personal p5 sketch for ref, curser for implementing music player
// https://editor.p5js.org/codingtrain/sketches/NiR0PAcbx
// https://editor.p5js.org/Macethebot/sketches/nzPGn8yyA
// https://editor.p5js.org/Macethebot/sketches/lur7zIhxl

// Visual elements
let i, canvas;
let xPos = 150, yPos = 150;
let xspeed = 2.5, yspeed = -1;
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
  'sound/song2.mp3',
  'sound/song3.mp3'
];
let songNames = [
  'TerbujurKaku - Jablay',
  'Song 2',
  'Song 3'
];
let song;


function preload() {
  i = loadImage('img/Arrow Button.svg');
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

function imageMove() {
  image(i, xPos, yPos, 100, 100);
  xPos += xspeed;
  yPos += yspeed;
  
  // If image hits right or left edge
  if (xPos < 0 || xPos > width - 100) {
    // Turn around!
    xspeed = -xspeed;
    currentColor = getNextColor();
  }
  if (yPos < 0 || yPos > height - 100) {
    // Turn around!
    yspeed = -yspeed;
    currentColor = getNextColor();
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  
  // Set up music controls
  let playPauseBtn = document.getElementById('play-pause');
  let nextSongBtn = document.getElementById('next-song');
  let nowPlaying = document.getElementById('now-playing');
  
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
}

function draw() {
  drawGrid();
  imageMove();
}