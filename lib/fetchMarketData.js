import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { parseStringPromise } from 'xml2js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 dakika önbellek

async function fetchMarketData() {
    const cacheKey = "market-data";
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    try {
        const response = await axios.get("https://www.doviz.com/", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                Connection: "keep-alive",
            },
        });

        const $ = cheerio.load(response.data);
        const data = [];

        $("div.market-data div.item").each((_, element) => {
            const socketKey = $(element).find("span.value").attr("data-socket-key");
            const name = $(element).find("span.name").text().trim();
            const price = $(element).find("span.value").text().trim().replace(",", ".");
            const changeRateRaw = $(element).find("div.change-rate").text().trim();
            const changeAmountRaw = $(element).find('span[data-socket-attr="a"]').text().trim().replace(/[()]/g, "");
            const status = $(element).find("div.change-rate").hasClass("up") ? "up" : "down";

            // Debug için ham değerleri logla
            console.log(`SocketKey: ${socketKey}, ChangeRateRaw: ${changeRateRaw}, ChangeAmountRaw: ${changeAmountRaw}`);

            // Değişim oranı ve miktarı parse et
            const changeRate = parseFloat(changeRateRaw.replace(/[^0-9.-]/g, "")) || 0;
            const changeAmount = parseFloat(changeAmountRaw.replace(/[^0-9.-]/g, "")) || 0;

            if (["gram-altin", "USD", "EUR", "GBP", "XU100", "bitcoin", "gumus", "BRENT"].includes(socketKey)) {
                data.push({
                    socketKey,
                    name,
                    price: parseFloat(price.replace(/[^0-9.]/g, "")) || 0,
                    changeRate,
                    changeAmount,
                    status,
                });
            }
        });

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Veri çekme hatası:", error.message);
        return [];
    }
}

export default fetchMarketData;
