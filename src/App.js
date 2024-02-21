import { React, useState } from 'react';
import './App.css';
import Accordion from './components/accordion';
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';
import ImageSlider from './components/image-slider';


function App() {
  const [ appColor, setAppColor] = useState('#000000')
  return (
    <div className="App" style={{ backgroundColor: appColor,
    height: '500vh'
    }}>
      <Accordion />
      <RandomColor handleColor={setAppColor} />
      <StarRating noOfStars={10}/>
      <ImageSlider url={'https://picsum.photos/v2/list'} limit={'10'}/>
    </div>
  );
}

export default App;
