<?php

/*
 * Theme Setup
 */

require_once( get_stylesheet_directory() . '/inc/admin.php' );



/*
 * Require Plugins
 */

//require_once( get_template_directory() . '/lib/class-tgm-plugin-activation.php' );

add_filter( 'template_include', 'var_template_include', 1000 );
function var_template_include( $t ){
     $GLOBALS['current_theme_template'] = basename($t);
     return $t;
}

function get_current_template( $echo = false ) {
     if( !isset( $GLOBALS['current_theme_template'] ) )
         return false;
     if( $echo )
         echo $GLOBALS['current_theme_template'];
     else
         return $GLOBALS['current_theme_template'];
}