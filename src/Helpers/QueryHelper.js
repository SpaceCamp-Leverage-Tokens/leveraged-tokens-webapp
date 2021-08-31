export const mockAllContractsIds = ["terra19k9v4cgzyn2qzteqlusg76ckafwp2fkuhn7s6r","terra15ewuykdallc37qm9l5u0ueakcq0f8wfwsm9krk"]

export async function getPoolData(leveragedPoolId, terra){
    const queryLeveragedPoolInfoPromise = await terra.wasm.contractQuery(leveragedPoolId,{
        all_pool_info:{}
        });
    
    const queryAssetInfoPromise = await terra.wasm.contractQuery(queryLeveragedPoolInfoPromise.hyperparameters.leveraged_asset_addr,
        {
        token_info:{}
        });

    const queryCurrentPricePromise = await terra.wasm.contractQuery(queryLeveragedPoolInfoPromise.hyperparameters.terraswap_pair_addr,
        {
            pool:{}
        });
    
    const poolData = { assetInfo: queryAssetInfoPromise,
        leveragedPoolId:leveragedPoolId,
        leveragedPoolInfo: queryLeveragedPoolInfoPromise.hyperparameters,
        leveragedPoolState: queryLeveragedPoolInfoPromise.pool_state,
        terraSwapPoolInfo: queryCurrentPricePromise,
    }

    
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

export class leveragedPool{
    constructor(contractId, terra){
        this.contractId = contractId
        return ( async () => {
            // All async code here
            const poolData = await this.getPoolData(contractId,terra);
            this.assetInfo = poolData.assetInfo;
            this.leveragedPoolId = poolData.leveragedPoolId;
            this.leveragedPoolInfo = poolData.leveragedPoolInfo;
            this.leveragedPoolState = poolData.leveragedPoolState;
            this.terraSwapPoolInfo = poolData.terraSwapPoolInfo;
            this.assetPrices = this.getCurrentPrices()
            this.dynamicPoolValues = this.getDynamicValues()
            return this; // when done
        })();
    }

    get24Volume(){
        return 0 
    }
    getCurrentPrices(){
        const currentAssetPrice = 1e6*this.terraSwapPoolInfo.assets[1].amount / this.terraSwapPoolInfo.assets[0].amount
        const percentIncrease = this.leveragedPoolInfo.leverage_amount*(currentAssetPrice - this.leveragedPoolState.asset_opening_price.u_price)/this.leveragedPoolState.asset_opening_price.u_price
        const currentLeveragedPrice = (1+percentIncrease)*this.leveragedPoolState.leveraged_opening_price.u_price
        return {currentAssetPrice: currentAssetPrice,
            percentIncrease: percentIncrease,
            currentLeveragedPrice: currentLeveragedPrice}
    }

    getDynamicValues(){
        const totLockVal = this.currentAssetPrice*this.leveragedPoolState.assets_in_reserve
        const totLevVal = this.currentLeveragedPrice*this.leveragedPoolState.total_leveraged_assets
        const PR = totLockVal/totLevVal
        const vol = this.get24Volume()

        return {totalLockedValue:totLockVal,
                totalLeveragedValue:totLevVal,
                protocolRatio: PR,
                volume: vol }
    }

    async getPoolData(contractId, terra){
            const queryLeveragedPoolInfoPromise = await terra.wasm.contractQuery(contractId,{
                all_pool_info:{}
                });
        
            const queryCurrentPricePromise = await terra.wasm.contractQuery(queryLeveragedPoolInfoPromise.hyperparameters.terraswap_pair_addr,
                {
                    pool:{}
                });
        
            const queryAssetInfoPromise = await terra.wasm.contractQuery(queryLeveragedPoolInfoPromise.hyperparameters.leveraged_asset_addr,
                {
                token_info:{}
                });
                
                const poolData = { assetInfo: queryAssetInfoPromise,
                    leveragedPoolId:contractId,
                    leveragedPoolInfo: queryLeveragedPoolInfoPromise.hyperparameters,
                    leveragedPoolState: queryLeveragedPoolInfoPromise.pool_state,
                    terraSwapPoolInfo: queryCurrentPricePromise,
                }
            

        return poolData
        }
}