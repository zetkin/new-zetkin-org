import {
	useBlockProps,
	BlockControls,
	__experimentalLinkControl as LinkControl,
	RichText,
} from '@wordpress/block-editor';
import { Popover, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useMergeRefs } from '@wordpress/compose';
import { useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import './editor.scss';

const LINK_SETTINGS = [];

function cn( suffix = '' ) {
	return `wp-block-zetkin-grid-thing-1${ suffix }`;
}

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes } = props;

	const { title, content, url } = attributes;

	const linkValue = useMemo( () => ( { url } ), [ url ] );

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const ref = useRef();
	const richTextRef = useRef();
	const mergedRefs = useMergeRefs( [ setPopoverAnchor, ref ] );

	const [ isEditingUrl, setIsEditingUrl ] = useState( false );

	const blockProps = useBlockProps( {
		ref: mergedRefs,
	} );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ! url && (
						<ToolbarButton
							name="link"
							icon={ linkIcon }
							title={ __( 'Link' ) }
							onClick={ () => {
								setIsEditingUrl( true );
							} }
						/>
					) }

					{ url && (
						<ToolbarButton
							name="link"
							icon={ linkOffIcon }
							title={ __( 'Unlink' ) }
							onClick={ () => {
								setAttributes( {
									url: undefined,
								} );

								setIsEditingUrl( false );
							} }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>

			{ isSelected && ( isEditingUrl || url ) && (
				<Popover
					placement="bottom"
					onClose={ () => {
						setIsEditingUrl( false );

						richTextRef.current?.focus();
					} }
					anchor={ popoverAnchor }
					focusOnMount={ isEditingUrl ? 'firstElement' : false }
					__unstableSlotName={ '__unstable-block-tools-after' }
					shift
				>
					<LinkControl
						value={ linkValue }
						onChange={ ( { url: nextUrl } ) =>
							setAttributes( {
								url: nextUrl,
							} )
						}
						onRemove={ () => {
							setAttributes( {
								url: undefined,
							} );

							setIsEditingUrl( false );

							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingUrl }
						settings={ LINK_SETTINGS }
					/>
				</Popover>
			) }

			<div { ...blockProps }>
				<RichText
					ref={ richTextRef }
					identifier="title"
					className={ cn( '__title' ) }
					placeholder={ __( 'Title' ) }
					allowedFormats={ [] }
					value={ title }
					onChange={ ( nextValue ) => {
						setAttributes( { title: nextValue } );
					} }
				/>

				<RichText
					identifier="content"
					className={ cn( '__content' ) }
					placeholder={ __( 'Content' ) }
					allowedFormats={ [] }
					value={ content }
					onChange={ ( nextValue ) => {
						setAttributes( { content: nextValue } );
					} }
				/>

				{ url && (
					<div className={ cn( '__read-more' ) }>Read More</div>
				) }
			</div>
		</>
	);
}
