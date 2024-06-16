<?php

require_once plugin_dir_path( __FILE__ ) . 'custom-taxonomies.php';

function ztk_register_load_post_test_block() {
	ztk_register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register_load_post_test_block' );


