/**
 * JS lib for innolux line I/O temporary webapp
 * Auther: GrayLoo @ 2018-03-20
 * Requirements: roslib.js
 * 
 * Usage:
 * 
 * let ros = new ROSLIB.Ros();
 * ros.connect(<rosbridge websocket url>);
 * ros.on("connection", () => {
 *     let waypointUtils = new WaypointsUtils(ros);
 *     // check if there exists a waypoint
 *     waypointUtils.hasWaypoint("waypoint_name");
 *     // execute a waypoint list
 *     waypointUtils.execute(["waypoint_1", "waypoint_2", "waypoint_3"]);
 *     waypointUtils.executeOne("waypoint");
 *     // cancel executing
 *     if (waypointUtils.AGVStatus.status !== NAV_CTRL_STATUS.IDLING)
 *     {
 *         waypointUtils.cancel();
 *     }
 *     // go back home
 *     waypointUtils.goHome();
 * });
 * 
 */
"use strict";

let NAV_CTRL_STATUS = {
    ERROR: -1,
    IDLING: 0,
    RUNNING: 1,
    PAUSED: 2,
    COMPLETED: 3,
    CANCELLED: 4,
    SUB_CANCELLED: 5
};

class WaypointsUtils
{
    /**
     * constructor
     * @param {ROSLIB.Ros} ros 
     * @param {string} namespace : "" by default
     */
    constructor(ros, namespace="")
    {
        this.ros = ros;
        this.namespace = namespace;
        this.waypoints = [];
        this.trajectories = [];
        this.waitWaypoint = null;
        this.homeWaypoint = null;
        this.pendingTask = null;
        this.AGVStatus = {
            waypoint_name: "",
            status: NAV_CTRL_STATUS.IDLING
        };
        // ros waypoints
        this.waypointsTopic = this._topic("/waypoints", "yocs_msgs/WaypointList");
        this.waypointsTopic.subscribe((waypoints) => {
            this.waypoints = waypoints.waypoints;
            // waypoint for waiting at work station
            this.waitWaypoint = this._getWaypointByName("wait");
            // waypoint for home
            this.homeWaypoint = this._getWaypointByName("home");
        });
        //  ros trajectories
        this.trajectoriesTopic = this._topic("/trajectories", "yocs_msgs/TrajectoryList");
        this.trajectoriesTopic.subscribe((trajectories) => {
            this.trajectories = trajectories.trajectories;
            if (this.pendingTask)
            {
                if (this._getTrajectoryByName(this.pendingTask.goal_name))
                {
                    this.navCtrlTopic.publish(this.pendingTask);
                    this.pendingTask = null;
                }
                else
                {
                    // TODO: add trajectory failed
                }
            }
        });
        // ros trajectory add
        this.trajAddTopic = this._topic("/trajectory_add", "yocs_msgs/Trajectory");
        // ros navigation control
        this.navCtrlTopic = this._topic("/nav_ctrl", "yocs_msgs/NavigationControl");
        // navigation control status
        this.navCtrlStatusTopic = this._topic("/nav_ctrl_status", "yocs_msgs/NavigationControlStatus");
        this.navCtrlStatusTopic.subscribe((status) => {
            this.AGVStatus = status;
        });

        this.waypointUserPubTopic = this._topic("/waypoint_user_pub", "std_msgs/String");
        setInterval(() => {
            let batteryMsg = new ROSLIB.Message({
                data: "power"
            });
            this.waypointUserPubTopic.publish(batteryMsg);
        }, 1000);
    }

    /**
     * check if there exists a specified waypoint
     * @param {string} waypointName 
     * @returns {bool}
     */
    hasWaypoint(waypointName)
    {
        for (let i = 0; i < this.waypoints.length; i++)
        {
            if (waypointName === this.waypoints[i].name)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * execute waypoints
     * @param {vector<string>} waypointsList : waypoint names
     * @returns {bool} : false if there exists waypoint which cannot be found
     */
    execute(waypointsList)
    {
        let trajName = "Traj_";
        let waypoints = [];
        for (let i = 0; i < waypointsList.length; i++)
        {
            let wp = this._getWaypointByName(waypointsList[i]);
            if (!wp)
            {
                return false;
            }
            waypoints.push(wp);
            // wait
            waypoints.push(this.waitWaypoint);
        }
        // back home
        waypoints.push(this.homeWaypoint);
        let trajAddMsg = new ROSLIB.Message({
            name: trajName,
            waypoints: waypoints
        });
        this.trajAddTopic.publish(trajAddMsg);
        this.pendingTask = this._navCtrlMsg(trajName, 1);
        return true;
    }

    /**
     * execute one waypoint
     * @param {string} waypointName 
     * @returns {bool} true if successfully executed, false otherwise
     */
    executeOne(waypointName)
    {
        if (!this.hasWaypoint(waypointName))
        {
            // waypoint not found
            console.warn(`${waypointName} not found`);
            return false;
        }
        if (this.AGVStatus.status !== NAV_CTRL_STATUS.IDLING)
        {
            // AGV is busy
            console.warn(`AGV status: ${this.AGVStatus} when try to go to ${waypointName}`);
            return false;
        }
        console.log(`Published CMD: ${waypointName}`);
        this.navCtrlTopic.publish(this._navCtrlMsg(waypointName, 1));
        return true;
    }

    /**
     * cancel all executing waypoints
     */
    cancel()
    {
        console.log(`Published CMD: CANCEL`);
        this.navCtrlTopic.publish(this._navCtrlMsg("", 0));
    }

    /**
     * go back home
     */
    goHome()
    {
        console.log(`Published CMD: ${this.homeWaypoint.name}`);
        let msg = this._navCtrlMsg(this.homeWaypoint.name, 1);
        this.navCtrlTopic.publish(msg);
    }

    /**
     * get waypoint by name
     * @param {string} name : waypoint name
     * @returns {yocs_msgs/Waypoint} : undefined if not found
     */
    _getWaypointByName(name)
    {
        for (let i = 0; i < this.waypoints.length; i++)
        {
            let waypoint = this.waypoints[i];
            if (waypoint.name === name)
            {
                return waypoint;
            }
        }
    }

    /**
     * get trajectory by name
     * @param {string} name : trajectory name
     * @returns {yocs_msgs/Trajectory} : undefined if not found
     */
    _getTrajectoryByName(name)
    {
        for (let i = 0; i < this.trajectories.length; i++)
        {
            let traj = this.trajectories[i];
            if (traj.name === name)
            {
                return traj;
            }
        }
    }

    /**
     * @param {string} trajName 
     * @param {int} control
     * @returns {ROSLIB.Message}
     */
    _navCtrlMsg(trajName, control)
    {
        return new ROSLIB.Message({
            goal_name: trajName,
            control: control
        });
    }

    /**
     * @param {string} topicName 
     * @param {string} msgType 
     * @returns {ROSLIB.Topic}
     */
    _topic(topicName, msgType)
    {
        return new ROSLIB.Topic({
            ros: this.ros,
            name: this._withNs(topicName),
            messageType: msgType
        });
    }

    /**
     * @param {string} name 
     * @returns {string}
     */
    _withNs(name)
    {
        let name_ = name.startsWith("/") ? name : "/" + name;
        if (this.namespace === '' || this.namespace === '/')
        {
            return name_;
        }
        return this.namespace.startsWith("/") ? this.namespace + name_ : "/" + this.namespace + name_;
    }
}