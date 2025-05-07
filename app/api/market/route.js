import { NextResponse } from "next/server";
import fetchMarketData from "../../../lib/fetchMarketData";

export async function GET() {
    try {
        const data = await fetchMarketData();
        return NextResponse.json({ data, source: "doviz.com" });
    } catch (error) {
        return NextResponse.json({ error: "Veri çekilemedi" }, { status: 500 });
    }
}
