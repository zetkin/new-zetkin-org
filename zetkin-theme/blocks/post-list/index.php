<?php

function ztk_register_post_list_block() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register_post_list_block' );
