import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const blockProps = useBlockProps();

	return (
		<p { ...blockProps }>
			{ __( 'Test – hello from the editor!', 'test' ) }
		</p>
	);
}
