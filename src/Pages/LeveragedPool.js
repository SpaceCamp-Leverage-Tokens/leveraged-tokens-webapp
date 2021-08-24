import React from 'react';
import { useLocation } from "react-router-dom";

const LeveragedPool = ({ props }) => { 
    const location = useLocation();
    console.log(location)
    return (
       <div id='Leveraged Pool'>
           {location.state.assetName}
           <h1>AssetName</h1>

       </div>
    );
}
 
export default LeveragedPool;