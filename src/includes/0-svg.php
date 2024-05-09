<?php

/**
 * Output an SVG optionally adding attributes to it's root element.
 */
function ztk_svg( string $name, array $atts = array() ): void {
	$path = __DIR__ . "/../svg/{$name}.svg";

	$html = file_get_contents( $path );

	if ( $atts ) {
		$doc = new DOMDocument();
		@$doc->loadXML( $html );

		$el = $doc->documentElement;

		foreach ( $atts as $name => $value ) {
			$el->setAttribute( $name, $value );
		}

		$html = $doc->saveHTML( $el );
	}

	echo $html;
}
