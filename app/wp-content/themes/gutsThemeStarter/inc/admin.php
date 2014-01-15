<?php

// Use the sites favicon when viewing the dashboard
add_action('admin_head', 'admin_favicon');
function admin_favicon() {
	echo "<link rel='Shortcut Icon' type='image/x-icon' href='" . get_stylesheet_directory_uri() . "/img/favicon.ico' />" . "\n";
}

// Add credit text in wp-admin footer
add_filter('admin_footer_text', 'admin_footer');
function admin_footer() {
	echo "Built on the Guts Framework by <a href='http://davebowker.com/' title='UI/UX Development and Data Visualisation' target='_blank'>Dave Bowker</a> (<a href='http://twitter.com/davebowker' target='_blank'>@davebowker</a>)";
}

// Add extra contact methods to user profiles
add_filter('user_contactmethods', 'extend_user_contactmethods');
function extend_user_contactmethods($contactmethods) {
	$contactmethods['linkedin'] = 'LinkedIn Username';
	$contactmethods['twitter'] = 'Twitter Username';
	$contactmethods['facebook'] = 'Facebook Username';
	$contactmethods['skype'] = 'Skype Username';
	return $contactmethods;
}

// Disable WP update notice for non-admins
if (!current_user_can('edit_users')) {
	add_action('admin_menu', 'hide_update_notice');
	function hide_update_notice() {
		remove_action('admin_notices', 'update_nag');
	}

}

// Load in a stylesheet for the admin
add_action('admin_print_styles', 'admin_style');
function admin_style() {
	wp_enqueue_style('admin_print_styles', get_stylesheet_directory_uri() . '/inc/admin-style.css');
}
