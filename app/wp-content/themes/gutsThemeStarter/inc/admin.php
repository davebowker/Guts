<?php

// Use the sites favicon when viewing the dashboard
add_action('admin_head', 'admin_favicon');
function admin_favicon() {
	echo "<link rel='Shortcut Icon' type='image/x-icon' href='" . get_stylesheet_directory_uri() . "/img/favicon.ico' />" . "\n";
}

// Add credit text in wp-admin footer
add_filter('admin_footer_text', 'admin_footer');
function admin_footer() {
	echo "Built on the Guts Framework by <a href='http://davebowker.com/' title='UI/UX Development and Data Visualisation'>Dave Bowker</a>";
}
