/**
 * @author Russell Toris - rctoris@wpi.edu
 */

var JOYSTICKTELEOP = JOYSTICKTELEOP || {
  REVISION : '0.3.0'
};

/**
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * Manages connection to the server and all interactions with ROS.
 *
 * Emits the following events:
 *   * 'change' - emitted with a change in speed occurs
 *
 * @constructor
 * @param options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * topic (optional) - the Twist topic to publish to, like '/cmd_vel'
 *   * throttle (optional) - a constant throttle for the speed
 */
JOYSTICKTELEOP.Teleop = function(options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var topic = options.topic || '/cmd_vel';
  // permanent throttle
  var throttle = options.throttle || 1.0;

  // used to externally throttle the speed (e.g., from a slider)
  this.scale = 1.0;

  // linear x and y movement and angular z movement
  var x = 0;
  var y = 0;
  var z = 0;

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : topic,
    messageType : 'geometry_msgs/Twist'
  });

  // sets up a key listener on the page used for keyboard teleoperation
function touch(event) {

    // used to check for changes in speed
    var oldX = x;
    var oldY = y;
    var oldZ = z;
    
    var pub = true;

    var speed = 0;
    // throttle the speed by the slider and throttle constant
//    if (keyDown === true) {
      speed = throttle * that.scale;
//    }

    
      // check which key was pressed
      switch (event.type) {
          case "touchstart":
              event.preventDefault();
            
              break;
          case "touchend":
              document.getElementById("control_ball1").style.left = (window.localStorage.handle_ctrol_width - 200) / 2 + "px";
              document.getElementById("control_ball1").style.top = (window.localStorage.handle_ctrol_height - 200) / 2 + "px";
              x = 0;
              z = 0;

              break;
          case "touchmove":
              document.getElementById("control_ball1").style.top = event.targetTouches[0].pageY - 100 + "px";
              document.getElementById("control_ball1").style.left = event.targetTouches[0].pageX - 100 + "px";

              x = -(event.changedTouches[0].pageY - 1000) / 1000;
              z = (event.changedTouches[0].pageX - 1000) / 1000;
              if (x > 0) {
            	  z = - z;
              }
              break;
          default:
              pub = false;
              break;
      }

      // publish the command

    if (pub === true) {
      var twist = new ROSLIB.Message({
          linear : {
              x : x,
              y : y,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : z
          },
      });
      cmdVel.publish(twist);

      // check for changes
      if (oldX !== x || oldY !== y || oldZ !== z) {
        that.emit('change', twist);
      }
    }
  };

  var body = document.getElementById("control_ball1");//document.getElementsByTagName('body')[0];
  body.addEventListener('touchstart', touch, false);
  body.addEventListener('touchend', touch, false);
  body.addEventListener('touchmove', touch, false);
};
JOYSTICKTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
