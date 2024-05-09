<?php

function ztk_media_img( mixed $image, string $size = 'full', array $atts = array() ):void {
	if ( is_array( $image ) ) {
		$image = $image['id'] ?? null;
	}

	if ( ! isset( $atts['sizes'] ) ) {
		$atts['sizes'] = '100vw';
	}

	if ( ! $image || ! wp_attachment_is_image( $image ) ) {
		return;
	}

	echo wp_get_attachment_image( $image, $size, false, $atts );
}
