<h1>Simple Map Example</h1>
 <ol>
    
    <li><tt>rosrun map_server map_server
        /opt/ros/groovy/stacks/wg_common/willow_maps/willow-sans-whitelab-2010-02-18-0.025.pgm 0.025</tt>
    </li>
    <li><tt>roslaunch rosbridge_server rosbridge_websocket.launch</tt>
    </li> 
  </ol>
 <div id="navmap" onclick="cnvs_getCoordinates(event)" onmouseout="cnvs_clearCoordinates()"></div>

  <button id="bb" >Enlarge Map</button>
  <button id="bl" >Reset Map</button>
  <div id="xycoordinates"></div>
  <b id="bx"></b>
  <b id="by"></b>
<script>
  /**
   * Setup all visualization elements when the page is loaded.
   */
  (function() {
    // Connect to ROS.
    var ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : 'navmap',
      width : 350,
      height : 400
    });

    // Setup the nav client.
    var nav = NAV2D.OccupancyGridClientNav({
      ros : ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : '/pr2_move_base',
      image: 'turtlebot.png'
    });

    var zoomview = new ROS2D.ZoomView({
      rootObject : viewer.scene
    });

    $('#bb').on('click',function(){
      zoomview.startZoom($("#bx").text(),$("#by").text());
      zoomview.zoom(1.2);
    });
    $('#bl').on('click',function(){
      zoomview.startZoom($("#bx").text(),$("#by").text());
      zoomview.zoom(0.8);
    });

    // For mobile devices.
    createjs.Touch.enable(viewer.scene);
    // this lets our drag continue to track the mouse even when it leaves the canvas:
    // play with commenting this out to see the difference.
    viewer.scene.mouseMoveOutside = true; 
    viewer.scene.on("mousedown", function (evt) {
      // keep a record on the offset between the mouse position and the container
      // position. currentTarget will be the container that the event listener was added to:
      evt.currentTarget.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });
    viewer.scene.on("pressmove",function(evt) {
      // Calculate the new X and Y based on the mouse new position plus the offset.
      evt.currentTarget.x = evt.stageX + evt.currentTarget.offset.x;
      evt.currentTarget.y = evt.stageY + evt.currentTarget.offset.y;
      // make sure to redraw the stage to show the change:
      viewer.scene.update();   
    });
    viewer.scene.update();
  })();

  function cnvs_getCoordinates(e)
  {
    x = e.clientX;
    y = e.clientY;
    document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + "," + y + ")";
    document.getElementById("bx").innerHTML = x;
    document.getElementById("by").innerHTML = y;
  }
   
  function cnvs_clearCoordinates()
  {
    document.getElementById("xycoordinates").innerHTML="";
  }

</script>