<?php

function ztk_register_employee_list_block() {
	ztk_register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'ztk_register_employee_list_block' );
