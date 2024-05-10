/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useMemo, useState } from '@wordpress/element';
import { useSettings } from '@wordpress/block-editor';
import { Fill, ToolbarButton } from '@wordpress/components';
import { removeFormat } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { ReactComponent as Icon } from './icon.svg';
import { default as InlineColorUI, getActiveColor } from './inline';

export const name = 'zetkin/pin-out';

const title = __( 'Zetkin Pin-Out' );

function PinOutFormatEdit( {
	value,
	onChange,
	isActive,
	activeAttributes,
	contentRef,
} ) {
	const [ colors ] = useSettings( 'color.palette' );

	const [ isAddingColor, setIsAddingColor ] = useState( false );

	const enableIsAddingColor = useCallback(
		() => setIsAddingColor( true ),
		[ setIsAddingColor ]
	);

	const disableIsAddingColor = useCallback(
		() => setIsAddingColor( false ),
		[ setIsAddingColor ]
	);

	const colorIndicatorStyle = useMemo(
		() => ( {
			fill: getActiveColor( value, name, colors ),
			background: 'white',
		} ),
		[ value, colors ]
	);

	const hasColorsToChoose = !! colors.length;

	if ( ! hasColorsToChoose && ! isActive ) {
		return null;
	}

	return (
		<>
			<Fill name="RichText.ToolbarControls.unknown">
				<ToolbarButton
					className="format-library-text-color-button"
					isActive={ isActive }
					icon={ <Icon style={ colorIndicatorStyle } /> }
					title={ title }
					// If has no colors to choose but a color is active remove the color onClick.
					onClick={
						hasColorsToChoose
							? enableIsAddingColor
							: () => onChange( removeFormat( value, name ) )
					}
					role="menuitemcheckbox"
				/>
			</Fill>

			{ isAddingColor && (
				<InlineColorUI
					name={ name }
					onClose={ disableIsAddingColor }
					activeAttributes={ activeAttributes }
					value={ value }
					onChange={ onChange }
					contentRef={ contentRef }
					isActive={ isActive }
				/>
			) }
		</>
	);
}

export default {
	name,
	title,
	tagName: 'span',
	className: 'has-zetkin-pin-out',
	attributes: {
		style: 'style',
		class: 'class',
	},
	edit: PinOutFormatEdit,
};
