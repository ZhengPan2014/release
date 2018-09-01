<?php
App::uses('InterfaceController', 'Controller');

/**
* 
*/
class AGVHtmlInterfaceController extends InterfaceController
{
	
	public function view(){
		$this->set('title_for_layout', 'AGVHtml Interface');
		$this->set('rwt', array('roslibjs' => 'current'));
	}
}