import { useState, useEffect } from 'react'
import {
	BsArrowLeftCircleFill,
	BsArrowRightCircleFill
} from 'react-icons/bs';
import './styles.css';


export default function ImageSlider({ url, limit }) {

	const [ images, setImages ] = useState([])
	const [ currentSlide, setCurrentSlide ] = useState(0)
	const [ errorMsg, setErrorMsg ] = useState(null)
	const [ loading, setLoading ] = useState(false)

	async function fetchImages(getUrl) {
		try{
			setLoading(true)
			const response = await fetch(`${getUrl}?page=1&limit=${limit}`)
			const data = await response.json()

			if (data) {
				setImages(data)
				setLoading(false)
			}
		} catch(e) {
			setErrorMsg(e.message)
			setLoading(false)
		}
	}

	function handlePrevious() {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
	}
	
	function handleNext() {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide + 1)
		
	}
	// useEffect to make api request, with the url as a dep
	useEffect(() => {
		if (url) {
			fetchImages(url)
		}
	}, [url])

	if (loading) {
		return (
			<div className="container">
				<p>Loading Data !! pls wait dude</p>
			</div>
		)
	}

	if (errorMsg !== null) {
		return (
			<div className="container">
				<p>{errorMsg}</p>
			</div>
		)
	}
	return (
		<div className="container">
			<BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left"/>
			{
				images && images.length ? 
				images.map((img, idx) => (
					<img 
						key={img.id}
						alt={img.download_url}
						src={img.download_url}
						className={currentSlide === idx ? 'current-image' : 'current-image hide-current-image'}
					/>
					))
					: null
				}
				<BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"/>
				<span className="circle-indicators">
					{
						images && images.length ?
						images.map((_, idx) => {
							return (
								<button 
									key={idx}
									className={currentSlide === idx ? 'current-indicator' : 'current-indicator inactive-indicator'}
									onClick={() => setCurrentSlide(idx)}
								></button>
							)
						})
						: null
					}
				</span>
		</div>
	)
}