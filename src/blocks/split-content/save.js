import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { imageURL } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="container">
				<div className="inner-blocks">
					<InnerBlocks.Content />
				</div>
				<div className="image-container">
					{imageURL && <img src={imageURL} alt="Selected" />}
				</div>
			</div>
		</div>
	);
};

export default Save;
