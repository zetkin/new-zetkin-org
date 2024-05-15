<?php

$class = $attributes['className'] ?? null;

$block_attributes = get_block_wrapper_attributes(
	array(
		'class' => $class,
	)
);
?>

<div <?php echo $block_attributes; ?>>
	<?php echo $content; ?>
</div>
