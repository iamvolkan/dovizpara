const axios = require("axios");
const xml2js = require("xml2js");

async function fetchTCMBData() {
    try {
        // TCMB XML verilerini çek
        const response = await axios.get("https://www.tcmb.gov.tr/kurlar/today.xml");
        const parsed = await xml2js.parseStringPromise(response.data);

        const currencies = parsed.Tarih_Date.Currency;
        const data = {
            usd: currencies.find((c) => c.$.CurrencyCode === "USD")?.ForexBuying?.[0] || "38.4483",
            eur: currencies.find((c) => c.$.CurrencyCode === "EUR")?.ForexBuying?.[0] || "41.1234",
            gbp: currencies.find((c) => c.$.CurrencyCode === "GBP")?.ForexBuying?.[0] || "48.5678",
            // Gram altın, gümüş, Brent, BIST 100 için geçici statik veri
            gold: "3000,1234",
            silver: "35,5678",
            bist100: "9500,45",
            brent: "80,1234",
        };

        // Bitcoin için CoinGecko
        const btcResponse = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        data.btc = btcResponse.data.bitcoin.usd.toString();

        // Değişim oranları (şimdilik statik, TCMB'den alınacak)
        data.changes = {
            usd: { percent: "-0,10", diff: "-0,0385" },
            eur: { percent: "+0,05", diff: "+0,0210" },
            gbp: { percent: "-0,15", diff: "-0,0450" },
            gold: { percent: "+0,20", diff: "+6,1234" },
            silver: { percent: "-0,05", diff: "-0,0178" },
            bist100: { percent: "+0,30", diff: "+28,45" },
            brent: { percent: "-0,10", diff: "-0,0800" },
            btc: { percent: "+1,20", diff: "+750" },
        };

        return data;
    } catch (error) {
        console.error("TCMB veri çekme hatası:", error);
        return null;
    }
}

module.exports = fetchTCMBData;
