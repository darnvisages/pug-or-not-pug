import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onKeyPress, onButtonSubmit }) => {
	return (
		<div className=' mt0 w-100'>
			<p className='f4'>
				{'This essential app detects pugs in images.'}
				<br />
				{'Enter a URL to try it out!'}
			</p>
			<div className='w-100'>
				<div className='w-100 center stairs pa3 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} onKeyPress={onKeyPress} />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-gray'
						onClick={onButtonSubmit}
					>Sniff</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;