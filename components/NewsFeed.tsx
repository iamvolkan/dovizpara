"use client";

import { useState, useEffect } from "react";

export default function NewsFeed() {
    const [news, setNews] = useState([]);
    const [tab, setTab] = useState("all");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
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
            {loading && news.length === 0 ? (
                <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : news.length === 0 ? (
                <p className="text-center text-gray-400">Şu anda haber bulunamadı, lütfen daha sonra tekrar deneyin.</p>
            ) : (
                <div>
                    {news.map((item: any, index: number) => (
                        <div key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-800 transition">
                                <img src={item.image || "/placeholder.png"} alt={item.title} className="w-14 h-14 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between pb-1.5">
                                        <p className="text-xs text-gray-400 font-medium">{item.source}</p>
                                        <p className="text-xs text-gray-500 whitespace-pre-line text-right">{item.time}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-200 leading-tight">{item.title}</p>
                                </div>
                            </a>
                            {index < news.length - 1 && <hr className="border-gray-800 my-1.5" />}
                        </div>
                    ))}
                </div>
            )}
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
