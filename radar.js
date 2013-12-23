/*jshint loopfunc:true */
function init(svg_height,svg_width) {
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
  addLedgendHeaders();
  placePoints();
  addListItems();
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
      attr("title", radar_data[i].sector).
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
      attr("title", function(d){return d.name;});

    //TODO shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
    node.append("circle").attr("r", function (d) {return d.blipSize;}).
      attr("class", className);

    node.
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
  if (polar[0] === d.pc.r && polar[1] === d.pc.t) {
    //no change show click handler
    $("#collapse"+d.id).
      collapse("show").
      on('shown.bs.collapse', function () {
        window.location.hash = "#legend-"+d.id;
        $(this).off("shown.bs.collapse");
    });
    return;
  }
  d.pc.r = polar[0];
  d.pc.t = polar[1];
  var pointLocation = findPoint(d.name);
  if (radar_data[pointLocation[0]].degrees_min > d.pc.t || radar_data[pointLocation[0]].degrees_max < d.pc.t) {
    var pointToMove = radar_data[pointLocation[0]].items.splice(pointLocation[1], 1)[0];
    addPointToSection(pointToMove);
  }
  placePoints();
  addListItems();
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

function addLedgendHeaders() {
  $(".panel-default").remove();
  for ( var i = 0; i < radar_data.length; i++) {
    var sector = radar_data[i];
    var className = sector.sector.toLowerCase();
    var panelDiv = $(document.createElement('div')).attr("id", className+"Ledgend").addClass("well well-sm "+className);
    if (i%2===0) {
      panelDiv.appendTo($("#left"));
    } else {
      panelDiv.appendTo($("#right"));
    }
    panelDiv.append('<h3>'+sector.sector+'</h3>');
    panelDiv.append('<div class="panel-group" id="' + className + 'Accordion">');
  }
}

function addListItems() {
  for ( var i = 0; i < radar_data.length; i++) {
    var sector = radar_data[i];
    var className = sector.sector.toLowerCase();
    var panelDiv = $("#"+className+"Ledgend");
    var accordion = panelDiv.children("div.panel-group");
    accordion.children("div.panel").remove();
    for (var j = 0; j < sector.items.length; j++) {
      var item = sector.items[j];
      item.desc = (item.desc === undefined ? "No description available" : item.desc);
      accordion.append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">'+
                '<a name="legend-'+item.id+'" data-toggle="collapse" data-parent="#'+className+'Accordion" href="#collapse'+item.id+'">'+
                item.id + ': ' + item.name +
                '</a></h4></div>'+
                '<div id="collapse'+item.id+'" class="panel-collapse collapse">'+
                '<div class="panel-body">'+item.desc+'</div></div></div>');
    }
    $("#"+className+"Accordion .collapse").collapse({parent: "#"+className+"Accordion", toggle: false});
  }
}
function exportJSON() {
  var json = JSON.stringify(
    radar_data,
    ['sector', 'color', 'degrees_min', 'degrees_max', 'items', 'name', 'desc', 'pc', 'r', 't', 'movement', 'blipSize'],
    ' '
  );
  $("#json").text(json);
  $('#myModal').modal();
}
