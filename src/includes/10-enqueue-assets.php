<?php

function ztk_enqueue_script( string $slug ):void {
	$asset_file = include( __DIR__ . "/../../build/{$slug}.asset.php" );

	wp_enqueue_script(
		"ztk-{$slug}",
		get_template_directory_uri() . "/build/{$slug}.js",
		$asset_file['dependencies'],
		$asset_file['version']
	);
}
function ztk_enqueue_style( string $slug ):void {
	$asset_file = include( __DIR__ . "/../../build/{$slug}.asset.php" );

	wp_enqueue_style(
		"ztk-{$slug}",
		get_template_directory_uri() . "/build/{$slug}.css",
		array(),
		$asset_file['version'],
		'all'
	);
}

function ztk_enqueue_scripts() {
	ztk_enqueue_script( 'view' );
	ztk_enqueue_style( 'style' );
}
add_action( 'wp_enqueue_scripts', 'ztk_enqueue_scripts' );

function ztk_enqueue_block_editor_assets() {
	ztk_enqueue_script( 'editor' );
	ztk_enqueue_style( 'editor' );
}
add_action('enqueue_block_editor_assets', 'ztk_enqueue_block_editor_assets');

function ztk_enqueue_block_assets() {
	ztk_enqueue_style( 'style' );
}
add_action('enqueue_block_assets', 'ztk_enqueue_block_assets');