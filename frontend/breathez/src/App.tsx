import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// const RSP_IP = {process.env.REACT_APP_RPI_IP_ADDRESS}

function handleCollect(setCollecting:any, setProgress:any, prevProgress:number) {
  setCollecting(true);
  const timer = setInterval(() => {
    if(prevProgress <= 95){
      prevProgress += 5;
      setProgress(prevProgress)
    }else{
      setProgress(0);
      clearInterval(timer);
      setCollecting(false);
    }
  }, 200)

  

  return;
}

function App() {
  const [collecting, setCollecting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const rpi_address = process.env.REACT_APP_RPI_IP_ADDRESS;

  // useEffect(() => {
  //   fetch(`http://${rpi_address}:5000/hello`)
  //   .then(res => res.json())
  //   .then(data => console.log(data.welcome))
  //   .catch(err => console.log(err))
  // })
  

  return(
    <>
      <div id="basicPage">
        <div id="titleCard">
          <h1>BreathalyEZ</h1>
        </div>
        <div id="lowerPage">
          {collecting && <CircularProgress 
          variant='determinate'
          value={progress}
          id="collectionProgress"
          />}
          <Button
          variant="contained"
            onClick={() => handleCollect(setCollecting, setProgress, progress)}
          >
            Collect Sample</Button>
        </div>
      </div>
    </>
  )
}

export default App;
