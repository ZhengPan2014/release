<?php
App::uses('InterfaceController', 'Controller');

/**
* 
*/
class RosWebInterfaceController extends InterfaceController
{
	
	public function view(){
		$this->set('title_for_layout', 'RosWeb Interface');
		$this->set('rwt', array('roslibjs' => 'current','mjpegcanvasjs' => 'current','roswebjs' => 'rosweb'));
	}
}