import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	ColorPalette,
	PanelBody,
	SelectControl,
} from '@wordpress/components';

import './editor.scss';

const TEMPLATE = [
	[ 'core/heading', { placeholder: 'Enter heading...' } ],
	[ 'core/paragraph', { placeholder: 'Enter text...' } ],
];

export default function Edit( props ) {
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

	const onChangeBackgroundColor = ( newColor ) => {
		setAttributes( { backgroundColor: newColor } );
	};
	const onSelectImage = ( media ) => {
		setAttributes( { backgroundImage: media.url } );
	};
	const onChangeBackgroundPosition = ( value ) => {
		setAttributes( { backgroundPosition: value } );
	};

	const onChangeBackgroundSize = ( value ) => {
		setAttributes( { backgroundSize: value } );
	};
	const onChangeBackgroundRepeat = ( value ) => {
		setAttributes( { backgroundRepeat: value } );
	};

	const outerBlockProps = useBlockProps( {
		className: 'wp-block-cover',
		style: {
			backgroundColor,
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
		},
	} );

	const blockProps = useInnerBlocksProps( outerBlockProps, {
		template: TEMPLATE,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title="Background Color Settings"
					initialOpen={ true }
				>
					<ColorPalette
						value={ backgroundColor }
						onChange={ onChangeBackgroundColor }
					/>

					<p>{ __( 'Background Image', 'ztk' ) }</p>

					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						value={ backgroundImage }
						render={ ( { open } ) => (
							<Button
								onClick={ open }
								secondary="true"
								islarge="true"
							>
								{ backgroundImage
									? __( 'Change Image', 'ztk' )
									: __( 'Select Image', 'ztk' ) }
							</Button>
						) }
					/>

					<SelectControl
						label="Background Position"
						value={ backgroundPosition }
						options={ [
							{ label: 'Center Center', value: 'center center' },
							{ label: 'Top Left', value: 'top left' },
							{ label: 'Top Center', value: 'top center' },
							// Add other positions as needed
						] }
						onChange={ onChangeBackgroundPosition }
					/>

					<SelectControl
						label="Background Size"
						value={ backgroundSize }
						options={ [
							{ label: 'Cover', value: 'cover' },
							{ label: 'Contain', value: 'contain' },
							{ label: 'Auto', value: 'auto' },
							// Add other sizes as needed
						] }
						onChange={ onChangeBackgroundSize }
					/>

					<SelectControl
						label="Background Repeat"
						value={ backgroundRepeat }
						options={ [
							{ label: 'No Repeat', value: 'no-repeat' },
							{ label: 'Repeat', value: 'repeat' },
							{ label: 'Repeat X', value: 'repeat-x' },
							{ label: 'Repeat Y', value: 'repeat-y' },
							// Add other repeat options as needed
						] }
						onChange={ onChangeBackgroundRepeat }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } />
		</>
	);
}
