import {
	useBlockProps,
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
} from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
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

	const { title, mediaId, mediaUrl, mediaAlt } = attributes;

	const hasImage = !! mediaId;

	const onSelectMedia = ( nextValue ) => {
		setAttributes( {
			mediaId: nextValue.id,
			mediaUrl: nextValue.url,
			mediaAlt: nextValue.alt,
		} );
	};

	const blockProps = useBlockProps( {
		className: [ { [ cn( '--has-image' ) ]: hasImage } ],
	} );

	return (
		<>
			<ToolbarEditButton
				mediaId={ mediaId }
				mediaURL={ mediaUrl }
				onSelectMedia={ onSelectMedia }
			/>

			<div { ...blockProps }>
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

				<RichText
					className={ cn( '__title' ) }
					placeholder={ __( 'Title' ) }
					allowedFormats={ [ zetkinEmphasis ] }
					value={ title }
					onChange={ ( nextValue ) => {
						setAttributes( { title: nextValue } );
					} }
				/>
			</div>
		</>
	);
}
