import { NextResponse } from "next/server";
import fetchMarketData from "@/lib/fetchMarketData";

export async function GET() {
    try {
        const data = await fetchMarketData();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
    }
}
