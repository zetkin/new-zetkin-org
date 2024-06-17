<?php
// Get the attributes from the block

var_dump($attributes);

$attributes = $block->attributes;

// Get the taxonomy and term values from the attributes
$taxonomy = isset($attributes['taxonomy']) ? $attributes['taxonomy'] : null;
$term = isset($attributes['term']) ? $attributes['term'] : null;

// Get the taxonomies, terms, postTitle, and featuredImage values from the state variables
$taxonomies = isset($attributes['taxonomies']) ? $attributes['taxonomies'] : null;
$terms = isset($attributes['terms']) ? $attributes['terms'] : null;
$postTitle = isset($attributes['postTitle']) ? $attributes['postTitle'] : null;
$featuredImage = isset($attributes['featuredImage']) ? $attributes['featuredImage'] : null;

// Start the output buffer
ob_start();

// Render the block
?>
<div class="wp-block-your-block-name">
    <p><?php _e('Recent Post by Taxonomy', 'your-theme'); ?></p>
    <?php if ($postTitle): ?>
        <p>
            <?php _e('Post Title:', 'your-theme'); ?> <?php echo $postTitle; ?>
        </p>
    <?php endif; ?>
    <?php if ($featuredImage): ?>
        <img src="<?php echo $featuredImage; ?>" alt="<?php _e('Featured image', 'your-theme'); ?>" />
    <?php endif; ?>
</div>
<?php

// End the output buffer and return its contents
return ob_get_clean();