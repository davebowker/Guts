<?php

/*
 * TODO:
 * Enqueue scripts
 * Enqueue style
 * Remove parent theme fluff
 * Remove extra 10px from wp-captions
 * Link to favicons for all devices
 * Meta viewport tags for all devices
 * Better security
 * 
 *
 * TODO: (SUPER USERS)
 * Inline comment management
 * Hashgrid
 * 
 */

/*
 * If Guts is being used as a child theme, undo the functions of the parent theme.
 * This file should contain UNDO functionality only. To add something, that should
 * be placed within theme.php
 */
require_once (get_stylesheet_directory() . '/inc/parent.php');

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
