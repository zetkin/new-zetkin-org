/**
 * WordPress dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import {
	applyFormat,
	getActiveFormat,
	removeFormat,
	useAnchor,
} from '@wordpress/rich-text';
import {
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
	useSettings,
	ColorPalette,
} from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { default as settings } from './index';

const CLASS_PREFIX = 'has-';
const CLASS_SUFFIX = '-zetkin-pin-out';

function isClassName( name ) {
	return name.startsWith( CLASS_PREFIX ) && name.endsWith( CLASS_SUFFIX );
}

function getClassNameSlug( name ) {
	return name.substring(
		CLASS_PREFIX.length,
		name.length - CLASS_SUFFIX.length
	);
}

function parseClassName( className = '', colorSettings ) {
	let color = null;

	className.split( ' ' ).some( ( name ) => {
		if ( ! isClassName( name ) ) {
			return false;
		}

		const colorSlug = getClassNameSlug( name );

		const colorObject = getColorObjectByAttributeValues(
			colorSettings,
			colorSlug
		);

		color = colorObject?.color;

		return !! color;
	} );

	return color;
}

export function getActiveColor( value, name, colorSettings ) {
	const activeColorFormat = getActiveFormat( value, name );

	if ( ! activeColorFormat ) {
		return null;
	}

	return parseClassName( activeColorFormat.attributes.class, colorSettings );
}

function setColor( value, name, colorSettings, color ) {
	if ( ! color ) {
		return removeFormat( value, name );
	}

	const classNames = [];
	const attributes = {};

	if ( color ) {
		const colorObject = getColorObjectByColorValue( colorSettings, color );

		if ( colorObject ) {
			classNames.push( CLASS_PREFIX + colorObject.slug + CLASS_SUFFIX );
		}
	}

	if ( classNames.length ) {
		attributes.class = classNames.join( ' ' );
	}

	return applyFormat( value, { type: name, attributes } );
}

function ColorPicker( { name, value, onChange } ) {
	const [ colors ] = useSettings( 'color.palette' );

	const onColorChange = useCallback(
		( color ) => {
			onChange( setColor( value, name, colors, color ) );
		},
		[ name, value, colors, onChange ]
	);

	const activeColor = useMemo(
		() => getActiveColor( value, name, colors ),
		[ name, value, colors ]
	);

	return <ColorPalette value={ activeColor } onChange={ onColorChange } />;
}

export default function InlineColorUI( {
	name,
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
			<ColorPicker name={ name } value={ value } onChange={ onChange } />
		</Popover>
	);
}
