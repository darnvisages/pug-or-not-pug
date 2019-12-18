import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='ma4 mt0'>
			<p className='f3'>
				{'This magic brain will detect pugs in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='center form stairs pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button 
						className='w-25 grow f4 link ph3 pv2 dib white bg-gray'
						onClick={onButtonSubmit}
					>Sniff</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;