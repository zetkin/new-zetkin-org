<?php

function ztk_view( string $slug, array $args = array() ): void {
	$path = locate_template( array( "src/views/{$slug}.php" ) );

	if ( empty( $path ) ) {
		ztk_view(
			'view-error',
			array(
				'message' => sprintf( 'View "%s" not found.', addslashes( $slug ) ),
			)
		);

		return;
	}

	if ( ! isset( $args['cx'] ) ) {
		$cx_prefix = str_replace( '/', '-', $slug );

		$args['cx'] = ztk_make_bem_cx( $cx_prefix );
	}

	try {
		$ob_level = ob_get_level();

		ob_start();

		_ztk_load_view( $path, $args );

		echo ob_get_clean();
	} catch ( Throwable $exception ) {
		while ( $ob_level < ob_get_level() ) {
			ob_end_clean();
		}

		error_log( $exception );

		if ( WP_DEBUG_DISPLAY ) {
			$message = $exception->getMessage();
		} else {
			$message = sprintf( 'View "%s" failed to render.', addslashes( $slug ) );
		}

		ztk_view(
			'view-error',
			array(
				'message' => $message,
			)
		);
	}

}

function ztk_view_begin( string $slug, array $args = array() ): void {
	global $ztk_template_stack;

	$ztk_template_stack ??= array();

	ob_start();

	$ztk_template_stack[] = array( $slug, $args );
}

function ztk_view_end(): void {
	global $ztk_template_stack;

	$ztk_template_stack ??= array();

	list( $slug, $args ) = array_pop( $ztk_template_stack );

	$args['content'] = ob_get_clean();

	ztk_view( $slug, $args );
}

function _ztk_load_view( string $_template_path, array $_args ): void {
	//phpcs:ignore WordPress.PHP.DontExtract.extract_extract
	extract( $_args, EXTR_SKIP );

	require $_template_path;
}
