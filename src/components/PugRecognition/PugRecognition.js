import React from 'react';
import './PugRecognition.css';

const PugRecognition = ( { imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='searchImage' alt='' src={imageUrl}/>
			</div>
		</div>
	)
}

export default PugRecognition;