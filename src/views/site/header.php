<header class="<?php echo $cx( '' ); ?>">
	<div class="<?php echo $cx( '__inner' ); ?>">
	<?php
		ztk_svg(
			'logo-1',
			array(
				'class' => $cx( '__logo-1' ),
			)
		);
		?>

		<?php
		ztk_svg(
			'logo-2',
			array(
				'class' => $cx( '__logo-2' ),
			)
		);
		?>

		<nav class="<?php echo $cx( '__nav' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
					'container'      => null,
				)
			);
			?>
		</nav>
	</div>
</header>
