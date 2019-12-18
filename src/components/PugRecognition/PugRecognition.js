import React from 'react';
import './PugRecognition.css';

const PugRecognition = ( { imageUrl, boxes }) => {
	let  boxList = <div></div>;
	if (boxes.length > 0) {
		boxList = boxes.map((box, i) => {
			return (
				<div key={i} className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} ></div>
			)
		})
	}
	return (
		<div className='center ma'>
			<div className='center absolute mt2 mb5'>
				<img  alt='' id='inputimage' src={imageUrl} />
				{ boxList }
			</div>
		</div>
	)
}

export default PugRecognition;