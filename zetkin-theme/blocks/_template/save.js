import { useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;

	const blockProps = useBlockProps.save();

	return <p { ...blockProps }>{ 'Test – hello from the saved content!' }</p>;
}
