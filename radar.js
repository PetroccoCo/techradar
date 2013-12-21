function init(svg_height,svg_width) {
  $('#title').text(document.title);

  var radar = new pv.Panel()
  .width($("#radar").width())
  .height(Math.max($(window).height(), $("#radar").width()))
  .canvas('radar');

  // arcs
  radar.add(pv.Dot)
  .data(radar_arcs)
  .left(svg_width/2)
  .top(svg_height/2)
  .radius(function(d){return d.r;})
  .strokeStyle("#ccc")
  .anchor("top")
  .add(pv.Label).text(function(d) { return d.name;});

  //sector lines -- vertical
  radar.add(pv.Line)
  .data([(svg_height/2-radar_arcs[radar_arcs.length-1].r),svg_height-(svg_height/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .left(svg_width/2)
  .top(function(d) {return d;})
  .strokeStyle("#bbb");

  //sector lines -- horizontal
  radar.add(pv.Line)
  .data([(svg_width/2-radar_arcs[radar_arcs.length-1].r),svg_width-(svg_width/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .top(svg_height/2)
  .left(function(d) {return d;})
  .strokeStyle("#bbb");

  radar.anchor('radar');
  radar.render();
  var svg = d3.select("svg").attr("viewBox", "0 0 "+svg_height+" "+svg_width);
  placePoints();
  addLedgend();
}

function addOldLedgend() {
  var radar_quadrant_ctr=1;
  for (var i = 0; i < radar_data.length; i++) {
    radar.add(pv.Label)
    .left( radar_data[i].left )
    .top( radar_data[i].top )
    .text(  radar_data[i].sector )
    .strokeStyle( radar_data[i].color )
    .fillStyle( radar_data[i].color )
    .font("18px sans-serif")
    .add( pv.Dot )
    .def("i", radar_data[i].top )
    .data(radar_data[i].items)
    .top( function() { return ( this.i() + 18 + this.index * 18 );} )
    .shape( function(d) {return (d.movement === 't' ? "triangle" : "circle");})
    .cursor( function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
    .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url;}})
    .size(10)
    .angle(45)
    .anchor("right")
    .add(pv.Label)
    .text(function(d) {return radar_quadrant_ctr++ + ". " + d.name;} );
  }

}
function placePoints() {
  var svg = d3.select("svg");
  var drag = d3.behavior.drag().
    on("drag", dragmove).
    on("dragend", dropHandler);

  var total_index=1;
  for (var i = 0; i < radar_data.length; i++) {
    radar_data[i].items.sort(radarDataSorter);
    var className = radar_data[i].sector.toLowerCase();

    // remove any existing points
    d3.select("g." + className).remove();

    var group = svg.append("g").
      attr("title", function(){ return radar_data[i].sector;}).
      attr("class", className);

    var node = group.selectAll(".node").
      data(radar_data[i].items).
      enter().
      append("g").
      call(drag);

    node.each(function(d, i) {
      d.id = total_index++;
      d.raster = polar_to_raster(d.pc.r, d.pc.t, svg_height, svg_width);
      d.x = d.raster[0];
      d.y = d.raster[1];
      d.blipSize = (d.blipSize !== undefined ? d.blipSize : 10);
    });

    node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";}).
      append("a").
      attr("title", function(d){return d.name;});

    //TODO shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
    node.append("circle").attr("r", function (d) {return d.blipSize;}).
      attr("class", className);

    node.attr("xlink:href", function(d){return "#"+d.id;}).
      attr("class", function(d){return "node cir_"+d.id;}).
      append("text").
      attr("dy", ".35em").
      attr("text-anchor","middle").
      text(function(d) { return d.id; });
  }
}


function radarDataSorter(a, b){
  var radComp = a.pc.r - b.pc.r;
  if (radComp === 0){
    return a.pc.t - b.pc.t;
  }
  return radComp;
}

function dropHandler(d) {
  var polar = raster_to_polar(d.x, d.y, svg_height, svg_width);
  d.pc.r = polar[0];
  d.pc.t = polar[1];
  var pointLocation = findPoint(d.name);
  if (radar_data[pointLocation[0]].degrees_min > d.pc.t || radar_data[pointLocation[0]].degrees_max < d.pc.t) {
    var pointToMove = radar_data[pointLocation[0]].items.splice(pointLocation[1], 1)[0];
    addPointToSection(pointToMove);
  }
  placePoints();
  addLedgend();
}

function findPoint(name) {
  for(var i = 0; i < radar_data.length; i++) {
    for(var j = 0; j < radar_data[i].items.length; j++) {
      if (radar_data[i].items[j].name == name) {
        return [i, j];
      }
    }
  }
}

function dragmove(d) {
  // Todo restrict to sector
  d.x = Math.round(d3.event.x);
  d.y = Math.round(d3.event.y);
  d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
}

function addPointToSection(point) {
  for (var i = 0; i < radar_data.length; i++) {
    if (point.pc.t >= radar_data[i].degrees_min && point.pc.t <= radar_data[i].degrees_max) {
      radar_data[i].items.push(point);
      return;
    }
  }
  throw "Could not find a section for point with theta: "+point.pc.t;
}

function addLedgend() {
  for ( var i = 0; i < radar_data.length; i++) {
    var sector = radar_data[i];
    var className = sector.sector.toLowerCase();
    var panelDiv = $("#"+className+"Ledgend");
    var panelHtml;
    if(panelDiv.length == 0) {
      panelDiv = $(document.createElement('div')).attr("id", className+"Ledgend").addClass("panel panel-default "+className);
      if (i < 2) {
        panelDiv.appendTo($("#left"));
      } else {
        panelDiv.appendTo($("#right"));
      }
      panelDiv.append('<div class="panel-heading"><h3 class="panel-title">'+sector.sector+'</h3></div>');
    } else {
      panelDiv.children("ul").remove();
    }
    panelDiv.append('<ul class="list-group">');
    var ul = panelDiv.children("ul");
    for (var j = 0; j < sector.items.length; j++) {
      var item = sector.items[j];
      ul.append('<li class="list-group-item">' + item.id + ': ' + item.name + '</li>');
    }
  }
}
