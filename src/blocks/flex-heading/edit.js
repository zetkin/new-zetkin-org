import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

import clsx from 'clsx';

import './editor.scss';

const TEMPLATE = [ [ 'core/paragraph', { placeholder: 'Enter heading...' } ] ];

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const { mainFlexHeadColor, obliqueFlexHeadColor } = attributes;

	const onChangeMainFlexHeadColor = ( newClass ) => {
		setAttributes( { mainFlexHeadColor: newClass } );
	};

	const onChangeObliqueFlexHeadColor = ( newClass ) => {
		setAttributes( { obliqueFlexHeadColor: newClass } );
	};

	const outerBlockProps = useBlockProps( {
		className: clsx(
			'zetkin_flexHeader',
			mainFlexHeadColor,
			obliqueFlexHeadColor
		),
	} );

	const blockProps = useInnerBlocksProps( outerBlockProps, {
		template: TEMPLATE,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Flex Header Settings" initialOpen={ true }>
					<SelectControl
						label="Main Header Color"
						value={ mainFlexHeadColor }
						options={ [
							{ label: 'black', value: 'mn--blk' },
							{ label: 'White', value: 'mn--wht' },
							{ label: 'Red', value: 'mn--red' },
							{ label: 'Light Green', value: 'mn--ltgrn' },
							{ label: 'Dark Green', value: 'mn--dkgrn' },
							{ label: 'Purple', value: 'mn--ppl' },
							// More options...
						] }
						onChange={ onChangeMainFlexHeadColor }
					/>
					<SelectControl
						label="Oblique Color"
						value={ obliqueFlexHeadColor }
						options={ [
							{ label: 'black', value: 'em--blk' },
							{ label: 'White', value: 'em--wht' },
							{ label: 'Red', value: 'em--red' },
							{ label: 'Light Green', value: 'em--ltgrn' },
							{ label: 'Dark Green', value: 'em--dkgrn' },
							{ label: 'Purple', value: 'em--ppl' },
							// More options...
						] }
						onChange={ onChangeObliqueFlexHeadColor }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } />
		</>
	);
}
