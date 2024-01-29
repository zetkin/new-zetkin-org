const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, MediaUpload } = wp.blockEditor;
const { PanelBody, Button, SelectControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("zetkin/custom-hero03", {
   title: "Zetkin Custom Hero 03",
	category: "zetkin/custom",
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
		}
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
					className="wp-block-cover zetkin-pattern--hero03"
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
						allowedBlocks={["core/heading", "core/paragraph"]}
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
			attributes: {  backgroundColor, backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat },
		} = props;

		return (
			<div
				className="wp-block-cover zetkin-pattern--hero"
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
