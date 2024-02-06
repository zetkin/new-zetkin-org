const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, MediaUpload } =
	wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("zetkin/custom-section", {
	title: "Zetkin Custom Section",
	category: "zetkin",
   icon: "align-full-width",
	attributes: {
		backgroundColor: {
			type: "string",
			default: "#888888", // Default color, if needed
		},
		backgroundImage: {
			type: "string",
			default: "", // Default background image URL
		},
		backgroundPosition: {
			type: "string",
			default: "center center",
		},
		backgroundSize: {
			type: "string",
			default: "cover",
		},
		backgroundRepeat: {
			type: "string",
			default: "no-repeat",
		},
		// Other attributes...
	},

	edit: (props) => {
		const {
			attributes: {
				backgroundColor,
				backgroundImage,
				backgroundPosition,
				backgroundSize,
				backgroundRepeat,
			},
			setAttributes,
		} = props;

		const onChangeBackgroundColor = (newColor) => {
			setAttributes({ backgroundColor: newColor });
		};
		const onSelectImage = (media) => {
			setAttributes({ backgroundImage: media.url });
		};
		const onChangeBackgroundPosition = (value) => {
			setAttributes({ backgroundPosition: value });
		};

		const onChangeBackgroundSize = (value) => {
			setAttributes({ backgroundSize: value });
		};
		const onChangeBackgroundRepeat = (value) => {
			setAttributes({ backgroundRepeat: value });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Background Color Settings" initialOpen={true}>
						<ColorPalette
							value={backgroundColor}
							onChange={onChangeBackgroundColor}
						/>
						<p>{__("Background Image", "text-domain")}</p>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={backgroundImage}
							render={({ open }) => (
								<Button onClick={open} isDefault isLarge>
									{backgroundImage
										? __("Change Image", "text-domain")
										: __("Select Image", "text-domain")}
								</Button>
							)}
						/>
						<SelectControl
							label="Background Position"
							value={backgroundPosition}
							options={[
								{ label: "Center Center", value: "center center" },
								{ label: "Top Left", value: "top left" },
								{ label: "Top Center", value: "top center" },
								// Add other positions as needed
							]}
							onChange={onChangeBackgroundPosition}
						/>
						<SelectControl
							label="Background Size"
							value={backgroundSize}
							options={[
								{ label: "Cover", value: "cover" },
								{ label: "Contain", value: "contain" },
								{ label: "Auto", value: "auto" },
								// Add other sizes as needed
							]}
							onChange={onChangeBackgroundSize}
						/>
						<SelectControl
							label="Background Repeat"
							value={backgroundRepeat}
							options={[
								{ label: "No Repeat", value: "no-repeat" },
								{ label: "Repeat", value: "repeat" },
								{ label: "Repeat X", value: "repeat-x" },
								{ label: "Repeat Y", value: "repeat-y" },
								// Add other repeat options as needed
							]}
							onChange={onChangeBackgroundRepeat}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className="wp-block-cover zetkin_customSection"
					style={{
						backgroundColor: backgroundColor,
						backgroundImage: backgroundImage
							? `url(${backgroundImage})`
							: "none",
						backgroundPosition: backgroundPosition,
						backgroundSize: backgroundSize,
						backgroundRepeat: backgroundRepeat,
					}}
				>
					<InnerBlocks
						/* allowedBlocks={[
							"core/heading",
							"core/paragraph",
							"zetkin/flex-heading",
						]} */
						template={[
							["core/heading", { placeholder: "Enter heading..." }],
							["core/paragraph", { placeholder: "Enter text..." }],
						]}
					/>
				</div>
			</>
		);
	},
	save: (props) => {
		const {
			attributes: {
				backgroundColor,
				backgroundImage,
				backgroundPosition,
				backgroundSize,
				backgroundRepeat,
			},
		} = props;

		return (
			<div
				className="wp-block-cover zetkin_customSection"
				style={{
					backgroundColor: backgroundColor,
					backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
					backgroundPosition: backgroundPosition,
					backgroundSize: backgroundSize,
					backgroundRepeat: backgroundRepeat,
				}}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});

registerBlockType("zetkin/flex-heading", {
	icon: "heading",
	title: "Zetkin Flex Heading",
	category: "zetkin",
	attributes: {
		mainFlexHeadColor: {
			type: "string",
			default: "mn--blk",
		},
		obliqueFlexHeadColor: {
			type: "string",
			default: "em--blk",
		},
		// Other attributes...
	},
	edit: (props) => {
		const {
			attributes: { mainFlexHeadColor, obliqueFlexHeadColor },
			setAttributes,
		} = props;

		const onChangeMainFlexHeadColor = (newClass) => {
			setAttributes({ mainFlexHeadColor: newClass });
		};

		const onChangeObliqueFlexHeadColor = (newClass) => {
			setAttributes({ obliqueFlexHeadColor: newClass });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Flex Header Settings" initialOpen={true}>
						<SelectControl
							label="Main Header Color"
							value={mainFlexHeadColor}
							options={[
								{ label: "black", value: "mn--blk" },
								{ label: "White", value: "mn--wht" },
								{ label: "Red", value: "mn--red" },
								{ label: "Light Green", value: "mn--ltgrn" },
                        { label: "Dark Green", value: "mn--dkgrn" },
								{ label: "Purple", value: "mn--ppl" },
								// More options...
							]}
							onChange={onChangeMainFlexHeadColor}
						/>
						<SelectControl
							label="Oblique Color"
							value={obliqueFlexHeadColor}
							options={[
								{ label: "black", value: "em--blk" },
								{ label: "White", value: "em--wht" },
								{ label: "Red", value: "em--red" },
								{ label: "Light Green", value: "em--ltgrn" },
                        { label: "Dark Green", value: "em--dkgrn" },
								{ label: "Purple", value: "em--ppl" },
								// More options...
							]}
							onChange={onChangeObliqueFlexHeadColor}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={`zetkin_flexHeader ${mainFlexHeadColor} ${obliqueFlexHeadColor}`}
				>
					<InnerBlocks
						template={[["core/paragraph", { placeholder: "Enter heading..." }]]}
					/>
				</div>
			</>
		);
	},
	save: ({ attributes }) => {
      const { mainFlexHeadColor, obliqueFlexHeadColor } = attributes;
  
      return (
          <div className={`zetkin_flexHeader ${mainFlexHeadColor} ${obliqueFlexHeadColor}`}>
              <InnerBlocks.Content />
          </div>
      );
  },
});
