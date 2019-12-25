import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white f3'>
				{`${name}, you've sniffed ${entries} images`}
			</div>
		</div>
	)
}

export default Rank;