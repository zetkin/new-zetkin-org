<?php ztk_view_begin( 'layouts/base' ); ?>
	<?php if ( have_posts() ) : ?>
		<?php if ( is_home() && ! is_front_page() ) : ?>
			<header>
				<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
			</header>
		<?php endif; ?>

		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>

			<?php the_content(); ?>
		<?php endwhile; ?>

		<?php the_posts_navigation(); ?>
	<?php else : ?>
		<?php esc_html_e( 'No posts found.', 'ztk' ); ?>
	<?php endif; ?>
<?php
ztk_view_end();
