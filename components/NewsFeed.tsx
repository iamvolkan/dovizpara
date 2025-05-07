"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';

interface NewsItem {
    title: string;
    link: string;
    source: string;
    pubDate: string;
    imageUrl: string | null;
}

export default function NewsFeed() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [tab, setTab] = useState("all");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [newNewsNotification, setNewNewsNotification] = useState(false);

    const fetchNews = async (selectedTab: string, selectedPage: number, append = true) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/news?tab=${selectedTab}&page=${selectedPage}`);
            const newNews = await response.json();
            setNews((prev) => {
                if (selectedPage === 1 && !append) return newNews;
                const uniqueNews = newNews.filter((item: any) => !prev.some((existing: any) => existing.link === item.link));
                return append ? [...prev, ...uniqueNews] : [...uniqueNews, ...prev];
            });
            if (newNews.length > 0 && !append) {
                setNewNewsNotification(true);
                setTimeout(() => setNewNewsNotification(false), 3000); // 3 saniye sonra bildirimi kaldır
            }
        } catch (error) {
            console.error("Haber yükleme hatası:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setNews([]);
        setPage(1);
        fetchNews("all", 1, false);

        // Her 5 dakikada bir haberleri yenile
        const interval = setInterval(() => {
            fetchNews(tab, 1, false);
        }, 5 * 60 * 1000); // 5 dakika

        return () => clearInterval(interval); // Temizlik
    }, [tab]);

    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        setNews([]);
        setPage(1);
        fetchNews(newTab, 1, false);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(tab, nextPage);
    };

    const tabs = [
        { id: "all", label: "Başlıca Haberler" },
        { id: "local", label: "Yerel Piyasa" },
        { id: "global", label: "Dünya Piyasaları" },
    ];

    if (loading) {
        return <div className="text-center py-4">Yükleniyor...</div>;
    }

    return (
        <div className="mt-8 mb-5">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Günün Ekonomi Haberleri</h2>
            <div className="flex space-x-6 mb-6 border-b border-gray-800">
                {tabs.map((t) => (
                    <button key={t.id} onClick={() => handleTabChange(t.id)} className={`py-3 text-sm cursor-pointer font-medium transition-colors ${tab === t.id ? "border-b-2 border-green-500 text-green-500" : "text-gray-400 hover:text-gray-200"}`}>
                        {t.label}
                    </button>
                ))}
            </div>
            {newNewsNotification && <div className="mb-4 p-2 bg-green-900 text-green-300 text-sm rounded-md text-center">Yeni haberler yüklendi!</div>}
            <div className="space-y-4">
                {news.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex gap-4">
                            {item.imageUrl && (
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {item.source} • {new Date(item.pubDate).toLocaleDateString('tr-TR')}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            {news.length > 0 && (
                <button onClick={handleLoadMore} disabled={loading} className="mt-6 w-full py-3 text-md font-medium bg-gray-800 cursor-pointer rounded-xl hover:bg-gray-700 transition disabled:opacity-50">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Yükleniyor...
                        </div>
                    ) : (
                        "Devamını Gör"
                    )}
                </button>
            )}
        </div>
    );
}
