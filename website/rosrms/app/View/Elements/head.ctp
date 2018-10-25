<?php
/**
 * Default Head Section
 *
 * The default head section will load all necessary JavaScript and CSS styles for the main RMS system.
 *
 * @author		Russell Toris - rctoris@wpi.edu
 * @copyright	2014 Worcester Polytechnic Institute
 * @link		https://github.com/WPI-RAIL/rms
 * @since		RMS v 2.0.0
 * @version		2.0.9
 * @package		app.View.Elements
 */
?>

<head>
	
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php echo __('%s: %s', h($setting['Setting']['title']), h($title_for_layout)); ?>
	</title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->meta('description', '');
		echo $this->Html->meta('keywords', '');
	?>

	<?php if(!isset($style) || $style): ?>
		<!--[if lte IE 8]><?php echo $this->Html->script('../css/ie/html5shiv.min'); ?><![endif]-->
	<?php endif; ?>

	<?php
	echo $this->Html->script(array(
		'jquery.min',
		'rms'
	));

	if(!isset($style) || $style) {
		echo $this->Html->script(array(
			'jquery.dropotron.min',
			'skel.min',
			'skel-layers.min',
			'init.min',
			'rms',
		));
	}

	// check for RWT libraries
	if (isset($rwt)) {
		if (isset($rwt['roslibjs'])) {
			echo $this->Html->script(array(
				'eventemitter2',
				'roslib.min',
			));

		}
		if (isset($rwt['keyboardteleopjs'])) {
			echo $this->Html->script(
				array(
					'//s3.amazonaws.com/cdn.robotwebtools.org/keyboardteleopjs/' . h($rwt['keyboardteleopjs']) . '/keyboardteleop.min.js'
				)
			);
		}
		if (isset($rwt['ros2djs'])) {
			echo $this->Html->script(array(
				'easeljs.min',
				'ros2d',
			));
		}
		if (isset($rwt['nav2djs'])) {
			echo $this->Html->script(array(
				'nav2d',
			));
		}
		if (isset($rwt['ros3djs'])) {
			echo $this->Html->script(array(
				'three.min',
				'//s3.amazonaws.com/cdn.robotwebtools.org/threejs/current/ColladaLoader.min.js',
				'//s3.amazonaws.com/cdn.robotwebtools.org/ColladaAnimationCompress/current/ColladaLoader2.min.js',
				'ros3d.min',
			));
		}
		if (isset($rwt['mjpegcanvasjs'])) {
			echo $this->Html->script(array(
				'rosweb/src/js/mjpegcanvas.min'
			));
		}
		if (isset($rwt['rosqueuejs'])) {
			echo $this->Html->script(array(
				'//s3.amazonaws.com/cdn.robotwebtools.org/rosqueuejs/' . h($rwt['rosqueuejs']) . '/rosqueue.min.js'
			));
		}
		if(isset($rwt['roswebjs'])){
			echo $this->Html->script(array(
				'rosweb/src/js/handlebars.min',
				'rosweb/src/js/templates',
				'rosweb/src/js/bundle',
				'rosweb/src/js/three.min',
				'rosweb/src/js/ros3d.min',
				'rosweb/src/js/widgets.bundle',
				'rosweb/src/js/d3.v4.min'
			));
			echo $this->Html->css(array(
				'rosweb/src/main',
				'rosweb/src/widgets'
			));
		}
		if(isset($rwt['diehl'])){
			echo $this->Html->script(array(
				'diehl/diehl',
				//'diehl/navigation'
			));
			echo $this->Html->css(array(
				'diehl/diehl'
				
			));
		}
	}
	?>

	<?php if(!isset($style) || $style): ?>
		<noscript>
			<?php echo $this->Html->css(array('skel', 'style', 'style-noscript')); ?>
		</noscript>
		<!--[if lte IE 8]><?php echo $this->Html->css('ie/v8'); ?><![endif]-->
		<!--[if lte IE 9]><?php echo $this->Html->css('ie/v9'); ?><![endif]-->
	<?php endif; ?>

	<?php
	// custom CSS
	if (isset($css)) {
		echo $this->Html->css($css);
	}
	?>

	<?php if (!$setting['Setting']['analytics']): ?>
		
	<?php endif; ?>
	

	<?php
	echo $this->fetch('meta');
	echo $this->fetch('css');
	echo $this->fetch('script');
	?>
	
</head>
