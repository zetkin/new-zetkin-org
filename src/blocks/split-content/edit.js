import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { image as icon } from '@wordpress/icons';
import {
	ToggleControl,
	PanelBody,
	PanelRow,
	SelectControl,
} from '@wordpress/components';
import { useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { name as pinOut } from '@zetkin/formats/pin-out';

import './editor.scss';

const ALLOWED_MEDIA_TYPES = ['image'];

const cn = (suffix = '') => 'wp-block-zetkin-split-content' + suffix;

function ToolbarEditButton({ mediaId, mediaUrl, onSelectMedia }) {
	return (
		<BlockControls group="other">
			<MediaReplaceFlow
				mediaId={mediaId}
				mediaURL={mediaUrl}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				accept="image/*,video/*"
				name={mediaId ? __('Add Media') : __('Replace')}
				onSelect={onSelectMedia}
			/>
		</BlockControls>
	);
}

function PlaceholderContainer({ className, mediaUrl, onSelectMedia }) {
	const { createErrorNotice } = useDispatch(noticesStore);

	const onUploadError = (message) => {
		createErrorNotice(message, { type: 'snackbar' });
	};

	return (
		<div className={className}>
			<MediaPlaceholder
				icon={<BlockIcon icon={icon} />}
				labels={{
					title: __('Media area'),
				}}
				onSelect={onSelectMedia}
				accept="image/*,video/*"
				allowedTypes={ALLOWED_MEDIA_TYPES}
				onError={onUploadError}
				disableMediaButtons={mediaUrl}
			/>
		</div>
	);
}

export default function Edit(props) {
	const { attributes, setAttributes } = props;

	const { title, mediaId, isInset, imgPos: imgPosAttr } = attributes;

	const [imgPos, setImgPos] = useState('--imgPosLeft');

	const hasImage = !!mediaId;

	const media = useSelect(
		(select) => {
			if (!mediaId) {
				return null;
			}

			const { getMedia } = select('core');

			return getMedia(mediaId);
		},
		[mediaId],
	);

	const mediaUrl = media?.source_url;
	const mediaAlt = media?.alt_text;

	const onSelectMedia = (nextValue) => {
		setAttributes({
			mediaId: nextValue.id,
		});
	};

	const blockProps = useBlockProps({
		className: [
			{ [cn('--has-image')]: hasImage },
			{ [cn('--is-inset')]: isInset },
		],
	});

	const innerBlocksProps = useInnerBlocksProps({
		className: [cn('__inner-blocks'), { [cn(imgPos)]: imgPos }],
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'text-domain')}>
					<PanelRow>
						<p>
							{__(
								'Make this block inset if positioned inside a zetkin-section.',
								'text-domain',
							)}
						</p>
						<ToggleControl
							label="Make Inset"
							checked={isInset}
							onChange={(value) => setAttributes({ isInset: value })}
						/>
					</PanelRow>
					<PanelRow>
						<p>{__('Position the image left or right.', 'text-domain')}</p>
						<SelectControl
							label="Image Position"
							value={imgPos}
							options={[
								{ label: 'Right', value: '--imgPosRight' },
								{ label: 'Left', value: '--imgPosLeft' },
								// Add more options as needed
							]}
							onChange={(newValue) => {
								setImgPos(newValue);
								setAttributes({ imgPos: newValue });
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<ToolbarEditButton
				mediaId={mediaId}
				mediaURL={mediaUrl}
				onSelectMedia={onSelectMedia}
			/>

			<div {...blockProps}>
				<div className={[cn('__inner'), cn(imgPosAttr)]}>
					<div className={cn('__image-container')}>
						{mediaUrl ? (
							<img className={cn('__image')} src={mediaUrl} alt={mediaAlt} />
						) : (
							<PlaceholderContainer
								className={cn('__image')}
								mediaUrl={mediaUrl}
								onSelectMedia={onSelectMedia}
							/>
						)}
					</div>

					<div className={cn('__content-container')}>
						<RichText
							className={cn('__title')}
							placeholder={__('Title')}
							allowedFormats={[pinOut]}
							value={title}
							onChange={(nextValue) => {
								setAttributes({ title: nextValue });
							}}
						/>

						<div {...innerBlocksProps} />
					</div>
				</div>
			</div>
		</>
	);
}
