import { NextResponse } from "next/server";
import fetchNewsFeed from "../../../lib/fetchNewsFeed";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab") || "para";
    const page = parseInt(searchParams.get("page")) || 1;

    const news = await fetchNewsFeed(tab, page);
    return NextResponse.json(news);
}
