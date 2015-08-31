"use strict";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var imageData = context.createImageData(1, 1);
var data = imageData.data;

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function putPixel(x, y, r, g, b, a) {
  r = r || 0;
  g = g || 0;
  b = b || 0;
  a = a || 255;  // (a)lpha from 0 (transparent) up to 255 (opaque)
  
  data[0] = r;
  data[1] = g;
  data[2] = b;
  data[3] = a;
  
  context.putImageData(imageData, x, y);
}

function strokeLine(x1, y1, x2, y2) {
  // repeat drawing to darken line (opacity?)
  var times = 8;
  for (var i = 0; i < times; i++) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
}

// convert a Cartesian coordinate to canvas' x and y (from top right)
function cartesianToCanvas(cartX, cartY, scale) {
  // (0, 0) => canvas.width / 2, canvas.height / 2;
  // (-1, 1) => 0, 0
  // (1, 1) => canvas.width, 0
  // (-1, -1) => 0, canvas.height
  // (1, -1) => canvas.width, canvas.height

  scale = scale || 1.0;

  var halfWidth = canvas.width / 2;
  var halfHeight = canvas.height / 2;

  var x = Math.round(halfWidth + (cartX / scale * halfWidth));
  var y = Math.round(halfHeight - (cartY / scale * halfHeight));

  return { x: x, y: y };
}

function pixel(coords) {
  putPixel(coords.x, coords.y);
}


function sineWave() {
  for (var x = -60.28; x < 60.28; x += 0.02) {
    pixel(cartesianToCanvas(x, 60*Math.sin(x)/x, 60.28));
  }
}

document.getElementById("clearCanvas").addEventListener("click", function() {
  clearCanvas();
});

document.getElementById("clearInput").addEventListener("click", function() {
  document.getElementById("input").value = "";
});

document.getElementById("run").addEventListener("click", function() {
  (1, eval)(document.getElementById("input").value);
});
