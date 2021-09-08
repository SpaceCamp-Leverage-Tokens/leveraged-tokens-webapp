Leveraged Tokens on Terra Network (Webapp)
==========================================

Webapp and main user-interface for participating in the trading of leveraged
tokens on Terra.

Contract Addresses
------------------

All contracts are deployed on the Bombay-10 network.

| Contract Name                                      | Address                                  |
| -------------------------------------------------- | -------------------------------------------- |
| Factory                                            | [terra16sjkmp79wku8hg3su7uqxqgm9770r0ddz8kdq8](https://finder.terra.money/bombay-10/address/terra16sjkmp79wku8hg3su7uqxqgm9770r0ddz8kdq8)|
| mTSLA 2x leverage pool                             | [terra14kqxdu9rv97dhrwq3ns444rnwhzz0s72k0nt7d](https://finder.terra.money/bombay-10/address/terra14kqxdu9rv97dhrwq3ns444rnwhzz0s72k0nt7d)|
| MIR 3x leverage pool                               | [terra1kn9e6pmcqsynkmu4vra4wmxv0f4f5m356ul6re](https://finder.terra.money/bombay-10/address/terra1kn9e6pmcqsynkmu4vra4wmxv0f4f5m356ul6re)|

Minting a leveraged position requires access to the mocked
[MIR](https://finder.terra.money/bombay-10/address/terra1k59qq3pxj93arv399l4a90ndewn50gfy8nkcn2)
or
[mTSLA](https://finder.terra.money/bombay-10/address/terra1dsh6lll9av4dqk57juavk6dg4yzh9twhe600z6)
assets which back the leveraged positions.

Getting and Running the Webapp
------------------------------

Use these steps to clone from our repository and to run the webapp locally.

```
git clone https://github.com/SpaceCamp-Leverage-Tokens/leveraged-tokens-webapp
cd leveraged-tokens-webapp
yarn install
yarn start
```

NOTE: The first run of `yarn start` invokes `yarn build` to actually build the
webapp. Subsequent runs of `yarn start` once built are much faster because the
build artifacts are cached.
