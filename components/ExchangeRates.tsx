'use client';

import { useEffect, useState } from 'react';

interface Rate {
    value: string;
    change: string;
    changePercent: string;
}

interface Rates {
    gold: Rate;
    usd: Rate;
    eur: Rate;
    gbp: Rate;
    btc: Rate;
    silver: Rate;
    bist: Rate;
    brent: Rate;
}

export default function ExchangeRates() {
    const [rates, setRates] = useState<Rates | null>(null);

    const getChangeColor = (change: string, percent: string) => {
        if (!change || !percent) return 'text-gray-400';
        // Eğer değişim değeri veya yüzde değeri pozitifse yeşil, değilse kırmızı
        const isPositive = change.startsWith('+') || !change.startsWith('-');
        return isPositive ? 'text-green-400' : 'text-red-400';
    };

    const formatValue = (value: string) => {
        if (!value) return '0.00';
        return value;
    };

    const formatChange = (change: string, percent: string) => {
        if (!change || !percent) return '0.00 (0.00%)';
        return `${change} (${percent})`;
    };

    const fetchRates = async () => {
        try {
            const res = await fetch('/api/exchange-rates');
            if (!res.ok) throw new Error('Failed to fetch rates');
            const data = await res.json();
            setRates(data);
        } catch (error) {
            console.error('Error fetching rates:', error);
        }
    };

    useEffect(() => {
        fetchRates();
        const interval = setInterval(fetchRates, 30000); // Her 30 saniyede bir güncelle
        return () => clearInterval(interval);
    }, []);

    if (!rates) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-3 md:gap-4 p-3 md:p-6 border border-white/10 rounded-2xl mb-4">
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Gram Altın</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.gold.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.gold.change, rates.gold.changePercent)}`}>
                    {formatChange(rates.gold.change, rates.gold.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Dolar</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.usd.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.usd.change, rates.usd.changePercent)}`}>
                    {formatChange(rates.usd.change, rates.usd.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Euro</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.eur.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.eur.change, rates.eur.changePercent)}`}>
                    {formatChange(rates.eur.change, rates.eur.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Sterlin</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.gbp.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.gbp.change, rates.gbp.changePercent)}`}>
                    {formatChange(rates.gbp.change, rates.gbp.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Bitcoin</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.btc.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.btc.change, rates.btc.changePercent)}`}>
                    {formatChange(rates.btc.change, rates.btc.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Gram Gümüş</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.silver.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.silver.change, rates.silver.changePercent)}`}>
                    {formatChange(rates.silver.change, rates.silver.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">BIST 100</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.bist.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.bist.change, rates.bist.changePercent)}`}>
                    {formatChange(rates.bist.change, rates.bist.changePercent)}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-medium text-[10px] text-white/50 uppercase">Brent Petrol</span>
                <span className="text-base md:text-lg font-semibold">{formatValue(rates.brent.value)}</span>
                <span className={`text-[10px] ${getChangeColor(rates.brent.change, rates.brent.changePercent)}`}>
                    {formatChange(rates.brent.change, rates.brent.changePercent)}
                </span>
            </div>
        </div>
    );
} 