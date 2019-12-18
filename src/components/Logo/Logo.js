import React from 'react';
import Tilt from 'react-tilt';
import pug_logo from './pug_logo.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma2 mt0 pa2'>
			<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 125, width: 125 }} >
				<div className="Tilt-inner pa3">
					<img alt='logo' id='logo' src={pug_logo} />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;