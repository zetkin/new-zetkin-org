import { registerFormatType } from '@wordpress/rich-text';

import pinOut from './pin-out';

[ pinOut ].forEach( ( { name, ...def } ) => {
	registerFormatType( name, def );
} );
