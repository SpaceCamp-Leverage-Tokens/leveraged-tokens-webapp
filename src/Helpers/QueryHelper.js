import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { sendTransaction, queryTokenBalance, toEncodedBinary } from "./helpers";
export const factoryId = "terra1yr676ux2hncy2ufc86z54kr9ltjt883whj30d8";
export const mk = ""

export class PoolFactory{
    constructor(terra){
        this.factoryId = factoryId
        return ( async () => {
            // All async code here
            const poolIds = await this.getPoolIds(terra)
            const timestamp = await this.getLastResetTimestamp(terra)
            this.lastRestampTime = timestamp
            this.poolIds = poolIds
            return this; // when done
        })();
    }

    async getLastResetTimestamp(terra){
        const queryFactoryPools = await terra.wasm.contractQuery(this.factoryId,{
            get_last_reset:{}
            });
        return queryFactoryPools.timestamp
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

          ///TODO: Change to reset leverage command 
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
            this.price_context = poolData.price_context;
            this.leveragedPoolId = poolData.leveragedPoolId;
            this.leveragedPoolInfo = poolData.leveragedPoolInfo;
            this.leveragedPoolInfo.leverage_amount =  (poolData.leveragedPoolInfo.leverage_amount*10e-6).toFixed(1);

            this.leveragedPoolState = poolData.leveragedPoolState;
            this.terraSwapPoolInfo = poolData.terraSwapPoolInfo;
            this.dynamicPoolValues = this.getDynamicValues()
            this.underlyingAssetAddr = this.leveragedPoolInfo.leveraged_asset_addr
            return this; // when done
        })();
    }

    async addLiquidity(terra, user, amountOfAsset){
        await sendTransaction(terra, user, [
            new MsgExecuteContract(user.key.accAddress, this.underlyingAssetAddr, {
              send: {
                contract: this.contractId,
                amount: amountOfAsset,  
                msg: toEncodedBinary({
                  provide_liquidity: { },
                }),   
              },
            }),
          ]);
    }

    async mintLeveragePosition(terra, user, amountOfAsset){
        await sendTransaction(terra, user, [
            new MsgExecuteContract(user.key.accAddress, this.underlyingAssetAddr, {
              send: {
                contract: this.contractId,
                amount: amountOfAsset,  
                msg: toEncodedBinary({
                    mint_leveraged_position: { },
                }),   
              },
            }),
          ]);
    }

    async withdrawLiquidity(terra, user, amountOfShares){
        await sendTransaction(terra, user, [
            new MsgExecuteContract(user.key.accAddress, this.contractId, {
              withdraw_liquidity:{
                share_of_pool:amountOfShares
              }
            }),
          ]);
    }



    async getHistoricalData(terra){
        const queryHistoricalData = await terra.wasm.contractQuery(this.contractId,{
            price_history:{}
            });
        return queryHistoricalData.price_history
    }

    async getMyBalanceInPool(terra, wallet){
        const myPoolShare = await terra.wasm.contractQuery(this.leveragedPoolId,{
            liquidity_position:{
              address:wallet
            }
          })

          const myShare = this.dynamicPoolValues.totalLockedValue*myPoolShare.position.asset_pool_partial_share/myPoolShare.position.asset_pool_total_share;
          var ust = (10e-6*myShare).toFixed(2)
          
          if (isNaN(ust) ){
              ust = 0
          }

          const myBalance = {
            raw: myPoolShare.position.asset_pool_partial_share,
            total: myPoolShare.position.asset_pool_total_share,
            ust: ust
        }
          return myBalance
    }

    async getMyLevBalanceInPool(terra, wallet){
        
        const myPoolShare = await terra.wasm.contractQuery(this.leveragedPoolId,{
            leveraged_position:{
              address:wallet
            }
          })
        
        const myShare = myPoolShare.position.leveraged_pool_partial_share*this.price_context.current_snapshot.leveraged_price;
        var ust = (10e-6*myShare).toFixed(2)
        
        if (isNaN(ust) ){
            ust = 0
        }

        const myBalance = {
        raw: myPoolShare.position.leveraged_pool_partial_share,
        total: myPoolShare.position.leveraged_pool_total_share,
        ust: ust
        }
        return myBalance
    }

    convertToUST(amount){
        return 10e-6*amount*parseInt(this.price_context.current_snapshot.asset_price).toFixed(2)
    }

    async getMyBalance(terra, wallet){
        const myTokenBalance = await queryTokenBalance(terra,wallet, this.leveragedPoolInfo.leveraged_asset_addr);

        const myBalance = {
            raw: myTokenBalance,
            ust: this.convertToUST(myTokenBalance)
        }
        return myBalance
    }

    get24Volume(){
        return 0 
    }

    getDynamicValues(){
        const totLockVal = (this.price_context.current_snapshot.asset_price*this.leveragedPoolState.assets_in_reserve*10e-6).toFixed(2)
        const totLevVal = (this.price_context.current_snapshot.leveraged_price*this.leveragedPoolState.total_leveraged_assets*10e-6).toFixed(2)
        const PR = (totLockVal/totLevVal).toFixed(2)
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
                price_context: queryLeveragedPoolInfoPromise.price_context,
            }
            

        return poolData
        }
}