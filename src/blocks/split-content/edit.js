import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
//import './editor.css';

const Edit = ({ attributes, setAttributes }) => {
	const { imageURL } = attributes;

	const onSelectImage = (media) => {
		setAttributes({ imageURL: media.url });
	};

	const blockProps = useBlockProps({ className: 'get-funky' });

	return (
		<div {...blockProps}>
			<div className="container">
				<div className="inner-blocks">
					<InnerBlocks />
				</div>
				<div className="image-container">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={imageURL}
							render={({ open }) => (
								<Button onClick={open}>
									{!imageURL ? (
										__('Choose an image', 'custom-block')
									) : (
										<img
											src={imageURL}
											alt={__('Selected image', 'custom-block')}
										/>
									)}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</div>
	);
};

export default Edit;
