function init(h,w) {
  $('#title').text(document.title);  

  var radar = new pv.Panel()
  .width(w)
  .height(h)
  .canvas('radar');

  // arcs
  radar.add(pv.Dot)
  .data(radar_arcs)
  .left(w/2)
  .top(h/2)
  .radius(function(d){return d.r;})
  .strokeStyle("#ccc")
  .anchor("top")       
  .add(pv.Label).text(function(d) { return d.name;});

  //quadrant lines -- vertical
  radar.add(pv.Line)
  .data([(h/2-radar_arcs[radar_arcs.length-1].r),h-(h/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .left(w/2)        
  .top(function(d) {return d;})       
  .strokeStyle("#bbb");

  //quadrant lines -- horizontal 
  radar.add(pv.Line)
  .data([(w/2-radar_arcs[radar_arcs.length-1].r),w-(w/2-radar_arcs[radar_arcs.length-1].r)])
  .lineWidth(1)
  .top(h/2)
  .left(function(d) {return d;})       
  .strokeStyle("#bbb");


  //Quadrant Ledgends
  var radar_quadrant_ctr=1;
  for (var i = 0; i < radar_data.length; i++) {        
    radar.add(pv.Label)         
    .left( radar_data[i].left )         
    .top( radar_data[i].top )  
    .text(  radar_data[i].quadrant )		 
    .strokeStyle( radar_data[i].color )
    .fillStyle( radar_data[i].color )                    
    .font("18px sans-serif")
    .add( pv.Dot )            
    .def("i", radar_data[i].top )
    .data(radar_data[i].items)            
    .top( function() { return ( this.i() + 18 + this.index * 18 );} )   
    .shape( function(d) {return (d.movement === 't' ? "triangle" : "circle");})                 
    .cursor( function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })                                                            
    .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}}) 
    .size(10) 
    .angle(45)            
    .anchor("right")                
    .add(pv.Label)                
    .text(function(d) {return radar_quadrant_ctr++ + ". " + d.name;} );
  }      

  radar.anchor('radar');
  radar.render();
  placePoints();
};
function placePoints() {
  var svg = d3.select("svg");
  var drag = d3.behavior.drag().
    on("drag", dragmove).
    on("dragend", dropHandler);

  var total_index=1;
  for (var i = 0; i < radar_data.length; i++) {
   var className = radar_data[i].quadrant.toLowerCase();
   var group = svg.append("g").
      attr("title", function(){ return radar_data[i].quadrant;}).
      attr("class", className);

    var node = group.selectAll(".node").
      data(radar_data[i].items).
      enter().
      append("g").
      call(drag);

    node.each(function(d, i) {
      d.id = total_index++;
      d.raster = polar_to_raster(d.pc.r, d.pc.t);
      d.x = d.raster[0];
      d.y = d.raster[1];
      d.blipSize = (d.blipSize !== undefined ? d.blipSize : 10);
    });

    node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"}).
      append("a").
      attr("title", function(d){return d.name;});

    //shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
    node.append("circle").attr("r", function (d) {return d.blipSize;}).
      attr("class", className);
    /*
      attr("cx", function(d) { return d.x; }).
      attr("cy", function(d) { return d.y; });
*/
    node.attr("xlink:href", function(d){return "#"+d.id;}).
      attr("class", function(d){return "node cir_"+d.id;}).
      append("text").
      attr("dy", ".35em").
      attr("text-anchor","middle").
      text(function(d) { return d.id; }).
      attr("textStyle", "white");
      //attr("transform", function(d) { return "translate(" + d.raster[0] + ", " + d.raster[1] + ")";});
  }
}
function dropHandler(d) {
  console.log("data: " + d.x + " " + d.y);
  var cart = raster_to_cartesian(d.x, d.y);
  console.log("cartesian: " + cart[0] + " " + cart[1]);
}

function dragmove(d) {
  d.x = d3.event.x;
  d.y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
}
