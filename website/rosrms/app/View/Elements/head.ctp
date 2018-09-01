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
		'//code.jquery.com/jquery-1.10.2.min.js',
		'rms'
	));

	if(!isset($style) || $style) {
		echo $this->Html->script(array(
			'jquery.dropotron.min',
			'skel.min',
			'skel-layers.min',
			'init.min',
			'rms'
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
				'mjpegcanvas.min'
			));
		}
		if (isset($rwt['rosqueuejs'])) {
			echo $this->Html->script(array(
				'//s3.amazonaws.com/cdn.robotwebtools.org/rosqueuejs/' . h($rwt['rosqueuejs']) . '/rosqueue.min.js'
			));
		}
		if(isset($rwt['roswebjs'])){
			echo $this->Html->script(array(
				'handlebars.min',
				'templates',
				'bundle',
				'three.min',
				//'ros3d.min',
				'widgets.bundle',
				'd3.v4.min'
			));
			echo $this->Html->css(array(
				'main',
				'widgets'
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
		<?php echo $this->Html->css('main'); ?>
		<?php echo $this->Html->css('widgets'); ?>
	<?php endif; ?>

	<?php
	// custom CSS
	if (isset($css)) {
		echo $this->Html->css($css);
	}
	?>

	<?php if ($setting['Setting']['analytics']): ?>
		<script>
			var _gaq = _gaq || [];
			_gaq.push(["_setAccount", "<?php echo h($setting['Setting']['analytics']); ?>"]);
			_gaq.push(["_trackPageview"]);
			(function() {
			var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
			ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
			var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	<?php endif; ?>

	<?php
	echo $this->fetch('meta');
	echo $this->fetch('css');
	echo $this->fetch('script');
	?>
</head>
