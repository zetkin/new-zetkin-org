<?php

$media_id = $attributes['mediaId'];
$title    = $attributes['title'];

$cn = fn( $suffix = '') => "wp-block-zetkin-hero-1{$suffix}";

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	ztk_media_img(
		$media_id,
		'3_2',
		array(
			'class' => $cn( '__image' ),
		)
	);
	?>

	<h1 class="<?php echo $cn( '__title' ); ?>"><?php echo $title; ?></h1>
</div>
