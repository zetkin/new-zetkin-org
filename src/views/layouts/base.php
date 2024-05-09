<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>
<body <?php body_class( $cx( '' ) ); ?>>
	<?php wp_body_open(); ?>

	<?php ztk_view( 'site/header' ); ?>

	<main class="<?php echo $cx( '__main' ); ?>">
		<?php echo $content; ?>
	</main>

	<?php ztk_view( 'site/footer' ); ?>

	<?php wp_footer(); ?>
</body>
</html>
