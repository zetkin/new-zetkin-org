<?php

$post_type       = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
$category        = isset( $attributes['category'] ) ? $attributes['category'] : 1;
$number_of_posts = isset( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 5;

$args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $number_of_posts,
);

if ( $post_type === 'post' ) {
	$args['cat'] = $category;
} else {
	// Get the taxonomies associated with the post type
	$taxonomies = get_object_taxonomies( $post_type );

	// Use the first taxonomy for the tax_query
	// If your post type uses a specific taxonomy for categories, replace $taxonomies[0] with the slug of that taxonomy
	$args['tax_query'] = array(
		array(
			'taxonomy' => $taxonomies[0],
			'terms'    => $category,
		),
	);
}

$query = new WP_Query( $args );

?>

<ul <?php echo get_block_wrapper_attributes(); ?>>
	<?php while ( $query->have_posts() ) : ?>
		<?php $query->the_post(); ?>
		<li>
			<a href="<?php echo esc_url( get_permalink() ); ?>">
				<?php echo get_the_title(); ?>
			</a>
		</li>
	<?php endwhile; ?>
	<?php wp_reset_postdata(); ?>
</ul>
