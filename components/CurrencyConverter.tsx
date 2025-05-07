'use client';

import { useState, useEffect } from 'react';

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

export default function CurrencyConverter() {
    const [activeTab, setActiveTab] = useState('currency');
    const [rates, setRates] = useState<Rates | null>(null);
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');

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
        const interval = setInterval(fetchRates, 30000);
        return () => clearInterval(interval);
    }, []);

    const getRate = (currency: string) => {
        if (!rates) return 0;
        switch (currency) {
            case 'USD': return parseFloat(rates.usd.value.replace(',', '.'));
            case 'EUR': return parseFloat(rates.eur.value.replace(',', '.'));
            case 'GBP': return parseFloat(rates.gbp.value.replace(',', '.'));
            case 'GOLD': return parseFloat(rates.gold.value.replace(',', '.'));
            case 'SILVER': return parseFloat(rates.silver.value.replace(',', '.'));
            case 'BTC': return parseFloat(rates.btc.value.replace(',', '.'));
            default: return 1;
        }
    };

    const calculateResult = () => {
        if (!rates) return '0.00';
        const fromRate = getRate(fromCurrency);
        const toRate = getRate(toCurrency);
        const result = (parseFloat(amount) * fromRate) / toRate;
        return result.toFixed(4);
    };

    const tabs = [
        { id: 'currency', label: 'Döviz Çevirici' },
        { id: 'gold', label: 'Altın Çevirici' },
        { id: 'crypto', label: 'Kripto Çevirici' }
    ];

    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'TRY', label: 'TRY' }
    ];

    const goldOptions = [
        { value: 'GOLD', label: 'Altın' },
        { value: 'SILVER', label: 'Gümüş' },
        { value: 'TRY', label: 'TRY' }
    ];

    const cryptoOptions = [
        { value: 'BTC', label: 'BTC' },
        { value: 'TRY', label: 'TRY' }
    ];

    const getOptions = () => {
        switch (activeTab) {
            case 'currency': return currencyOptions;
            case 'gold': return goldOptions;
            case 'crypto': return cryptoOptions;
            default: return currencyOptions;
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="mb-4 max-w-3xl mx-auto">
            <div className="flex space-x-6 mb-4 border-b border-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'border-b-2 border-green-500 text-green-500'
                                : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="flex md:flex-row flex-col gap-y-1 items-center space-x-2">
                    <div className="flex-1 md:w-auto w-full">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-2 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="md:w-32 w-full">
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            {getOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleSwap}
                        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                        title="Para birimlerini değiştir"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                    <div className="md:w-32 w-full">
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            {getOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 md:w-auto w-full bg-gray-900/50 rounded-lg border border-gray-700 px-2 py-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{toCurrency}</span>
                            <span className="text-sm font-medium text-white">{calculateResult()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 