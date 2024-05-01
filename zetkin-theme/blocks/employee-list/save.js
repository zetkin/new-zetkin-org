import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

	const { listItemWidth } = attributes;

	const outerBlockProps = useBlockProps.save( {
		className: listItemWidth,
	} );

	const blockProps = useInnerBlocksProps.save( outerBlockProps );

	return <div { ...blockProps } />;
}
