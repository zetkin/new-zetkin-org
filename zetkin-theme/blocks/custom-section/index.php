<?php

function ztk_register_custom_section_block() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register_custom_section_block' );
