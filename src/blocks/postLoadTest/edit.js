// Import necessary components and hooks from WordPress packages
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

// Define the Edit function, which is the main component of this file
export default function Edit({ attributes, setAttributes }) {
	// Destructure the attributes object to get the taxonomy and term values
	const { taxonomy, term } = attributes;

	// Define state variables for taxonomies, terms, postTitle, and featuredImage
	const [taxonomies, setTaxonomies] = useState([]);
	const [terms, setTerms] = useState([]);
	const [postTitle, setPostTitle] = useState('');
	const [featuredImage, setFeaturedImage] = useState('');

	// Use the useEffect hook to fetch taxonomies when the component mounts
	useEffect(() => {
		apiFetch({ path: '/wp/v2/taxonomies' }).then((taxonomies) => {
			const taxonomyOptions = Object.keys(taxonomies).map((key) => ({
				label: taxonomies[key].name,
				value: key,
			}));
			setTaxonomies(taxonomyOptions);
		});
	}, []);

	// Use the useEffect hook to fetch terms whenever the taxonomy changes
	useEffect(() => {
		if (taxonomy) {
			apiFetch({ path: `/wp/v2/${taxonomy}` })
				.then((terms) => {
					const termOptions = terms.map((term) => ({
						label: term.name,
						value: term.slug,
					}));
					setTerms(termOptions);
				})
				.catch(() => {
					setTerms([]);
				});
		} else {
			setTerms([]);
		}
	}, [taxonomy]);

	// Use the useEffect hook to fetch posts whenever the taxonomy or term changes
	useEffect(() => {
		if (taxonomy && term) {
			apiFetch({ path: `/wp/v2/posts?${taxonomy}=${term}` })
				.then((posts) => {
					if (posts.length > 0) {
						setPostTitle(posts[0].title.rendered);
						if (posts[0].featured_media) {
							apiFetch({ path: `/wp/v2/media/${posts[0].featured_media}` })
								.then((media) => {
									setFeaturedImage(media.source_url);
									// Send data to render.php
									fetch('render.php', {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											title: posts[0].title.rendered,
											image: media.source_url,
										}),
									});
								})
								.catch(() => {
									setFeaturedImage('');
								});
						} else {
							setFeaturedImage('');
						}
					} else {
						setPostTitle('');
						setFeaturedImage('');
					}
				})
				.catch(() => {
					setPostTitle('');
					setFeaturedImage('');
				});
		} else {
			setPostTitle('');
			setFeaturedImage('');
		}
	}, [taxonomy, term]);

	// Define the handleChangeTaxonomy function, which updates the taxonomy and resets the term
	const handleChangeTaxonomy = (newTaxonomy) => {
		setAttributes({ taxonomy: newTaxonomy, term: '' });
	};

	// Define the handleChangeTerm function, which updates the term
	const handleChangeTerm = (newTerm) => {
		setAttributes({ term: newTerm });
	};

	// Render the component
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Taxonomy Settings', 'your-theme')}>
					<SelectControl
						label={__('Taxonomy', 'your-theme')}
						value={taxonomy}
						options={taxonomies}
						onChange={handleChangeTaxonomy}
					/>
					{taxonomy && (
						<SelectControl
							label={__('Term', 'your-theme')}
							value={term}
							options={terms}
							onChange={handleChangeTerm}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{postTitle && (
					<h1>
						{__('', 'your-theme')} {postTitle}
					</h1>
				)}
				{featuredImage && (
					<img src={featuredImage} alt={__('Featured image', 'your-theme')} />
				)}
			</div>
		</>
	);
}
