import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	MediaReplaceFlow,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { name as pinOut } from '@zetkin/formats/pin-out';

import './editor.scss';

const cn = ( suffix = '' ) => 'wp-block-zetkin-grid-of-things-1' + suffix;

const TEMPLATE = [
	[
		'zetkin/grid-things-container',
		{ className: cn( '__things-container' ) },
	],
	[ 'zetkin/text-container', { className: cn( '__text-container' ) } ],
];

const ALLOWED_MEDIA_TYPES = [ 'image' ];

function ToolbarEditButton( { mediaId, mediaUrl, onSelectMedia } ) {
	return (
		<BlockControls group="other">
			<MediaReplaceFlow
				mediaId={ mediaId }
				mediaURL={ mediaUrl }
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				accept="image/*,video/*"
				name={ mediaId ? __( 'Add Media' ) : __( 'Replace' ) }
				onSelect={ onSelectMedia }
			/>
		</BlockControls>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const { kicker, title, mediaId } = attributes;

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

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: cn( '__inner-blocks' ),
		},
		{
			template: TEMPLATE,
			templateLock: 'all',
		}
	);

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
						{ mediaUrl && (
							<img
								className={ cn( '__image' ) }
								src={ mediaUrl }
								alt={ mediaAlt }
							/>
						) }
					</div>

					<div className={ cn( '__content-container' ) }>
						<RichText
							tagName="h1"
							className={ cn( '__kicker' ) }
							placeholder={ __( 'Kicker' ) }
							allowedFormats={ [] }
							value={ kicker }
							onChange={ ( nextValue ) => {
								setAttributes( { kicker: nextValue } );
							} }
						/>

						<RichText
							className={ cn( '__title' ) }
							placeholder={ __( 'Title' ) }
							allowedFormats={ [ pinOut ] }
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
