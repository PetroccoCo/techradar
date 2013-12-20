
function polar_to_cartesian(r,t) {  
  //radians to degrees, requires the t*pi/180
  var x = r * Math.cos((t*Math.PI/180));
  var y = r * Math.sin((t*Math.PI/180));
  return [x,y];
}

function cartesian_to_raster(x,y) {
  var rx = w/2 + x;
  var ry = h/2 - y;
  return [rx,ry];
}

function raster_to_cartesian(rx,ry) {
  var x = rx - w/2;
  var y = h/2 - ry;
  return [x,y];
}

function cartesian_to_polar(x,y) {
  var r = Math.round(Math.sqrt(x*x + y*y));
  var t = Math.round(Math.atan2(y, x) * 180/Math.PI);
  return [r,t];
}

function polar_to_raster(r,t) {
  var xy= polar_to_cartesian(r,t);
  return cartesian_to_raster(xy[0], xy[1]);
}

function raster_to_polar(rx, ry) {
  var xy = raster_to_cartesian(rx, ry);
  return cartesian_to_polar(xy[0], xy[1]);
}
