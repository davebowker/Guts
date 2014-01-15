<?php

/*
 * Add theme support
 */
add_theme_support('automatic-feed-links');
add_theme_support('post-thumbnails');

/*
 * Change theme support defaults
 */
set_post_thumbnail_size(300, 200, true);

// Create custom sizes
// This is then pulled through to your theme using the_post_thumbnail('image_name');
if (function_exists('add_image_size')) {
	add_image_size('square', 60, 60, true);
	// square
}

/*
 * Custom
 */

// Call Googles HTML5 Shim, but only for users on old versions of IE
add_action('wp_head', 'wpfme_IEhtml5_shim');
function wpfme_IEhtml5_shim() {
	global $is_IE;
	if ($is_IE)
		echo '<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->';
}

// Call the google CDN version of jQuery for the frontend
// Make sure you use this with wp_enqueue_script('jquery'); in your header
if (!is_admin())
	add_action("wp_enqueue_scripts", "wpfme_jquery_enqueue", 11);
function wpfme_jquery_enqueue() {
	wp_deregister_script('jquery');
	wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", false, null);
	wp_enqueue_script('jquery');
}

// Enable thumbnails

// Enable widgetable sidebar
// You may need to tweak your theme files, more info here - http://codex.wordpress.org/Widgetizing_Themes
if (function_exists('register_sidebar'))
	register_sidebar(array('name' => 'Unused Widget Holder', 'id' => 'unused_widget_holder', 'description' => 'Not sure if you want to use that widget you\'ve spent time customising or not? Drag it in here to save it\'s settings. Anything in here will not be shown in the theme.', 'before_widget' => '<aside>', 'after_widget' => '</aside>', 'before_title' => '<h1>', 'after_title' => '</h1>'));

// Set a maximum width for Oembedded objects
if (!isset($content_width))
	$content_width = 960;

// Put post thumbnails into rss feed
add_filter('the_excerpt_rss', 'wpfme_feed_post_thumbnail');
add_filter('the_content_feed', 'wpfme_feed_post_thumbnail');
function wpfme_feed_post_thumbnail($content) {
	global $post;
	if (has_post_thumbnail($post -> ID)) {
		$content = '' . $content;
	}
	return $content;
}

//change amount of posts on the search page - set here to 100
add_action('pre_get_posts', 'wpfme_search_results_per_page');
function wpfme_search_results_per_page($query) {
	global $wp_the_query;
	if ((!is_admin()) && ($query === $wp_the_query) && ($query -> is_search())) {
		$query -> set('wpfme_search_results_per_page', 20);
	}
	return $query;
}

// Add a body class if there's a sidebar
add_filter('body_class', 'wpfme_has_sidebar');
function wpfme_has_sidebar($classes) {
	if (is_active_sidebar('sidebar')) {
		// add 'class-name' to the $classes array
		$classes[] = 'has_sidebar';
	}
	// return the $classes array
	return $classes;
}

// Stop images getting wrapped up in p tags when they get dumped out with the_content() for easier theme styling
add_filter('the_content', 'wpfme_remove_img_ptags');
function wpfme_remove_img_ptags($content) {
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

//custom excerpt length
add_filter('excerpt_length', 'wpfme_custom_excerpt_length');
function wpfme_custom_excerpt_length($length) {
	return 55;
}
