import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './styles.css';

export default function StarRating({ noOfStars = 5 }) {

	const [ rating, setRating ] = useState(0)
	const [ hover, setHover ] = useState(0)

	function handleClick(currI) {
		setRating(currI)
	}
	
	function handleMouseEnter(currI) {
		setHover(currI)
		
	}
	
	function handleMouseLeave(currI) {
		// this will be 0 if rating is not set, and whatever was clicked if not
		setHover(rating)
	}

	return (
		<div className="star-rating">
			{
				[...Array(noOfStars)].map((star, idx) => {
					// coz of zero index
					idx += 1;
					return <FaStar 
					 	key={idx}
						// class based on active state
						className={idx <= (hover || rating) ? 'active' : 'inactive'}
					 	onClick={() => handleClick(idx)} 
					 	onMouseMove={() => handleMouseEnter(idx)} 
					 	onMouseLeave={() => handleMouseLeave()} 
						size={40}
					 />
				})
			}
		</div>
	)
}