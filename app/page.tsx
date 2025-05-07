import Logo from "../components/Logo";
import NewsFeed from "../components/NewsFeed";
import ExchangeRates from "../components/ExchangeRates";
import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
    return (
        <div className="bg-slate-900 min-h-screen flex items-start justify-center">
            <div className="w-3xl mx-auto p-4">
                <Logo />
                <ExchangeRates />
                <CurrencyConverter />
                <NewsFeed />
            </div>
        </div>
    );
}
