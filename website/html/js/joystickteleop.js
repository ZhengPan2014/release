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
  var handleKey = function(joyCode) {
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

      var joyCode = joyCode || window.event;
      // check which key was pressed
      switch (joyCode.type) {
          case "touchstart":
              document.getElementById("control_ball").src = image2.src;

              break;
          case "touchend":
              document.getElementById("control_ball").style.top = 400 + "px";
              document.getElementById("control_ball").style.left = 400 + "px";
              document.getElementById("control_ball").src = image1.src;
              x = 0;
              z = 0;

              break;
          case "touchmove":
              document.getElementById("control_ball").style.top = event.changedTouches[0].pageY - 100 + "px";
              document.getElementById("control_ball").style.left = event.changedTouches[0].pageX - 100 + "px";

              x = - (event.changedTouches[0].pageY - 500) / 1000;
              z = (event.changedTouches[0].pageX - 500) / 1000;
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

            image1 = new Image();
            image1.src = "/images/control_ball.png";
            image2 = new Image();
            image2.src = "/images/control_ball2.png";

  var body = document.getElementById("control_ball");//document.getElementsByTagName('body')[0];
  body.addEventListener('touchstart', function (e) {
    handleKey(e);
  }, false);
  body.addEventListener('touchend', function (e) {
    handleKey(e);
  }, false);
  body.addEventListener('touchmove', function (e) {
      handleKey(e);
  }, false);
};
JOYSTICKTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
