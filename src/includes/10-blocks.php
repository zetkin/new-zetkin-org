<?php

/**
 * Added Zetkin category for Gutenberg Blocks
 */
function ztk_block_categories_all( array $block_categories ): array {
	array_push(
		$block_categories,
		array(
			'slug'  => 'zetkin',
			'title' => __( 'Zetkin Blocks', 'ztk' ),
			'icon'  => 'wordpress',
		)
	);

	return $block_categories;
}
add_filter( 'block_categories_all', 'ztk_block_categories_all', );


function ztk_register_block_type_from_metadata( string $src_dir, array $args = array() ): void {
	$basename  = basename( $src_dir );
	$build_dir = "{$src_dir}/../../../build/blocks/{$basename}";

	register_block_type_from_metadata( $build_dir, $args );
}

/**
 * Require index.php for each block.
 */
function ztk_require_blocks() {
	$files = glob( __DIR__ . '/../blocks/*/index.php' );

	foreach ( $files as $filepath ) {
		// Skip directories starting with `_`.
		if ( basename( dirname( $filepath ) )[0] === '_' ) {
			continue;
		}

		require $filepath;
	}
}
ztk_require_blocks();
