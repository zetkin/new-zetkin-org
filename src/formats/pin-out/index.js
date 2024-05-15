/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useMemo, useState } from '@wordpress/element';
import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue,
	ColorPalette,
} from '@wordpress/block-editor';
import { Fill, Popover, ToolbarButton } from '@wordpress/components';
import {
	applyFormat,
	getActiveFormat,
	removeFormat,
	useAnchor,
} from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { baseColors } from '../../scripts/colors';
import { ReactComponent as Icon } from './icon.svg';

export const name = 'zetkin/pin-out';

const TITLE = __( 'Zetkin Pin-Out' );

const CLASS_PREFIX = 'has-';
const CLASS_SUFFIX = '-zetkin-pin-out';

function isColorClassName( c ) {
	return c.startsWith( CLASS_PREFIX ) && c.endsWith( CLASS_SUFFIX );
}

function getColorClassNameSlug( c ) {
	return c.substring( CLASS_PREFIX.length, c.length - CLASS_SUFFIX.length );
}

function parseClassName( className = '' ) {
	let color = null;

	className.split( ' ' ).some( ( c ) => {
		if ( ! isColorClassName( c ) ) {
			return false;
		}

		const colorSlug = getColorClassNameSlug( c );

		const colorObject = getColorObjectByAttributeValues(
			baseColors,
			colorSlug
		);

		color = colorObject?.color;

		return !! color;
	} );

	return color;
}

function getActiveColor( value ) {
	const activeColorFormat = getActiveFormat( value, name );

	if ( ! activeColorFormat ) {
		return null;
	}

	return parseClassName( activeColorFormat.attributes.class );
}

function setColor( value, color ) {
	if ( ! color ) {
		return removeFormat( value, name );
	}

	const classNames = [];
	const attributes = {};

	if ( color ) {
		const colorObject = getColorObjectByColorValue( baseColors, color );

		if ( colorObject ) {
			classNames.push( CLASS_PREFIX + colorObject.slug + CLASS_SUFFIX );
		}
	}

	if ( classNames.length ) {
		attributes.class = classNames.join( ' ' );
	}

	return applyFormat( value, { type: name, attributes } );
}

function PinOutFormatColorPicker( props ) {
	const { value, onChange } = props;

	const onColorChange = useCallback(
		( color ) => {
			onChange( setColor( value, color ) );
		},
		[ value, onChange ]
	);

	const activeColor = useMemo( () => getActiveColor( value ), [ value ] );

	return (
		<ColorPalette
			colors={ baseColors }
			value={ activeColor }
			onChange={ onColorChange }
		/>
	);
}

function PinOutFormatInlineEdit( {
	value,
	onChange,
	onClose,
	contentRef,
	isActive,
} ) {
	const popoverAnchor = useAnchor( {
		editableContentElement: contentRef.current,
		settings: { ...settings, isActive },
	} );

	return (
		<Popover onClose={ onClose } anchor={ popoverAnchor }>
			<PinOutFormatColorPicker value={ value } onChange={ onChange } />
		</Popover>
	);
}

function PinOutFormatEdit( {
	value,
	onChange,
	isActive,
	activeAttributes,
	contentRef,
} ) {
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
			fill: getActiveColor( value ),
			background: 'white',
		} ),
		[ value ]
	);

	return (
		<>
			<Fill name="RichText.ToolbarControls.unknown">
				<ToolbarButton
					className="format-library-text-color-button"
					isActive={ isActive }
					icon={ <Icon style={ colorIndicatorStyle } /> }
					title={ TITLE }
					// If has no colors to choose but a color is active remove the color onClick.
					onClick={ enableIsAddingColor }
					role="menuitemcheckbox"
				/>
			</Fill>

			{ isAddingColor && (
				<PinOutFormatInlineEdit
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

const settings = {
	name,
	title: TITLE,
	tagName: 'span',
	className: 'has-zetkin-pin-out',
	attributes: {
		style: 'style',
		class: 'class',
	},
	edit: PinOutFormatEdit,
};

export default settings;
