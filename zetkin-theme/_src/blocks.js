//const { registerBlockType } = wp.blocks;
//const { InnerBlocks, InspectorControls, ColorPalette, MediaUpload } = wp.blockEditor;
//const { PanelBody, Button, TextControl } = wp.components;
//const { __ } = wp.i18n;

//const { SelectControl } = wp.components;
//const ServerSideRender = wp.serverSideRender;

//const { ServerSideRender } = wp.components;

//import { SelectControl } from '@wordpress/components';
//const { useSelect } = wp.data;

const { registerBlockType, useBlockProps } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, MediaUpload } =
	wp.blockEditor;
const { PanelBody, Button, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const ServerSideRender = wp.serverSideRender;
const { useSelect } = wp.data;

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
								<Button onClick={open} secondary="true" islarge="true">
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
			<div
				className={`zetkin_flexHeader ${mainFlexHeadColor} ${obliqueFlexHeadColor}`}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});

/* Employee list*/
registerBlockType("zetkin/employee-list", {
	icon: "groups",
	title: "Zetkin Employee List",
	category: "layout",
	edit: (props) => {
		const {
			attributes: { listItemWidth },
			setAttributes,
		} = props;
		return (
			<>
				<InspectorControls>
					<PanelBody title="Employee List Settings" initialOpen={true}>
						{/* Additional settings can go here */}
						<SelectControl
							label="Element Width"
							value={listItemWidth}
							options={[
								{ label: "black", value: "mn--blk" },
								{ label: "White", value: "mn--wht" },
								{ label: "Red", value: "mn--red" },
								{ label: "Light Green", value: "mn--ltgrn" },
								{ label: "Dark Green", value: "mn--dkgrn" },
								{ label: "Purple", value: "mn--ppl" },
								// More options...
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="employee-list">
					<InnerBlocks allowedBlocks={["zetkin/employee"]} />
				</div>
			</>
		);
	},
	save: ({ attributes }) => {
		const { listItemWidth } = attributes;

		return (
			<div className={`zetkin_flexHeader ${listItemWidth} `}>
				<InnerBlocks.Content />
			</div>
		);
	},
});

/* Employee */

/* imageSizes is a prop that is passed to the EditComponent */
const { withSelect, withDispatch } = wp.data;

const EditComponent = ({ attributes, setAttributes, imageSizes, media }) => {
	const imageSizeOptions = imageSizes.map((size) => ({
		label: size.name,
		value: size.slug,
	}));

	const onImageSizeChange = async (imageSize) => {
		setAttributes({ imageSize });

		if (attributes.imageId) {
			const image = await media(attributes.imageId);
			if (image && image.media_details.sizes[imageSize]) {
				setAttributes({
					imageUrl: image.media_details.sizes[imageSize].source_url,
				});
			}
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Employee Settings" initialOpen={true}>
					<SelectControl
						label="Image Size"
						value={attributes.imageSize}
						options={imageSizeOptions}
						onChange={onImageSizeChange}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="employee-details">
				<MediaUpload
					onSelect={(media) => {
						setAttributes({
							imageId: media.id,
							imageUrl: media.sizes[attributes.imageSize].url,
						});
					}}
					type="image"
					value={attributes.imageId}
					render={({ open }) => (
						<Button onClick={open}>
							{!attributes.imageUrl ? "Upload Image" : "Edit Image"}
						</Button>
					)}
				/>
				{attributes.imageUrl && (
					<img src={attributes.imageUrl} alt={attributes.name} />
				)}
				<TextControl
					label="Name"
					value={attributes.name}
					onChange={(name) => setAttributes({ name })}
				/>
				<TextControl
					label="Title"
					value={attributes.title}
					onChange={(title) => setAttributes({ title })}
				/>
			</div>
		</>
	);
};

const EditWithSelect = withSelect((select) => {
	const { getSettings } = select("core/block-editor");
	const { getMedia } = select("core");
	const { imageSizes } = getSettings();

	return {
		imageSizes,
		media: getMedia,
	};
})(EditComponent);

registerBlockType("zetkin/employee", {
	icon: "id-alt",
	title: "Zetkin Employee",
	category: "layout",
	parent: ["zetkin/employee-list"],
	attributes: {
		name: {
			type: "string",
			default: "John Doe",
		},
		title: {
			type: "string",
			default: "Superhero",
		},
		imageUrl: {
			type: "string",
			default: "",
		},
		imageId: {
			type: "number",
		},
		imageSize: {
			type: "string",
			default: "full",
		},
	},
	edit: EditWithSelect,
	save: ({ attributes }) => {
		return (
			<div className="employee-details">
				{attributes.imageUrl && (
					<img src={attributes.imageUrl} alt={attributes.name} />
				)}
				<p className="employee-name">{attributes.name}</p>
				<p className="employee-title">{attributes.title}</p>
			</div>
		);
	},
});

//const { registerBlockType } = wp.blocks;

registerBlockType("zetkin/post-list", {
	title: "Zetkin Post List",
	icon: "admin-post",
	category: "common",
	attributes: {
		postType: {
			type: "string",
			default: "post",
		},
		taxonomy: {
			type: "string",
			default: "category",
		},
		term: {
			type: "string",
			default: "",
		},
	},
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const { postType, taxonomy, term } = attributes;

		const postTypes = useSelect((select) => {
			const allPostTypes = select("core").getPostTypes();
			if (!allPostTypes) {
				return [];
			}
			return allPostTypes.filter((type) => type.viewable);
		}, []);
		const taxonomies = useSelect((select) => {
         if (!postType || postType === 'attachment') {
             return [];
         }
         return select('core').getTaxonomies({ type: postType });
     }, [postType]);
		const terms = useSelect(
			(select) => {
				if (!taxonomy) {
					return [];
				}
				return select("core").getEntityRecords("taxonomy", taxonomy);
			},
			[taxonomy]
		);

		const onChangePostType = (newPostType) => {
			setAttributes({ postType: newPostType });
		};

		const onChangeTaxonomy = (newTaxonomy) => {
			setAttributes({ taxonomy: newTaxonomy });
		};

		const onChangeTerm = (newTerm) => {
			setAttributes({ term: newTerm });
		};

		return (
			<div>
				<InspectorControls>
					<PanelBody title="Post Settings">
						{postTypes && (
							<SelectControl
								label="Post Type"
								value={postType}
								options={postTypes.map((type) => ({
									label: type.name,
									value: type.slug,
								}))}
								onChange={onChangePostType}
							/>
						)}
						{taxonomies && (
							<SelectControl
								label="Taxonomy"
								value={taxonomy}
								options={taxonomies.map((tax) => ({
									label: tax.name,
									value: tax.slug,
								}))}
								onChange={onChangeTaxonomy}
							/>
						)}
						{terms && (
							<SelectControl
								label="Term"
								value={term}
								options={terms.map((term) => ({
									label: term.name,
									value: term.id,
								}))}
								onChange={onChangeTerm}
							/>
						)}
					</PanelBody>
				</InspectorControls>
				{/* <ServerSideRender
            block="zetkin/post-list"
            attributes={props.attributes}
         /> */}
			</div>
		);
	},
	save: () => {
		return null; // Server-side rendering
	},
});
