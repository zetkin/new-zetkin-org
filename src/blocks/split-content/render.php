<?php
function render_split_content_block( $attributes, $content ) {
    $image_url = isset( $attributes['imageURL'] ) ? $attributes['imageURL'] : '';
    

    $imageTag = $image_url ? '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr__( 'Selected image', 'custom-block' ) . '">' : '';

    return 
		'<!-- split again -->
				<div ' . get_block_wrapper_attributes() . '>
        	<div class="container">
            <div class="inner-blocks">' . $content . '</div>
            <div class="image-container">' . $imageTag . '</div>
        </div>
    </div>
	<!-- / split again -->';
}
