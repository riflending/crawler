module.exports = {
    provider: 'https://public-node.rsk.co',
    rskBtcOracleAddr: '0x99ed262dbd8842442cd22d4c6885936db38245e6', //https://explorer.rsk.co/address/0x99ed262dbd8842442cd22d4c6885936db38245e6?__ctab=Code
    mocBtcOracleAddr: '0x7b19bb8e6c5188ec483b784d6fb5d807a77b21bf', //https://github.com/money-on-chain/Amphiraos-Oracle
    mocRifOracleAddr: '0x504efcadfb020d6bbaec8a5c5bb21453719d0e00',
    //RIF
    binanceApi: 'https://api.binance.com/api/v3', // https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#current-average-price
    coingeko: 'https://api.coingecko.com/api/v3', // https://www.coingecko.com/en/api#explore-api
    kucoin: 'https://api.kucoin.com/api/v1', // https://docs.kucoin.com/#get-ticker
    bitfinex: 'https://api-pub.bitfinex.com/v2', // https://docs.bitfinex.com/reference#rest-public-platform-status
    // Needs api key -> mxc: 'https://www.mxc.com', // https://mxcdevelop.github.io/APIDoc/
    bkex: 'https://api.bkex.com/v1', // https://github.com/bkexexchange/bkex-official-api-docs,
    coinbene: 'https://openapi-exchange.coinbene.com//api/exchange/v2', // https://github.com/Coinbene/API-SPOT-v2-Documents/blob/master/openapi-spot-rest-en.md
    //BTC
    // Huobi FUE COMENTADA ya que devolvio 0 en varias ocaciones
    // huobi: 'https://api.huobi.pro', // https://huobiapi.github.io/docs/spot/v1/en/#interface-type
    hitbtc: 'https://api.hitbtc.com/api/2', // https://api.hitbtc.com/#tickers
}