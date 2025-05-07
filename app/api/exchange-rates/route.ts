import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await axios.get('https://www.doviz.com/');
    const $ = cheerio.load(response.data);
    
    const rates = {
      gold: {
        value: $('.market-data .item a[data-ga-event-param1-value="gram-altin"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="gram-altin"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="gram-altin"] .change-rate').text().trim(),
      },
      usd: {
        value: $('.market-data .item a[data-ga-event-param1-value="USD"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="USD"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="USD"] .change-rate').text().trim(),
      },
      eur: {
        value: $('.market-data .item a[data-ga-event-param1-value="EUR"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="EUR"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="EUR"] .change-rate').text().trim(),
      },
      gbp: {
        value: $('.market-data .item a[data-ga-event-param1-value="GBP"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="GBP"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="GBP"] .change-rate').text().trim(),
      },
      btc: {
        value: $('.market-data .item a[data-ga-event-param1-value="bitcoin"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="bitcoin"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="bitcoin"] .change-rate').text().trim(),
      },
      silver: {
        value: $('.market-data .item a[data-ga-event-param1-value="gumus"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="gumus"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="gumus"] .change-rate').text().trim(),
      },
      bist: {
        value: $('.market-data .item a[data-ga-event-param1-value="XU100"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="XU100"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="XU100"] .change-rate').text().trim(),
      },
      brent: {
        value: $('.market-data .item a[data-ga-event-param1-value="BRENT"] .value').text().trim(),
        change: $('.market-data .item a[data-ga-event-param1-value="BRENT"] .change-amount span').text().trim(),
        changePercent: $('.market-data .item a[data-ga-event-param1-value="BRENT"] .change-rate').text().trim(),
      }
    };

    // Debug için HTML içeriğini kontrol edelim
    console.log('Parsed Rates:', rates);

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    );
  }
} 