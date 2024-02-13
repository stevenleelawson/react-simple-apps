import { React, useState } from 'react';
import './styles.css';
import data from './data.js';

export default function Accordion() {

	const [selected, setSelected] = useState(null);

	const [enableMulti, setEnableMulti] = useState(false);

	const [multiple, setMultiple] = useState([])

	function handleSingleSelection(currId) {
		setSelected(currId === selected ? null : currId)
		console.log('sel', selected);
	}

	function handleMultiSelection(currId) {
		// make var so as to NOT mutate state
		let copyVar = [...multiple];

		const findIndexOf = copyVar.indexOf(currId)
		
		if (findIndexOf === -1) {
			copyVar.push(currId)
		} else {
			copyVar.splice(findIndexOf, 1)
		}
		
		setMultiple(copyVar)
	}

	// this is how we would do this in vue with a computed(), but evidently NOT in react, see below
	function changeBtnClass() {
		return enableMulti ? 'multi' : 'single'
	}

	return (
		<div className='wrapper'>
			<button className={`${enableMulti ? 'multi' : 'single'}`} onClick={() => setEnableMulti(!enableMulti)}>enable multi</button>
			{
				data && data.length ?
					data.map(item => <div key={item.id} className="accordion">
						<div className='title' onClick={enableMulti ? () => handleMultiSelection(item.id) : () => handleSingleSelection(item.id)}>
							<h3>{item.question}</h3>
							<span>+</span>
						</div>
						{
							enableMulti ?
							multiple.indexOf(item.id) !== -1 && (
								<div className='content'>{item.answer}</div>
							)
							: selected === item.id && (
								<div className='content'>{item.answer}</div>
							)
						}
					</div>)
					: <div>No data found</div>
			}
		</div>
	)
}