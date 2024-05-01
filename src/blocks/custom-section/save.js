import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		attributes: {
			backgroundColor,
			backgroundImage,
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
		},
	} = props;

	const outerBlockProps = useBlockProps.save( {
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

	const blockProps = useInnerBlocksProps.save( outerBlockProps );

	return <div { ...blockProps } />;
}
