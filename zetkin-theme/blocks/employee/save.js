import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

	const { imageUrl, name, title } = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ imageUrl && <img src={ imageUrl } alt={ name } /> }

			<p className="employee-name">{ name }</p>

			<p className="employee-title">{ title }</p>
		</div>
	);
}
