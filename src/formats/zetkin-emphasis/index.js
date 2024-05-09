import { Fill, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';

import { ReactComponent as Icon } from './icon.svg';

export const name = 'ztk/emphasis';

export default {
	name,
	title: __( 'Zetkin Emphasis' ),
	tagName: 'span',
	className: 'has-ztk-em',
	edit( { isActive, value, onChange } ) {
		const onToggle = () => {
			onChange(
				toggleFormat( value, {
					type: name,
				} )
			);
		};
		return (
			<Fill name="RichText.ToolbarControls.unknown">
				<ToolbarButton
					icon={ Icon }
					title={ __( 'Zetkin Emphasis' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
			</Fill>
		);
	},
};
