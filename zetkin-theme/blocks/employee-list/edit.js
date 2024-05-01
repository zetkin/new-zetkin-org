import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

import './editor.scss';

const ALLOWED_BLOCKS = [ 'zetkin/employee' ];

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const { listItemWidth } = attributes;

	const outerBlockProps = useBlockProps();

	const blockProps = useInnerBlocksProps( outerBlockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Employee List Settings" initialOpen={ true }>
					<SelectControl
						label="Element Width"
						options={ [
							{ label: 'black', value: 'mn--blk' },
							{ label: 'White', value: 'mn--wht' },
							{ label: 'Red', value: 'mn--red' },
							{ label: 'Light Green', value: 'mn--ltgrn' },
							{ label: 'Dark Green', value: 'mn--dkgrn' },
							{ label: 'Purple', value: 'mn--ppl' },
							// More options...
						] }
						value={ listItemWidth }
						onChange={ ( nextValue ) => {
							setAttributes( { listItemWidth: nextValue } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } />
		</>
	);
}
