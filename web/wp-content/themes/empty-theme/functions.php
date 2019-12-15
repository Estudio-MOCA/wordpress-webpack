<?php
/**
 * Author: Estudio MOCA 2020
 */
add_theme_support('post-thumbnails');
add_theme_support('menus');
//add_theme_support('woocommerce'); // If has Woocommerce plugin

//Thumbnails examples
add_image_size('example-thumb', 300, 0, true);

//Clean Wordpress Emojis
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');

// Fix security with xmlrpc
add_action('init', function () {
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
});
add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', function ($methods) {
    unset($methods['pingback.ping']);
    return $methods;
});

function mc_enqueue_style()
{
    wp_enqueue_style('moca-template-css', get_template_directory_uri() . '/assets/css/main.css', false);
}

function mc_enqueue_script()
{
    wp_enqueue_script('moca-template-js', get_template_directory_uri() . '/assets/js/app.js', false);
}

add_action('wp_enqueue_scripts', 'mc_enqueue_style');
add_action('wp_enqueue_scripts', 'mc_enqueue_script');