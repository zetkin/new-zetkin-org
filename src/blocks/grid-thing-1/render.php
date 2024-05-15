<?php

$title   = $attributes['title'] ?? null;
$content = $attributes['content'] ?? null;
$url     = $attributes['url'] ?? null;

$cn = fn( $suffix = '') => "wp-block-zetkin-grid-thing-1{$suffix}";

$tag_name = $url ? 'a' : 'div';

$block_attributes = get_block_wrapper_attributes(
	array_filter(
		array(
			'href' => $url,
		)
	)
);

?>

<<?php echo $tag_name; ?> <?php echo $block_attributes; ?>>
	<h2 class="<?php echo $cn( '__title' ); ?>">
		<?php echo $title; ?>
	</h2>

	<div class="<?php echo $cn( '__content' ); ?>">
		<?php echo $content; ?>
	</div>

	<?php if ( $url ) : ?>
		<div class="<?php echo $cn( '__read-more' ); ?>">
			<?php echo __( 'Read More', 'ztk' ); ?>
		</div>
	<?php endif; ?>
</<?php echo $tag_name; ?>>
