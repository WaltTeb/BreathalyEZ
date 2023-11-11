import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';



function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/hello')
    .then(res => res.json())
    .then(data => console.log(data.welcome))
    .catch(err => console.log(err))
  })
  

  return(
    <>
    <div id="basicPage">
      <p>{count}</p>
      <button onClick={() => setCount(count +1)}>Collect Sample</button>
    </div>
    </>
  )
}

export default App;
