var util = require('util')
var nodeimu  = require('../nodeimu/index.js');
var IMU = new nodeimu.IMU();

//var temperature:  temporary for testing
var temperature = 0;
exports.temperature = temperature;

var num = 0;
var numStop = 100;

console.time("async");

var print_vector3 = function(name, data) {
  var sx = data.x >= 0 ? ' ' : '';
  var sy = data.y >= 0 ? ' ' : '';
  var sz = data.z >= 0 ? ' ' : '';
  return util.format('%s: %s%s %s%s %s%s ', name, sx, data.x.toFixed(4), sy, data.y.toFixed(4), sz, data.z.toFixed(4));
}

var headingCorrection = function(heading, offset) {
  if (typeof offset ==='undefined')
      offset = 0;

  // Once you have your heading, you must then add your 'Declination Angle', which is the 'Error' of the magnetic field in your location.
  // Find yours here: http://www.magnetic-declination.com/
  var declinationAngle = 0.03106686;

  heading += declinationAngle + offset;

  // Correct for when signs are reversed.
  if (heading < 0)
    heading += 2 * Math.PI;

  // Check for wrap due to addition of declination.
  if (heading > 2 * Math.PI)
    heading -= 2 * Math.PI;

  return heading;
}

var headingToDegree = function(heading) {
  // Convert radians to degrees for readability.
  return heading * 180 / Math.PI;
}

var tic = new Date();
var callb = function (e, data) {
  var toc = new Date();

  if (e) {
    console.log(e);
    return;
  }

  var str = data.timestamp.toISOString() + " ";
  str += print_vector3('Accel', data.accel)
  // str += print_vector3('Gyro', data.gyro)
  // str += print_vector3('Compass', data.compass)
  // str += print_vector3('Fusion', data.fusionPose)
  str += util.format('TiltHeading: %s ', headingToDegree(headingCorrection(data.tiltHeading, Math.PI / 2)).toFixed(0));

  var str2 = "";
  if (data.temperature && data.pressure && data.humidity) {
    var str2 = util.format('%s %s %s', data.temperature.toFixed(4), data.pressure.toFixed(4), data.humidity.toFixed(4));
    temperature = data.temperature;  
  }
  if ((num % 10) == 0) {
    console.log(str + str2);
  }

  num++;
  if (num == numStop) {
    console.timeEnd("async");
  } else {
    setTimeout(function() { tic = new Date(); IMU.getValue(callb); } , 20 - (toc - tic));
  }
}

IMU.getValue(callb);
