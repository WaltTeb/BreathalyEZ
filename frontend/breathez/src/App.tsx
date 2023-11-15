import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';


const ResponseMessage = (props: { BAC: string }) => {
  let resMessage = "";
  let testBAC: number = Number(props.BAC);
  if (testBAC == 0.00) {
    resMessage = "Safe BAC Level!"
  }
  else if ((testBAC > 0.00) && (testBAC < 0.08)) {
    resMessage = "Below Legal Limit, Please Use Discretion."
  }
  else if (testBAC < 0.00) {
    resMessage = "An Error Occurred, Please Try Again."
  }
  else {
    resMessage = "Above Legal Limit, DO NOT DRIVE!"
  }
  return (
    <p>{resMessage}</p>
  )
}

function App() {
  const [collecting, setCollecting] = useState<boolean>(false);
  const [BAC, setBAC] = useState("0.000");

  const rpi_address = process.env.REACT_APP_RPI_IP_ADDRESS;

  async function handleCollectSample() {
    fetch(`http://${rpi_address}:5000/hello`)
      .then(res => res.json())
      .then((data) => {
        let BACVal: number = data.BAC;


        setBAC(String(BACVal.toFixed(3)));
        setCollecting(false);
      })
      .catch(err => console.log(err))
  }


  return (
    <>

      <div id="basicPage">
        <div id="titleCard">
          <h1>BreathalyEZ</h1>
        </div>
        <div id="lowerPage">
          <div className="textField" id="textArea">

            {collecting ?
              <p>Collecting Sample...</p> :
              <p>{`BAC = ${BAC}`}</p>}

          </div>

          <Button
            disabled={collecting}
            id="collectSampleButton"
            variant="contained"
            onClick={() => {
              setCollecting(true);
              handleCollectSample()
            }
            }

          >
            Collect Sample</Button>
        </div>
        <div className="textField" id="resMessage">
          <ResponseMessage BAC={BAC} />
        </div>
      </div>

    </>
  )
}

export default App;
