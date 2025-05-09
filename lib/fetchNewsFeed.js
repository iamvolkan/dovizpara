import axios from 'axios';
import Parser from 'rss-parser';
import NodeCache from 'node-cache';

const parser = new Parser();
const cache = new NodeCache({ stdTTL: 300 }); // 5 dakika önbellek

const feeds = {
    all: [
        "https://www.ntv.com.tr/ekonomi.rss",
        "https://www.cumhuriyet.com.tr/rss/5.xml",
        "http://www.hurriyet.com.tr/rss/ekonomi",
        "http://www.milliyet.com.tr/rss/rssNew/ekonomiRss.xml",
        "https://www.sabah.com.tr/rss/ekonomi.xml",
        "https://www.takvim.com.tr/rss/ekonomi.xml",
        "https://www.yenisafak.com/rss?xml=ekonomi",
        "https://www.cnnturk.com/feed/rss/ekonomi/news",
        "https://www.finanskolik.com/rss",
        "https://onedio.com/Publisher/publisher-ekonomi.rss",
        "https://onedio.com/Publisher/publisher-finans.rss",
        "https://www.finanshaberler.com.tr/rss/categorynews/ekonomi",
        "https://www.finanshaberler.com.tr/rss/categorynews/gundem",
        "https://www.finanshaberler.com.tr/rss/categorynews/dunya",
        "https://www.finanshaberler.com.tr/rss/post/genel-ekonomi",
        "https://www.finanshaberler.com.tr/rss/categorynews/forex",
        "https://www.ensonhaber.com/rss/ekonomi.xml",
        "https://www.sozcu.com.tr/feeds-rss-category-ekonomi",
        "https://www.sozcu.com.tr/feeds-rss-category-finans",
    ],
    local: [
        "https://www.ntv.com.tr/ekonomi.rss",
        "https://www.cumhuriyet.com.tr/rss/5.xml",
        "http://www.hurriyet.com.tr/rss/ekonomi",
        "http://www.milliyet.com.tr/rss/rssNew/ekonomiRss.xml",
        "https://www.sabah.com.tr/rss/ekonomi.xml",
        "https://www.takvim.com.tr/rss/ekonomi.xml",
        "https://www.yenisafak.com/rss?xml=ekonomi",
        "https://www.cnnturk.com/feed/rss/ekonomi/news",
        "https://www.finanskolik.com/rss",
        "https://onedio.com/Publisher/publisher-ekonomi.rss",
        "https://onedio.com/Publisher/publisher-finans.rss",
        "https://www.finanshaberler.com.tr/rss/categorynews/ekonomi",
        "https://www.finanshaberler.com.tr/rss/post/genel-ekonomi",
        "https://www.ensonhaber.com/rss/ekonomi.xml",
        "https://www.sozcu.com.tr/feeds-rss-category-ekonomi",
    ],
    global: ["https://www.finanshaberler.com.tr/rss/categorynews/dunya", "https://www.finanshaberler.com.tr/rss/categorynews/forex", "https://www.sozcu.com.tr/feeds-rss-category-finans", "https://www.finanshaberler.com.tr/rss/categorynews/gundem"],
};

// Zaman aşımı ile RSS feed çekme
const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!response.ok) throw new Error(`Status code ${response.status}`);
        return await response.text();
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

function formatTimeAgo(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 1) {
        return "Az önce";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} dakika önce`;
    } else if (diffInHours < 12) {
        return `${diffInHours} saat önce`;
    } else {
        const dateStr = date.toLocaleString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        const timeStr = date.toLocaleString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${dateStr}\n${timeStr}`;
    }
}

async function fetchNewsFeed(tab = "all", page = 1) {
    const cacheKey = `${tab}-${page}`;
    const cachedNews = cache.get(cacheKey);
    if (cachedNews) return cachedNews;

    try {
        const feedUrls = feeds[tab] || feeds.all;
        const itemsPerPage = 10;
        const news = [];

        // Paralel feed çekme
        const feedPromises = feedUrls.map(async (url) => {
            try {
                const xml = await fetchWithTimeout(url);
                const feed = await parser.parseString(xml);
                if (feed.items && feed.items.length > 0) {
                    return feed.items.map((item) => {
                        let imageUrl = null;
                        
                        if (item.enclosure?.url) {
                            imageUrl = item.enclosure.url;
                        } else if (item["media:content"]?.$?.url) {
                            imageUrl = item["media:content"].$.url;
                        } else if (item["media:thumbnail"]?.$?.url) {
                            imageUrl = item["media:thumbnail"].$.url;
                        } else if (item.content) {
                            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) {
                                imageUrl = imgMatch[1];
                            }
                        } else if (item.description) {
                            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) {
                                imageUrl = imgMatch[1];
                            }
                        }

                        if (imageUrl && !imageUrl.startsWith('http')) {
                            const feedUrl = new URL(url);
                            imageUrl = new URL(imageUrl, feedUrl.origin).toString();
                        }

                        return {
                            title: item.title || "Başlık yok",
                            link: item.link || "#",
                            source: feed.title || url.split("/")[2]?.replace("www.", "") || "Bilinmeyen Kaynak",
                            time: item.pubDate ? formatTimeAgo(new Date(item.pubDate)) : "Bilinmiyor",
                            imageUrl,
                        };
                    });
                }
                return [];
            } catch (error) {
                console.error(`RSS feed hatası (${url}):`, error.message);
                return [];
            }
        });

        const results = await Promise.all(feedPromises);
        results.forEach((items) => news.push(...items));

        const uniqueNews = Array.from(new Map(news.map((item) => [item.link, item])).values());
        uniqueNews.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedNews = uniqueNews.slice(start, end);

        cache.set(cacheKey, paginatedNews);
        return paginatedNews;
    } catch (error) {
        console.error("Haber çekme genel hatası:", error);
        return [];
    }
}

export default fetchNewsFeed;
