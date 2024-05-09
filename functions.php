<?php

/**
 * Require ./src/includes in natural order.
 */
function ztk_require_includes() {
	$files = glob( __DIR__ . '/src/includes/*.php' );

	// Can't trust that glob always returns files in same order
	// https://glotpress.trac.wordpress.org/ticket/211
	natsort( $files );

	foreach ( $files as $filepath ) {
		require $filepath;
	}
}

ztk_require_includes();
