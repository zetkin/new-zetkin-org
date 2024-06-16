<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function create_custom_taxonomies() {
    register_taxonomy(
        'custom_taxonomy',
        'post',
        array(
            'label' => __('Custom Taxonomy', 'your-theme'),
            'rewrite' => array('slug' => 'custom_taxonomy'),
            'show_in_rest' => true, // Enable REST API support
            'hierarchical' => true,
        )
    );
}
add_action('init', 'create_custom_taxonomies');
