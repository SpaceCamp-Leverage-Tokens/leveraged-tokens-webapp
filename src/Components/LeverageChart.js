import React, {useEffect, useState} from 'react';
import { VictoryChart, VictoryLegend, VictoryLine } from "victory";
import { Container } from '@material-ui/core';
import { LCDClient } from '@terra-money/terra.js';

const LeverageChart = ({ props }) => {

  const terra = new LCDClient({
      URL: 'http://localhost:1317',
      chainID: 'localterra'
  });
  
  const [historicalData, setHistoricalData] = useState([])
  const [levHistoricalData, setLevHistoricalData] = useState([])

  useEffect( ()=> {
    getData();
  },[]);


  async function getData(){        
    const historicalData = await props.getHistoricalData(terra);

    const myParsedData = parseData(historicalData)
    const myLevParsedData = parseData(historicalData)

    console.log(myParsedData)
    setHistoricalData(myParsedData)
   
    myLevParsedData[1].y = myLevParsedData[1].y + 20;
    setLevHistoricalData(myLevParsedData)
  }

  function parseData(data){
    const myParsedData = [];
    for(let i = 0; i<data.length; i++){
      myParsedData.push({
        x: new Date(data[i].timestamp * 1000),
        y: data[i].asset_price*10e-6
      })

      // TODO Remove After real data
      myParsedData.push({
        x: new Date(data[i].timestamp * 1000 + 1000000000),
        y: data[i].asset_price*10e-6 + 100
      })
    }
    return myParsedData
  }

  return (
      <Container className="ui card fluid">
          <div className="content">
              <h2 className="ui header">{props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x Pool</h2>
              <VictoryChart               
              scale={{x:"time"}}>

              <VictoryLine style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
              }}
              data={historicalData}
              />
              
              <VictoryLine style={{
                data: { stroke: "green", strokeDasharray:[3] },
                parent: { border: "1px solid #ccc"}
              }}
              data={levHistoricalData}
              />
              <VictoryLegend x={75} y={20}
              gutter={20}
              data={[
              { name: "Price", symbol: { fill: "#c43a31", type: "line" } },
              { name: "Leveraged Price", symbol: { fill: "green" } },
              ]}
          />
            </VictoryChart>
          </div>
      </Container>
  );
}
 
export default LeverageChart;