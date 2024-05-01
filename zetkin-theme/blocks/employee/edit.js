import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const [ imageSizes, media ] = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const { getMedia } = select( 'core' );
		const { imageSizes } = getSettings();

		return [ imageSizes, getMedia ];
	} );

	const blockProps = useBlockProps();

	const imageSizeOptions = imageSizes.map( ( size ) => ( {
		label: size.name,
		value: size.slug,
	} ) );

	const onImageSizeChange = async ( imageSize ) => {
		setAttributes( { imageSize } );

		if ( attributes.imageId ) {
			const image = await media( attributes.imageId );
			if ( image && image.media_details.sizes[ imageSize ] ) {
				setAttributes( {
					imageUrl: image.media_details.sizes[ imageSize ].source_url,
				} );
			}
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Employee Settings" initialOpen={ true }>
					<SelectControl
						label="Image Size"
						value={ attributes.imageSize }
						options={ imageSizeOptions }
						onChange={ onImageSizeChange }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<MediaUpload
					onSelect={ ( media ) => {
						setAttributes( {
							imageId: media.id,
							imageUrl: media.sizes[ attributes.imageSize ].url,
						} );
					} }
					type="image"
					value={ attributes.imageId }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ ! attributes.imageUrl
								? 'Upload Image'
								: 'Edit Image' }
						</Button>
					) }
				/>
				{ attributes.imageUrl && (
					<img src={ attributes.imageUrl } alt={ attributes.name } />
				) }

				<TextControl
					label="Name"
					value={ attributes.name }
					onChange={ ( name ) => setAttributes( { name } ) }
				/>

				<TextControl
					label="Title"
					value={ attributes.title }
					onChange={ ( title ) => setAttributes( { title } ) }
				/>
			</div>
		</>
	);
}
