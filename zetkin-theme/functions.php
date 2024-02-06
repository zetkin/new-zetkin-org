<?php
/**
 * Zetkin functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Zetkin
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function slug_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Zetkin, use a find and replace
		* to change 'slug' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'slug', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'slug' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'slug_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'slug_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function slug_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'slug_content_width', 640 );
}
add_action( 'after_setup_theme', 'slug_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function slug_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'slug' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'slug' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'slug_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function slug_scripts() {
	wp_enqueue_style( 'slug-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'slug-style', 'rtl', 'replace' );

	wp_enqueue_script( 'slug-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'slug_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}





/** 
 * Encue all .js file in /js/ 
 */
function zetkin_enqueue_folder_scripts() {
   $script_directory = get_template_directory() . '/js/';
   $script_url = get_template_directory_uri() . '/js/';
   $script_files = glob($script_directory . '*.js');

   foreach ($script_files as $file) {
       $file_url = $script_url . basename($file);
       $file_slug = 'script-' . basename($file, '.js');

       wp_enqueue_script($file_slug, $file_url, array(), false, true);
   }
}
add_action('wp_enqueue_scripts', 'zetkin_enqueue_folder_scripts');

/**
 * Encue fontloading css
 */
function zetkin_enqueue_styles() {
   
   
   // Here's how you enqueue your custom stylesheet:
   // The handle 'mytheme-custom-style' is a name you give to your stylesheet, which should be unique.
   // The second parameter is the path to your stylesheet.
   // You can use get_template_directory_uri() for a parent theme, or get_stylesheet_directory_uri() for a child theme.
   wp_enqueue_style( 'zetkin-load-fonts', get_template_directory_uri() . '/load-fonts.css', array(), '1.0.0', 'all' );
   // '1.0.0' is the version number, and 'all' specifies that this stylesheet applies to all media types.
}
add_action( 'wp_enqueue_scripts', 'zetkin_enqueue_styles' );





/** 
 * Add editor stylesheet 
 */
function zetkin_setup_theme_supported_features() {
   add_theme_support( 'editor-styles' ); // Enable editor styles
   add_theme_support( 'align-wide' ); // Enable wide alignment options for blocks
   add_editor_style( '/editor-style.css' ); // Add custom editor style
}
add_action( 'after_setup_theme', 'zetkin_setup_theme_supported_features' );


/** 
 * Added Zetkin category for Gutenberg Patterns 
 */
add_action( 'init', 'zetkin_register_pattern_categories' );

function zetkin_register_pattern_categories() {
	register_block_pattern_category( 'zetkin/custom', array( 
		'label'       => __( 'Zetkin', 'zetkin' ),
		'description' => __( 'Custom patterns for Zetkin.', 'zetkin' )
	) );
}

/** 
 * Added Zetkin category for Gutenberg Blocks 
 */
function register_zetkin_block_category( $block_categories, $editor_context ) {
   if ( ! empty( $editor_context->post ) ) {
       array_push(
           $block_categories,
           array(
               'slug'  => 'zetkin',
               'title' => __( 'Zetkin Blocks', 'text-domain' ),
               'icon'  => 'wordpress', // Optional. Use a Dashicon slug or an SVG.
           )
       );
   }

   return $block_categories;
}
add_filter( 'block_categories_all', 'register_zetkin_block_category', 10, 2 );


/** 
 * Added Zetkin blocks for Gutenberg Patterns 
 */
function zetkin_enqueue_block_editor_assets() {
   wp_enqueue_script(
       'zetkin-block', // Handle for the script.
       get_theme_file_uri('/blocks/blocks.js'), // Path to the JavaScript file that registers the block.
       array('wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-i18n'), // Dependencies, including wp-blocks for block type registration and wp-editor for editor-specific components.
       filemtime(get_theme_file_path('/blocks/blocks.js')) // Version: file modification time for cache busting.
   );

   wp_enqueue_script(
      'zetkin-flex-header', // Handle for the script.
      get_theme_file_uri('/js/flex-header.js'), // Path to the JavaScript file that registers the block.
      array('wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-i18n'), // Dependencies, including wp-blocks for block type registration and wp-editor for editor-specific components.
      filemtime(get_theme_file_path('/js/flex-header.js')) 
  );
}

add_action('enqueue_block_editor_assets', 'zetkin_enqueue_block_editor_assets');




