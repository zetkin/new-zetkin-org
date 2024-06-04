<?php
/* require_once __DIR__ . '/render.php'; */
function ztk_register_hero_1_block() {
	ztk_register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register_hero_1_block' );
