<?php
 
/*
 * Use the sites favicon when browsing wp-admin
 */
function admin_favicon() {
	echo '<link rel="Shortcut Icon" type="image/x-icon" href="'.get_stylesheet_directory_uri().'/img/favicon.ico" />' . "\n";
}
add_action('admin_head', 'admin_favicon');

/*
 * 
 */
function admin_footer() {
	echo 'Website designed and built by <a href="http://davebowker.com/" title="Web and graphic designer">Dave Bowker</a>';
} 
add_filter('admin_footer_text', 'admin_footer');


