import axios from 'axios';
import Parser from 'rss-parser';

const parser = new Parser();

async function fetchNews() {
    try {
        const feed = await parser.parseURL("http://www.hurriyet.com.tr/rss/ekonomi");
        return feed.items.slice(0, 5).map((item) => ({
            title: item.title,
            link: item.link,
        }));
    } catch (error) {
        console.error("Haber çekme hatası:", error);
        return [];
    }
}

export default fetchNews;
