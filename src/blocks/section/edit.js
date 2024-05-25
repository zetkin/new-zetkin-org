import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	//const { attributes, setAttributes } = props;

	const cn = (suffix = '') => 'zetkin-section' + suffix;

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps({
		className: cn('__inner-blocks'),
	});

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}
