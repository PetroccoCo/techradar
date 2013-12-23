function polar_to_cartesian(r,t) {  
  //radians to degrees, requires the t*pi/180
  var x = r * Math.cos((t*Math.PI/180));
  var y = r * Math.sin((t*Math.PI/180));
  return [x,y];
}

function cartesian_to_raster(x,y, height, width) {
  var rx = width/2 + x;
  var ry = height/2 - y;
  return [rx,ry];
}

function raster_to_cartesian(rx,ry, height, width) {
  var x = rx - width/2;
  var y = height/2 - ry;
  return [x,y];
}

function cartesian_to_polar(x,y) {
  var r = Math.round(Math.sqrt(x*x + y*y));
  var t = Math.round(Math.atan2(y, x) * 180/Math.PI);
  t = (t>=0 ? t : 360+t);
  return [r,t];
}

function polar_to_raster(r,t, height, width) {
  var xy= polar_to_cartesian(r,t);
  return cartesian_to_raster(xy[0], xy[1], height, width);
}

function raster_to_polar(rx, ry, height, width) {
  var xy = raster_to_cartesian(rx, ry, height, width);
  return cartesian_to_polar(xy[0], xy[1]);
}
