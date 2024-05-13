let faceapi;
let detections = [];

let video;
let canvas;

let currentMood;

let freqValue, freqValue2;
let angle = 60, angle2 = 50;

var sound;
var sound2;
var sound3;

let r = 200;

function setup() {
  canvas_two = createCanvas(1200, 1850, WEBGL);
  
  currentMood = "neutral";

  sound = new Howl({
    src: ['twiaudio.mp3'],
    loop: true,
    volume: 0,
  });

  sound2 = new Howl({
    src: ['wn.mp3'],
    loop: true,
    volume: 0,
  });

  sound3 = new Howl({
    src: ['pink_golden.mp3'],
    loop: true,
    volume: 0,
  });

  sound.play();
  sound2.play();
  sound3.play();

  strokeWeight(0.9);
  stroke("white");
  
  angleMode(DEGREES);
  colorMode(HSB);

  video = createCapture(VIDEO);// Create video: 
  video.id("video");
  video.size(width, height);

  noFill();
  
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5
  };

  //Initialize the model: 
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
    
}


function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces: 
}

// Got faces: 
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  clear();
  console.log("this is inside gotFaces");
  detections = result;　//Now all the data in this detections:


  drawExpressions(detections);//Draw face expression: 

  rotateY(.1);
  rotateX(.1);
  rotateZ(.1);
  
  faceapi.detect(gotFaces);// Call the function again at here: 
}


function drawExpressions(detections){

  if(detections.length > 0){

    let {neutral, happy, sad} = detections[0].expressions;

    if(happy > 0.8) {
      happyEmotion();
    }

    if(neutral > 0.9) {
      neutralEmotion();
    } 

    if(sad > 0.8) {
      sadEmotion();
    } 
    
    //normalSphere(sad);

    //normalSphereTest(happy);

    //SphericalLissajous(happy, sad);

    happySphere(happy);

    sadSphere(sad);

    //bumpySphere(Math.ceil((happy*100)/10)*10, Math.ceil((100*neutral)/10)*10);

    //bumpySphere(happy,sad);

    //bumpySphere_two(neutral, sad); // NEUTRAL    
  }

  function happyEmotion() {
    if (currentMood != "happy") {
      currentMood = "happy";
      sound2.fade(sound2.volume(), 0, 200);
      sound3.fade(sound3.volume(), 0, 200);
      sound.fade(0.0, 1.0, 200);
    }
  }

  function neutralEmotion() {
    if (currentMood != "neutral") {
      currentMood = "neutral";
      sound.fade(sound.volume(), 0, 200);
      sound3.fade(sound3.volume(), 0, 200);
      sound2.fade(0.0, 0.2, 200);
    }
  }

  function sadEmotion() {
    if (currentMood != "sad") {
      currentMood = "sad";
      sound.fade(sound.volume(), 0, 200);
      sound2.fade(sound2.volume(), 0, 200);
      sound3.fade(0.0, 1.0, 200);
    }
  }

function normalSphere(sad) {

  
  for (let phi = 0; phi < 180; phi += 5) {
    beginShape(POINTS);
    for (let theta = 0; theta < 360; theta += 5) {
      let x = r * cos(phi) * sin(theta*2) * sad ;
      let y = r * sin(phi*sad) * sin(theta*2) * 2;
      let z = r * sin(phi) * cos(theta);
      vertex(x, y, z);          
    }
    endShape(CLOSE);
  }
}


function SphericalLissajous(happy, sad){

  beginShape(POINTS);
  for(let theta = 0; theta < 360; theta += 0.1){
    let x = r * cos(theta*sad);
    let y = r * sin(theta*happy) * sin(theta*happy);
    let z = r * sin(theta*happy*100*happy) * cos(theta*sad);
    vertex(x, y, z);
  }
  endShape(CLOSE);
  } 

function happySphere(happy){
  let freq = 10*sin(angle);
  let freq2 = 10*sin(angle2);

  beginShape();
  for(let theta = 0; theta < 360; theta += 0.5){
    let x = r * cos(theta*freq*happy)*2;
    let y = r * sin(theta*freq*happy) * sin(theta*freq2*happy)*2;
    let z = r * sin(theta*freq*happy) * cos(theta*freq2)*2;
    vertex(x, y, z);
  }
  endShape();
  
  angle += 0.1;
  angle2 += 0.1;
}

function bumpySphere(happy,sad){
  // background(230, 50, 15);
  //clear();
  //orbitControl(4, 4);//Mouse control

  // let freq = 10*sin(angle);
  // let freq2 = 10*sin(angle2);


  beginShape(POINTS);
  for(let theta = 0; theta < 180; theta += 2){
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+sin(theta)*sin(phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+sin(theta)*sin(phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+sin(theta)*sin(phy)) * cos(1*theta);
      vertex(x, y, z);
    }
  }
  endShape();

  // angle += 0.05;
  // angle2 += 0.05;

  // bumpiness.html("bumpiness: " + bumpSlider.value());
  // thetaValue.html("theta value: " + thetaSlider.value());
  // phyValue.html("phy value: " + phySlider.value());
}

function bumpySphere_two(neutral, sad){
 

  beginShape(POINTS);
  for(let theta = 0; theta < 180; theta += 2){
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+sin((neutral*100)*theta)*sin(phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+sin((100)*theta*sad)*sin(phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+sin((neutral*100)*theta)*sin(phy)) * cos(theta);
      vertex(x, y, z);
    }
  }
  endShape(); 

  // angle += 0.05;
  // angle2 += 0.05;

  // bumpiness.html("bumpiness: " + bumpSlider.value());
  // thetaValue.html("theta value: " + thetaSlider.value());
  // phyValue.html("phy value: " + phySlider.value());
}

function sadSphere(sad){

  beginShape(POINTS);
  for(let theta = 0; theta < 180; theta += 2){
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+(sad-10)*sin(sad*theta)*sin(((sad*10)-40)*phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+(sad-10)*sin(sad*theta)*sin(((sad*10)-40)*phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+(sad-10)*sin(sad*theta)*sin(((sad*10)-40)*phy)) * cos(1*theta);
      vertex(x, y, z);
    }
  }
  endShape();
}
}
