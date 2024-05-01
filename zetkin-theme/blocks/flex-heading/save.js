import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import clsx from 'clsx';

export default function save( props ) {
	const { attributes } = props;

	const { mainFlexHeadColor, obliqueFlexHeadColor } = attributes;

	const outerBlockProps = useBlockProps.save( {
		className: clsx( mainFlexHeadColor, obliqueFlexHeadColor ),
	} );

	const blockProps = useInnerBlocksProps.save( outerBlockProps );

	return <div { ...blockProps } />;
}
