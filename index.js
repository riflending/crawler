const axios = require('axios')
const ethers = require('ethers')
const config = require('./config.js')
const mocOracleAbi = require('./abis/mocOracle.json')
const rskOracleAbi = require('./abis/rskOracle.json')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function toDateAndTime(timestamp) {
    return new Date(timestamp*1000).toLocaleString()
}
async function main() {
    const provider = new ethers.providers.JsonRpcProvider(config.provider)
    const rskBtcOracle = new ethers.Contract( config.rskBtcOracleAddr , rskOracleAbi , provider )
    const mocBtcOracle = new ethers.Contract( config.mocBtcOracleAddr , mocOracleAbi , provider )
    const mocRifOracle = new ethers.Contract( config.mocRifOracleAddr , mocOracleAbi , provider )

    const records = []
    const csvWriter = createCsvWriter({
        path: './data.csv',
        header: [
            {id: 'source', title: 'source'},
            {id: 'asset', title: 'asset'},
            {id: 'price', title: 'price'},
            {id: 'timestamp', title: 'timestamp'},
            {id: 'runAt', title: 'runAt'}
        ]
    });

    setInterval(async () => {
        const  currentTime = new Date().toLocaleString()
        console.log('FETCHING DATA', currentTime)
        // RSK RBTC
        try {
            const rskRbtcResult = await rskBtcOracle.getPricing()
            records.push({
                source: 'rskOracle',
                asset: 'BTC',
                price: ethers.utils.formatEther(rskRbtcResult.price),
                timestamp: toDateAndTime(rskRbtcResult.timestamp),
                runAt: currentTime
            })
        } catch(err) {
            console.error('RSK BTC ORACLE ERROR', err)
        }

        // MOC RBTC
        try {
            const mocRbtcResult = await mocBtcOracle.peek()
            records.push({
                source: 'mocOracle',
                asset: 'BTC',
                price: ethers.utils.formatEther(mocRbtcResult[0]),
                timestamp: 'unknown',
                runAt: currentTime
            })
        } catch(err) {
            console.error('MOC BTC ORACLE ERROR', err)
        }

        // MOC RIF
        try {
            const mocRifResult = await mocRifOracle.peek()
            records.push({
                source: 'mocOracle',
                asset: 'RIF',
                price: ethers.utils.formatEther(mocRifResult[0]),
                timestamp: 'unknown',
                runAt: currentTime
            })
        } catch(err) {
            console.error('MOC RIF ORACLE ERROR', err)
        }

        // BINANCE BTC
        try {
            const binanceBtcResult = await axios.get(config.binanceApi + '/ticker/price?symbol=BTCUSDT')
            records.push({
                source: 'binanace',
                asset: 'BTC',
                price: binanceBtcResult.data.price,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BINANCE BTC ERROR', err)
        }

        // BINANCE RIF
        try {
            const binanceRifResult = await axios.get(config.binanceApi + '/ticker/price?symbol=RIFUSDT')
            records.push({
                source: 'binanace',
                asset: 'RIF',
                price: binanceRifResult.data.price,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BINANCE RIF ERROR', err)
        }

        // COINGEKO RBTC
        try {
            const coingekoRbtcResult = await axios.get(config.coingeko + '/simple/price?ids=rootstock&vs_currencies=usd')
            records.push({
                source: 'coingeko',
                asset: 'RBTC',
                price: coingekoRbtcResult.data['rootstock'].usd,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('COINGEKO RBTC ERROR', err)
        }

        // COINGEKO BTC
        try {
            const coingekoBtcResult = await axios.get(config.coingeko + '/simple/price?ids=bitcoin&vs_currencies=usd')
            records.push({
                source: 'coingeko',
                asset: 'BTC',
                price: coingekoBtcResult.data['bitcoin'].usd,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('COINGEKO BTC ERROR', err)
        }

        // COINGEKO RIF
        try {
            const coingekoRifResult = await axios.get(config.coingeko + '/simple/price?ids=rif-token&vs_currencies=usd')
            records.push({
                source: 'coingeko',
                asset: 'RIF',
                price: coingekoRifResult.data['rif-token'].usd,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('COINGEKO RIF ERROR', err)
        }

        // KUCOIN RBTC-BTC
        try {
            const KuCoinRbtcResult = await axios.get(config.kucoin + '/market/orderbook/level1?symbol=RBTC-BTC')
            records.push({
                source: 'kucoin',
                asset: 'RBTC-BTC',
                price: KuCoinRbtcResult.data.data.price,
                timestamp: toDateAndTime(KuCoinRbtcResult.data.data.time),
                runAt: currentTime
            })
        } catch(err) {
            console.error('KUCOIN RBTC-BTC ERROR', err)
        }

        // KUCOIN RIF-BTC
        try {
            const KuCoinRifResult = await axios.get(config.kucoin + '/market/orderbook/level1?symbol=RIF-BTC')
            records.push({
                source: 'kucoin',
                asset: 'RIF-BTC',
                price: KuCoinRifResult.data.data.price,
                timestamp: toDateAndTime(KuCoinRifResult.data.data.time),
                runAt: currentTime
            })
        } catch(err) {
            console.error('KUCOIN RIF-BTC ERROR', err)
        }

        // KUCOIN BTC
        try {
            const KuCoinBtcResult = await axios.get(config.kucoin + '/market/orderbook/level1?symbol=BTC-USDT')
            records.push({
                source: 'kucoin',
                asset: 'BTC',
                price: KuCoinBtcResult.data.data.price,
                timestamp: toDateAndTime(KuCoinBtcResult.data.data.time),
                runAt: currentTime
            })
        } catch(err) {
            console.error('KUCOIN BTC ERROR', err)
        }

        // BITFINEX BTC
        try {
            const bitfinexBtcResult = await axios.get(config.bitfinex + '/ticker/tBTCUSD')
            records.push({
                source: 'bitfinex',
                asset: 'BTC',
                price: bitfinexBtcResult.data[6],
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BITFINEX BTC ERROR', err)
        }

        // BITFINEX RIF
        try {
            const bitfinexRifResult = await axios.get(config.bitfinex + '/ticker/tRIFUSD')
            records.push({
                source: 'bitfinex',
                asset: 'RIF',
                price: bitfinexRifResult.data[6],
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BITFINEX RIF ERROR', err)
        }

        // BKEX BTC
        try {
            const bkexBtcResult = await axios.get(config.bkex + '/q/ticker/price?pair=BTC_USDT')
            records.push({
                source: 'bkex',
                asset: 'BTC',
                price: bkexBtcResult.data.data.price,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BKEX BTC ERROR', err)
        }

        // BKEX RIF
        try {
            const bkexRifResult = await axios.get(config.bkex + '/q/ticker/price?pair=RIF_USDT')
            records.push({
                source: 'bkex',
                asset: 'RIF',
                price: bkexRifResult.data.data.price,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('BKEX RIF ERROR', err)
        }

        // COINBENE BTC
        try {
            const coinbeneBtcResult = await axios.get(config.coinbene + '/market/ticker/one?symbol=BTC/USDT')
            records.push({
                source: 'coinbene',
                asset: 'BTC',
                price: coinbeneBtcResult.data.data.latestPrice,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('COINBENE BTC ERROR', err)
        }

        // COINBENE RIF
        try {
            const coinbeneRifResult = await axios.get(config.coinbene + '/market/ticker/one?symbol=RIF/BTC')
            records.push({
                source: 'coinbene',
                asset: 'RIF-BTC',
                price: coinbeneRifResult.data.data.latestPrice,
                timestamp: currentTime,
                runAt: currentTime
            })
        } catch(err) {
            console.error('COINBENE RIF ERROR', err)
        }
        console.log('WRITING DATA')
        await csvWriter.writeRecords(records)

    }, 5*60*1000) // END INTERVAL 5 minutes

}

main()

