import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import './editor.scss';

const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function TextContainerEdit( props ) {
	const { attributes } = props;

	const { className } = attributes;

	const blockProps = useInnerBlocksProps(
		useBlockProps( {
			className,
		} ),
		{
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return <div { ...blockProps } />;
}
