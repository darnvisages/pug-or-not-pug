import React from 'react';
import './PugRecognition.css';

const PugRecognition = ( { imageUrl, boxes, isPug }) => {
	let  boxList = <div></div>;
	if (boxes.length > 0) {
		boxList = boxes.map((box, i) => {
			return (
				<div key={i} className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} ></div>
			)
		})
	}
	const pugResult = isPug ? <p className='center b f1 green'>PUG</p> : <p className='center b f1 red'>NOT PUG</p>;
	const faceResult = boxes.length > 0 ? <p className='center ma'>Pro Tip: boxes indicate faces on people. People are not pugs. <br /> Now you know.</p> : <div></div>;

	if (imageUrl.length > 0)
		return (
			<div>
				<div id='result' className='center mv-0 br3 pa2 w-90 w-75-m w-75-s'>
					{ pugResult }
					{ faceResult }
				</div>
				<div className='center ma0'>
					<div className='center absolute mt2 mb5'>
						<img  alt='' id='inputimage' src={imageUrl} />
						{ boxes.length > 0 ? boxList : <div></div> }
					</div>
				</div>
			</div>
		)
	else {
		return (
			<div></div>
		)
	}
}

export default PugRecognition;