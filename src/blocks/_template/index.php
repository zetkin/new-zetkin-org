<?php

function ztk_register__block() {
	ztk_register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register__block' );
