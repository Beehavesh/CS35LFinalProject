import { useState } from 'react'
import './App.css'

function App() {
  // ✅ Hooks must be inside the component function
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h1>LinkedOut</h1>
      <div>
        <label htmlFor="myInput">Resume:</label>
        <input
          type="text"
          id="myInput"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type here..."
        />
      </div>
    </>
  );
}

export default App;

