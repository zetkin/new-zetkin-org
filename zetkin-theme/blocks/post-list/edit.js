import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Disabled, PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;

	const { postType, taxonomy, term } = attributes;

	const blockProps = useBlockProps();

	const postTypes = useSelect( ( select ) => {
		const allPostTypes = select( 'core' ).getPostTypes();
		if ( ! allPostTypes ) {
			return [];
		}
		return allPostTypes.filter( ( type ) => type.viewable );
	}, [] );

	const taxonomies = useSelect(
		( select ) => {
			if ( ! postType || postType === 'attachment' ) {
				return [];
			}
			return select( 'core' ).getTaxonomies( { type: postType } );
		},
		[ postType ]
	);

	const terms = useSelect(
		( select ) => {
			if ( ! taxonomy ) {
				return [];
			}
			return select( 'core' ).getEntityRecords( 'taxonomy', taxonomy );
		},
		[ taxonomy ]
	);

	const onChangePostType = ( newPostType ) => {
		setAttributes( { postType: newPostType } );
	};

	const onChangeTaxonomy = ( newTaxonomy ) => {
		setAttributes( { taxonomy: newTaxonomy } );
	};

	const onChangeTerm = ( newTerm ) => {
		setAttributes( { term: newTerm } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Post Settings">
					{ postTypes && (
						<SelectControl
							label="Post Type"
							value={ postType }
							options={ postTypes.map( ( type ) => ( {
								label: type.name,
								value: type.slug,
							} ) ) }
							onChange={ onChangePostType }
						/>
					) }
					{ taxonomies && (
						<SelectControl
							label="Taxonomy"
							value={ taxonomy }
							options={ taxonomies.map( ( tax ) => ( {
								label: tax.name,
								value: tax.slug,
							} ) ) }
							onChange={ onChangeTaxonomy }
						/>
					) }
					{ terms && (
						<SelectControl
							label="Term"
							value={ term }
							options={ terms.map( ( term ) => ( {
								label: term.name,
								value: term.id,
							} ) ) }
							onChange={ onChangeTerm }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
						block={ 'zetkin/post-list' }
						skipBlockSupportAttributes
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	);
}
