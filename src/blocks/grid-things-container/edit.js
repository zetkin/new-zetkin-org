import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import './editor.scss';

const TEMPLATE = [ [ 'zetkin/grid-thing-1' ] ];

export default function GridThingsContainerEdit( props ) {
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
