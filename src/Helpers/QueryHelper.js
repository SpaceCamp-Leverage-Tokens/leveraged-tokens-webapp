import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { sendTransaction } from "./helpers";

export const factoryId = "terra1edqzdggfclw6t5dg8y0n05kk0k7te3ra5n6yw9";

export class PoolFactory{
    constructor(terra){
        this.factoryId = factoryId
        return ( async () => {
            // All async code here
            const poolIds = await this.getPoolIds(terra)
            this.poolIds = poolIds
            return this; // when done
        })();
    }

    async getPoolIds(terra){
        const queryFactoryPools = await terra.wasm.contractQuery(this.factoryId,{
            get_pools:{}
            });
        return queryFactoryPools.pool_ids
    }

    async resetLeveragePriceReference(terra, user){

        // just to test that button works etc
        const levPoolsHyperParams = {
            leverage_amount:3,
            leveraged_asset_addr: "terra1atgpe9ypjg037ahw8yjzydzkesaudhu7kp0fac",
            minimum_protocol_ratio: 2,
            mint_premium: 3,
            rebalance_premium: 1,
            rebalance_ratio: 3,
            terraswap_pair_addr: "terra1quuj8vzvg3phu0qemtpxn2dj983qnuga5fegqn",
          }

          ///TODO:Change to reset leverage command 
        await sendTransaction(terra, user, [
            new MsgExecuteContract(user.key.accAddress, this.factoryId, {
              create_new_pool: { pool_instantiate_msg:levPoolsHyperParams }
            }),
          ]);
    }

}

export class LeveragedPool{
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

    async getHistoricalData(terra){
        const queryHistoricalData = await terra.wasm.contractQuery(this.contractId,{
            asset_price_history:{}
            });
        return queryHistoricalData.price_history
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