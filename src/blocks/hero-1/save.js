import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const cn = (suffix = '') => 'wp-block-zetkin-hero-1' + suffix;

export default function save(props) {
	const { attributes } = props;
	const { isInset } = attributes;
	console.log(isInset);

	const blockProps = useBlockProps.save({
		//className: isInset ? cn('--is-inset') : '',
		//className: 'boozo-the-clown',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
