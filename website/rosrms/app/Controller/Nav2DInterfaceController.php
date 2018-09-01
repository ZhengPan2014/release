<?php
App::uses('InterfaceController', 'Controller');

/**
 * Basic Interface Controller
 *
 * The basic interface controller. This is a simple interface with a camera feed and keyboard teleoperation.
 *
 * @author		Russell Toris - rctoris@wpi.edu
 * @copyright	2014 Worcester Polytechnic Institute
 * @link		https://github.com/WPI-RAIL/rms
 * @since		RMS v 2.0.0
 * @version		2.0.9
 * @package		app.Controller
 */
class Nav2DInterfaceController extends InterfaceController {

/**
 * The basic view action. All necessary variables are set in the main interface controller.
 *
 * @return null
 */
	public function view() {
		// set the title of the HTML page
		$this->set('title_for_layout', 'Nav2D Interface');
		// we will need some RWT libraries
		$this->set('rwt', array('roslibjs' => 'current','nav2djs' => 'current','ros2djs' => 'current'));
	}
}
