import { React, useState } from 'react';
import './App.css';
import Accordion from './components/accordion';
import RandomColor from './components/random-color';


function App() {
  const [ appColor, setAppColor] = useState('#000000')
  return (
    <div className="App" style={{ backgroundColor: appColor,
    height: '500vh'
    }}>
      <Accordion />
      <RandomColor handleColor={setAppColor} />
    </div>
  );
}

export default App;
