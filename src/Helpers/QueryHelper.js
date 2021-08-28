import {
    LCDClient,
  } from "@terra-money/terra.js";

export const mockAllContractsIds = ["terra1mdsrlfcsttduvcs35dhc8cm99c4v752he3s86w","terra1wzra23ec89lljapuffjussh8k0g9pm6n7gqkjl"];
  
export async function getPoolData(leveragedPoolId, terra){
    const queryLeveragedPoolInfoPromise = await terra.wasm.contractQuery(leveragedPoolId,{
        hyperparameters:{}
        });
    
    const queryAssetInfoPromise = await terra.wasm.contractQuery(queryLeveragedPoolInfoPromise.leveraged_asset_addr,
        {
        token_info:{}
        });

    const poolData = { assetInfo:queryAssetInfoPromise,
            leveragedPoolId:leveragedPoolId,
            leveragedPoolInfo:queryLeveragedPoolInfoPromise}
    
    return poolData
}


export async function getAllData(allContractsIds,terra){
    const tempMyData = [];

    for (var i=0; i<allContractsIds.length; i++) {
        const myData = await getPoolData(allContractsIds[i],terra)
        tempMyData.push(myData)
    }
    return tempMyData
}