var song, fft, fftLin;
var spectrumScale = 1.4;
var linNum = 40;
var r = 0;
var x = [];
var y = [];
let fr = 15
let shapeColor;
let bgColor;
let songs = [];

var bgs = ['#08179F', '#003686', '#08609F', '#6597BB', '#08969F', '#089F7B', '#2FA766', '#7EB697', '#96D15A', '#EDFF1A', '#FFBF1A', '#FF6C1A', '#D14204', '#D94D4D', '#E32020', '#B91919','#E8317E', '#E36198', '#DD94DA', '#DB54D5', '#7723FF', '#A46CFF', '#0F0F30', '#30A', '#FFFFFF', '#000000', '#101F27', '#FF3153', '#0D1244', '#FFFFFF', '#BDFF00', '#34033D', '#031A3D']
var colors1 = ['#DBFF00', '#EED70C', '#EE0C5A', '#FFFFFF', '#E9EE0C', '#9B57DF', '#5786DF', '#FFFFFF', '#FFA030', '#EC3636', '#FFFFFF', '#CCFF00', '#FFFFFF', '#FFE600', '#FFFFFF', '#FFFFFF', '#AEE7FF', '#FFFFFF', '#672AA4', '#FFFFFF', '#00E0FF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#000000', '#DBFF00', '#00E0FF', '#31FFF5', '#3143FF', '#EC3636', '#FFC700', '#7000FF', '#0266FD']
var colors2 = ['#DF1B1B', '#B53D8E', '#800B5A', '#B74190', '#A51E1E', '#140B80', '#0B214B', '#0B4B44', '#C13E8D', '#3963D1', '#3C66D2', '#000E8F', '#3FBAFF', '#1B52DF', '#FFB800', '#000000', '#0073FB', '#0065DC', '#000000','#00E0FF', '#DBFF00', '#FFBF1A', '#FF5757', '#FFD057', '#FF0000', '#FF5757','#00E', '#FFB800', '#FF005B', '#000000', '#8F00FF', '#FFF', '#DBFF00']

//randomizing
var randomPallete = Math.floor(Math.random()*bgs.length)

var bgResult = bgs[randomPallete]
var colors1Result = colors1[randomPallete]
var colors2Result = colors2[randomPallete]

function preload() {
  songs.push("songlist/22.wav");
  songs.push("songlist/joinme.wav");
  songs.push("songlist/lurk.wav");
  songs.push("songlist/nyc.mp3");
  songs.push("songlist/fade.mp3");
  songs.push("songlist/held.mp3");
  songs.push("songlist/numberthree.mp3");
  songs.push("songlist/helix.mp3");
  songs.push("songlist/bio.mp3");
  songs.push("songlist/waltzofjoy.mp3");
  songs.push("songlist/guidance.mp3");
  songs.push("songlist/placidangles.mp3");
  songs.push("songlist/gaussian.mp3");
  songs.push("songlist/fatewillbindusforever.mp3");
  songs.push("songlist/silentcry.mp3");
  songs.push("songlist/8149.mp3");
  songs.push("songlist/thevoyager.mp3");
  songs.push("songlist/pu.mp3");
  songs.push("songlist/cayo.mp3");
  songs.push("songlist/silk.mp3");
  songs.push("songlist/labryinth.mp3");
  songs.push("songlist/camargue.mp3");
  songs.push("songlist/comedowntous.mp3");
  songs.push("songlist/untilthesearunsdry.mp3");
  songs.push("songlist/djmajorlife.mp3");
  songs.push("songlist/forever.mp3");
  songs.push("songlist/espiritse.mp3");
  songs.push("songlist/whatsgood.mp3");
  songs.push("songlist/gravity.mp3");
  songs.push("songlist/company.mp3");
  songs.push("songlist/collapsestories.mp3");
  songs.push("songlist/faint.mp3");
  songs.push("songlist/flashing.mp3");
  let randomChooser = Math.floor(random(0,songs.length));
  song = loadSound(songs[randomChooser]);
}

var fromColor
var toColor

function setup() {
  // circle color stroke
  shapeColor = color(245,10,90);
  // background color 
  bgColor = (color(random(255), random(255), random(255) ));
  //
  createCanvas(windowWidth, windowHeight);
  // adjust this? 
  frameRate(fr);
  background(bgColor);
  noStroke();
  fft = new p5.FFT();
  song.setVolume(10);
  song.loop();
  fft.analyze();
  fftLin = fft.linAverages(linNum);
  for (var i = 0; i< fftLin.length; i++){
    if(i == 0) {
      x[i] = 0;
      y[i] = 0;
    } else {
      x[i] = random(-width/1, width/1);
      y[i] = random(-height/1, height/1);
      // ADJUST             ^ 10                     ^ 10 
    }
  }
  fill(bgResult);

  //defining lerp colors
  fromColor = color(colors1Result);
  
  
  toColor = color(colors2Result);

}
var tt = 0
function draw() {
  // randomColor = color(230,250,22);
  fft.analyze();
  fftLin = fft.linAverages(linNum);
  noStroke();

  // change of background fill over time , pick pallete for this ? 
  rect(0, 0, width, height);
  translate(width/2, height/2);
  

  lerpedColor = lerpColor(fromColor, toColor, tt);

  //how fast it transitions
tt+=.0009
  //control rotation
  rotate(radians(r));
  for(var i = 0; i < fftLin.length; i++){
    // stroke of circles here: 
    strokeWeight(2);
    if(i % 2 == 100) {
    } else {

      stroke(lerpedColor);
    }
    if(i == 0) {
      ellipse(x[i], y[i], fftLin[i]*spectrumScale*2, fftLin[i]*spectrumScale*2);
    } else {
      noFill();
      ellipse(x[i], y[i], fftLin[i]*spectrumScale, fftLin[i]*spectrumScale);
    }
  }
  r += random(); // would love for this variable to be random, why when i put this variable at random, it doesn't do it?
  // blendmode = (DIFFERENCE);
  drawingContext.filter = 'blur(10px)';
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    shapeColor = color(random(255), random(255), random(255) );
    drawingContext.filter = 'blur(5px)';
    // background(random); //background not changing when i press, why is that?
  } else {
    song.play();
    shapeColor = color(random(255), random(255), random(255) );
    drawingContext.filter = 'blur(0px)';
    // background(random); // background not changing when i press, why is that?
  }
}
