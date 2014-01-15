<?php

/*
 * Undo parent theme settings
 */

add_action('wp_print_styles', 'removeStyles', 10);
function removeStyles() {
	// Google Font
	wp_dequeue_style('twentyfourteen-lato');
	wp_deregister_style('twentyfourteen-lato');

	// IE Styles for Parent Theme (If we change our child theme enough these fixes won't make sense)
	wp_dequeue_style('twentyfourteen-ie');
	wp_deregister_style('twentyfourteen-ie');
	
	
	// Remove genericons from the parent theme, add them into the child theme directly
	wp_dequeue_style('genericons');
	wp_deregister_style('genericons');
}

add_action('wp_print_scripts', 'removeScripts', 10);
function removeScripts() {
	wp_dequeue_script('twentyfourteen-script');
	wp_deregister_script('twentyfourteen-script');
}
