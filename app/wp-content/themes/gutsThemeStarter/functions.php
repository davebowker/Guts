<?php

/*
 * If Guts is being used as a child theme, undo the functions of the parent theme.
 * This file should contain UNDO functionality only. To add something, that should
 * be placed within theme.php
 */
//require_once (get_stylesheet_directory() . '/inc/parent.php');

/*
 * Functionality for admin pages, performance and security
 */

require_once (get_stylesheet_directory() . '/inc/admin.php');

/*
 * Functionality for the theme
 */
require_once (get_stylesheet_directory() . '/inc/theme.php');

/*
 * Require Plugins
 */

/*
 * TODO:
 * Enqueue jquery
 * concat files
 * check db functions
 * remove extra 10px from wp-captions
 * inline comment editing???
 *
 */
