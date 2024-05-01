<?php

/**
 * Require index.php for each block.
 */
function ztk_require_blocks() {
	$files = glob( __DIR__ . '/../build/*/index.php' );

	foreach ( $files as $filepath ) {
		// Skip directories starting with `_`.
		if ( basename( dirname( $filepath ) )[0] === '_' ) {
			continue;
		}

		require $filepath;
	}
}
ztk_require_blocks();
