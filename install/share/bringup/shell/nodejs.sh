if [[ $NODE_HOME ]]; then
    if [ -d "$NODE_HOME" ]; then
#        cd ~/catkin_ws/www/server;
#        node server.js;        
        cd ~/catkin_ws/www/ros_webapp;
        node app.js;
    fi;
fi;
