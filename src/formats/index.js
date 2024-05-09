import { registerFormatType } from '@wordpress/rich-text';

import zetkinEmphasis from './zetkin-emphasis';

[ zetkinEmphasis ].forEach( ( { name, ...def } ) => {
	registerFormatType( name, def );
} );
