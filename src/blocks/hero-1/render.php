<?php

$media_id = $attributes['mediaId'];
$title    = $attributes['title'];

$cn = fn( $suffix = '') => "wp-block-zetkin-hero-1{$suffix}";

?>
<!-- Hero Block -->
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="<?php echo $cn( '__inner' ); ?>">
		<div class="<?php echo $cn( '__image-container' ); ?>">
			<?php
			ztk_media_img(
				$media_id,
				'3_2',
				array(
					'class' => $cn( '__image' ),
				)
			);
			?>
		</div>

		<div class="<?php echo $cn( '__content-container' ); ?>">
			<h1 class="<?php echo $cn( '__title' ); ?>"><?php echo $title; ?></h1>

			<div class="<?php echo $cn( '__inner-blocks' ); ?>">
				<?php echo $content; ?>
			</div>
		</div>
	</div>
</div>
<!-- / Hero Block -->
