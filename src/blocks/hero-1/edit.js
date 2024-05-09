import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { image as icon } from '@wordpress/icons';

import { name as zetkinEmphasis } from '@zetkin/formats/zetkin-emphasis';

import './editor.scss';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const cn = ( suffix = '' ) => 'wp-block-zetkin-hero-1' + suffix;

function ToolbarEditButton( { mediaId, mediaUrl, onSelectMedia } ) {
	return (
		<BlockControls group="other">
			<MediaReplaceFlow
				mediaId={ mediaId }
				mediaURL={ mediaUrl }
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				accept="image/*,video/*"
				onSelect={ onSelectMedia }
			/>
		</BlockControls>
	);
}

function PlaceholderContainer( { className, mediaUrl, onSelectMedia } ) {
	const { createErrorNotice } = useDispatch( noticesStore );

	const onUploadError = ( message ) => {
		createErrorNotice( message, { type: 'snackbar' } );
	};

	return (
		<div className={ className }>
			<MediaPlaceholder
				icon={ <BlockIcon icon={ icon } /> }
				labels={ {
					title: __( 'Media area' ),
				} }
				onSelect={ onSelectMedia }
				accept="image/*,video/*"
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				onError={ onUploadError }
				disableMediaButtons={ mediaUrl }
			/>
		</div>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const { title, mediaId } = attributes;

	const hasImage = !! mediaId;

	const media = useSelect(
		( select ) => {
			if ( ! mediaId ) {
				return null;
			}

			const { getMedia } = select( 'core' );

			return getMedia( mediaId );
		},
		[ mediaId ]
	);

	const mediaUrl = media?.source_url;
	const mediaAlt = media?.alt_text;

	const onSelectMedia = ( nextValue ) => {
		setAttributes( {
			mediaId: nextValue.id,
		} );
	};

	const blockProps = useBlockProps( {
		className: [ { [ cn( '--has-image' ) ]: hasImage } ],
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: cn( '__inner-blocks' ),
	} );

	return (
		<>
			<ToolbarEditButton
				mediaId={ mediaId }
				mediaURL={ mediaUrl }
				onSelectMedia={ onSelectMedia }
			/>

			<div { ...blockProps }>
				<div className={ cn( '__inner' ) }>
					<div className={ cn( '__image-container' ) }>
						{ mediaUrl ? (
							<img
								className={ cn( '__image' ) }
								src={ mediaUrl }
								alt={ mediaAlt }
							/>
						) : (
							<PlaceholderContainer
								className={ cn( '__image' ) }
								mediaUrl={ mediaUrl }
								onSelectMedia={ onSelectMedia }
							/>
						) }
					</div>

					<div className={ cn( '__content-container' ) }>
						<RichText
							className={ cn( '__title' ) }
							placeholder={ __( 'Title' ) }
							allowedFormats={ [ zetkinEmphasis ] }
							value={ title }
							onChange={ ( nextValue ) => {
								setAttributes( { title: nextValue } );
							} }
						/>

						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
