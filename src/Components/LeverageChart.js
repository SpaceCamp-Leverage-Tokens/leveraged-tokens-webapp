import React, {useEffect, useState} from 'react';
import { VictoryChart, VictoryLegend, VictoryLine, VictoryAxis, VictoryScatter} from "victory";
import { Container } from '@material-ui/core';
import { LCDClient } from '@terra-money/terra.js';

const LeverageChart = ({ props }) => {
  
  const [historicalData, setHistoricalData] = useState([])
  const [levHistoricalData, setLevHistoricalData] = useState([])

  const [leveragePrice, setLeveragePrice] = useState(0)
  const [assetPrice, setAssetPrice] = useState(0)
  const [levOpeningPrice, setLevOpeningPrice]= useState(0)
  const [assetOpeningPrice, setAssetOpeningPrice]= useState(0)

  useEffect( ()=> {
    getData();
  },[]);


  async function getData(){   
    parsePriceContext(props.price_context)     
  }

  function parsePriceContext(priceContext){
    const myParsedData = []

    myParsedData.push({
      x: new Date(priceContext.opening_snapshot.timestamp* 1000),
      y: parseFloat(priceContext.opening_snapshot.asset_price)*10e-6,
    })

    myParsedData.push({
      x: new Date(priceContext.current_snapshot.timestamp* 1000),
      y: parseFloat(priceContext.current_snapshot.asset_price)*10e-6,
    })
    setHistoricalData(myParsedData)
    

    const levData = []    

    levData.push({
      x: new Date(priceContext.opening_snapshot.timestamp* 1000),
      y: parseFloat(priceContext.opening_snapshot.leveraged_price)*10e-6,
    })

    levData.push({
      x: new Date(priceContext.current_snapshot.timestamp* 1000),
      y: parseFloat(priceContext.current_snapshot.leveraged_price)*10e-6,
    })
    setLevHistoricalData(levData)

    setAssetOpeningPrice(myParsedData[0].y.toFixed(2))
    setAssetPrice(myParsedData[1].y.toFixed(2))

    setLeveragePrice(levData[1].y.toFixed(2))
    setLevOpeningPrice(levData[0].y.toFixed(2))


  }

  return (
      <Container className="ui card fluid">
          <div className="content">
              <div>
              <h2 className="ui header">{props.assetInfo.symbol}-{props.leveragedPoolInfo.leverage_amount}x ~ {leveragePrice} UST</h2>
              {props.assetInfo.symbol} Current Price ~ {assetPrice} -- Opening Price: {assetOpeningPrice}
              </div>
              <VictoryChart           
              scale={{x:"time"}}>

              <VictoryAxis dependentAxis
                offsetX={50}
              />
              <VictoryAxis />

              <VictoryLine style={{
                data: { stroke: "#c43a31" },
                parent: {  marginLeft:"10px",
                  border: "1px solid #ccc"}
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