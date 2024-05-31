<?php
require_once __DIR__ . '/render.php';

function ztk_register_split_content_block() {
	ztk_register_block_type_from_metadata( __DIR__,array(
		'render_callback' => 'render_split_content_block',
	) );
}
add_action( 'init', 'ztk_register_split_content_block' );
