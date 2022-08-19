// Footer.stories.ts|tsx

import React from 'react'

import Footer from './footer';

const customViewports = {
  figmaViewPort: {
    name: 'Figma',
    styles: {
      width: '1440px',
      height: '287px',
    },
  },
};



export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Footer',
	parameters:{
	  	viewport: { viewports: customViewports },
	  }
}



export const FooterExample = () => (
	
	<Footer />
		
)
