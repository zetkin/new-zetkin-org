<?php

$blockSlug = $attributes['blockSlug'] ?? null;

$media_id = $attributes['mediaId'] ?? null;
$title    = $attributes['title'] ?? null;
$isInset = $attributes['isInset'] ?? false;
$imgPos = $attributes['imgPos'] ?? '--imgPosLeft';

$cn = fn ($suffix = '') => $blockSlug.$suffix;
$cn = fn ($suffix = '') => $blockSlug.$suffix;

$blockAttrs = get_block_wrapper_attributes(
	array(
		'class' => ztk_cx(
			array(
				$cn('--is-inset') => $isInset,
				
			)
		),
	)
);

?>
<!-- Split Block -->
<div <?php echo $blockAttrs; ?>>
	<div class="<?php echo $cn('__inner'); ?> <?php echo $cn($imgPos);?>">
		<div class="<?php echo $cn('__image-container'); ?>  ">
			<?php
			ztk_media_img(
				$media_id,
				'3_2',
				array(
					'class' => $cn('__image'),
				)
			);
			?>
		</div>

		<div class="<?php echo $cn('__content-container'); ?>">
			<h1 class="<?php echo $cn('__title'); ?>"><?php echo $title; ?></h1>

			<div class="<?php echo $cn('__inner-blocks'); ?>">
				<?php echo $content; ?>
			</div>
		</div>
	</div>
</div>
<!-- / Split Block -->