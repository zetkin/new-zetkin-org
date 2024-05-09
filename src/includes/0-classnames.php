<?php

/**
 * Conditionally joins DOM class names.
 *
 * The returned string is escaped and can safely be used for attributes.
 *
 * @param mixed ...$classes The classes to join.
 * @param string $prefix An optional prefix to use for classes that start with
 *                       `-` or `_`.
 * @return string The joined classes escaped for use as an attribute.
 */
function ztk_cx( array $classes, string $prefix = '' ):string {
	if ( ! $classes ) {
		return '';
	}

	$effective_classes = array();

	array_walk_recursive(
		$classes,
		function ( $value, $key ) use ( $prefix, &$effective_classes ) {
			if ( is_int( $key ) ) {
				$class = $value;
			} elseif ( $value ) {
				$class = $key;
			} else {
				return;
			}

			$class = (string) $class;

			if ( $class === '' || '-' === $class[0] || '_' === $class[0] ) {
				$class = "{$prefix}{$class}";
			}

			array_push( $effective_classes, ...explode( ' ', (string) $class ) );
		}
	);

	$effective_classes = array_map( 'trim', $effective_classes );
	$effective_classes = array_filter( $effective_classes );

	return esc_attr( implode( ' ', $effective_classes ) );
}

/**
 * Create a cx() like closure that automatically prefixes classes that begin
 * with `-` or `_`.
 *
 * This makes it easier to generate BEM classes.
 */
function ztk_make_bem_cx( string $prefix ): Closure {
	return fn( ...$classes) => ztk_cx( $classes, $prefix );
}
