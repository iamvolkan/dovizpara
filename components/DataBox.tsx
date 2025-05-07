export default function DataBox({ data }: { data: any }) {
    if (!data) return <div className="text-center">Veriler yüklenemedi.</div>;

    const items = [
        { name: "Gram Altın", value: data.gold, change: data.changes?.gold?.percent || "+0,20", diff: data.changes?.gold?.diff || "+6,1234" },
        { name: "Dolar", value: data.usd, change: data.changes?.usd?.percent || "-0,10", diff: data.changes?.usd?.diff || "-0,0385" },
        { name: "Euro", value: data.eur, change: data.changes?.eur?.percent || "+0,05", diff: data.changes?.eur?.diff || "+0,0210" },
        { name: "Sterlin", value: data.gbp, change: data.changes?.gbp?.percent || "-0,15", diff: data.changes?.gbp?.diff || "-0,0450" },
        { name: "Bitcoin", value: data.btc, change: data.changes?.btc?.percent || "+1,20", diff: data.changes?.btc?.diff || "+750" },
        { name: "Gram Gümüş", value: data.silver, change: data.changes?.silver?.percent || "-0,05", diff: data.changes?.silver?.diff || "-0,0178" },
        { name: "BIST 100", value: data.bist100, change: data.changes?.bist100?.percent || "+0,30", diff: data.changes?.bist100?.diff || "+28,45" },
        { name: "Brent Petrol", value: data.brent, change: data.changes?.brent?.percent || "-0,10", diff: data.changes?.brent?.diff || "-0,0800" },
    ];

    return (
        <div className="grid grid-cols-4 justify-center gap-4 p-6  border border-white/10 rounded-2xl">
            {items.map((item) => (
                <div key={item.name} className="flex flex-col items-center">
                    <span className="font-medium text-[10px] text-white/50 uppercase">{item.name}</span>
                    <span className="text-lg font-semibold">{item.value}</span>
                    <span className="text-[10px] text-green-400">
                        {item.change} ({item.diff})
                    </span>
                </div>
            ))}
        </div>
    );
}
