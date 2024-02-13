import { React, useEffect, useState } from 'react';
import './styles.css';

export default function RandomColor(props) {
	const [typeOfColor, setTypeOfColor] = useState('hex');
	const [color, setColor] = useState('#000000')

	function randomColorUtility(len) {
		return Math.floor(Math.random() * len)
	}

	function handleCreateRandomHexColour() {
		const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

		let hexColor = '#';

		for (let i = 0; i < 6; i++) {
			hexColor += hex[randomColorUtility(hex.length)]
		}

		console.log('hex', hexColor);
		setColor(hexColor)
		props.handleColor(hexColor)

	}

	function handleCreateRandomRgbColour() {
		const r = randomColorUtility(256)
		const g = randomColorUtility(256)
		const b = randomColorUtility(256)

		setColor(`rgb(${r},${g},${b})`)
		props.handleColor(`rgb(${r},${g},${b})`)
	}

	useEffect(() => {
		if (typeOfColor === 'rgb') {
			handleCreateRandomRgbColour()
		}
		handleCreateRandomHexColour()
	}, [typeOfColor])
	return (
		<div>
			<div className='container' style={{
				width: '100%',
				background: color
			}}>
				<button onClick={() => setTypeOfColor('hex')}>create HEX Colour</button>
				<button onClick={() => setTypeOfColor('rgb')}>create RGB Colour</button>
				<button onClick={
					typeOfColor === 'hex'
						? handleCreateRandomHexColour
						: handleCreateRandomRgbColour
				}>Generate Random Colour</button>

			</div>

			<div>
				<h4 className='display'>
					{typeOfColor}

				</h4>
				<h1 className='display'>
					{color}

				</h1>
			</div>
		</div>
	)
}