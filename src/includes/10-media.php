<?php

function ztk_add_image_sizes() {
	// We register a small 3:2 to make it more likely that images can be scaled.
	add_image_size( '3_2', 640, 427, true );
	// This size should only be used for srcsets.
	add_image_size( '3_2-lg', 1280, 853, true );
}
add_action( 'after_setup_theme', 'ztk_add_image_sizes' );
