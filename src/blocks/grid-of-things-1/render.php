<?php

$media_id = $attributes['mediaId'] ?? null;
$kicker   = $attributes['kicker'] ?? null;
$title    = $attributes['title'] ?? null;

$cn = fn( $suffix = '') => "wp-block-zetkin-grid-of-things-1{$suffix}";

?>

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
			<div class="<?php echo $cn( '__kicker' ); ?>"><?php echo $kicker; ?></div>

			<h1 class="<?php echo $cn( '__title' ); ?>"><?php echo $title; ?></h1>

			<?php echo $content; ?>
		</div>
	</div>
</div>
