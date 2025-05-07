import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DövizPara - Günlük Döviz Kurları, Altın Fiyatları, Ekonomi Haberleri ve Para Birimi Çevirici",
    description: "Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı. Anlık döviz kurları, altın fiyatları, ekonomi takibi ve para birimi hesaplama.",
    keywords: "döviz kurları, altın fiyatları, ekonomi haberleri, döviz çevirici, döviz hesaplama, altın çevirici, altın hesaplama, kripto para çevirici, bitcoin çevirici, dolar kuru, euro kuru, sterlin kuru, bitcoin fiyatı, finans haberleri, para birimi çevirici, kur hesaplama, döviz hesaplama aracı, altın hesaplama aracı, kripto hesaplama aracı, güncel kurlar, anlık döviz kurları, canlı altın fiyatları",
    authors: [{ name: "DövizPara" }],
    creator: "DövizPara",
    publisher: "DövizPara",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://dovizpara.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "DövizPara - Günlük Döviz Kurları, Altın Fiyatları ve Ekonomi Haberleri",
        description: "Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı.",
        url: 'https://dovizpara.vercel.app',
        siteName: 'DövizPara',
        locale: 'tr_TR',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'DövizPara - Günlük Döviz Kurları, Altın Fiyatları ve Ekonomi Haberleri',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "DövizPara - Günlük Döviz Kurları, Altın Fiyatları ve Ekonomi Haberleri",
        description: "Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı.",
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'google-site-verification-code', // Google Search Console'dan alınacak
    },
    other: {
        'application-name': 'DövizPara',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'DövizPara',
        'format-detection': 'telephone=no',
        'mobile-web-app-capable': 'yes',
        'msapplication-TileColor': '#0f172a',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#0f172a',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#0f172a" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="DövizPara" />
                <meta name="application-name" content="DövizPara" />
                <meta name="msapplication-TileColor" content="#0f172a" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="description" content="Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı." />
                <meta name="keywords" content="döviz kurları, altın fiyatları, ekonomi haberleri, döviz çevirici, döviz hesaplama, altın çevirici, altın hesaplama, kripto para çevirici, bitcoin çevirici, dolar kuru, euro kuru, sterlin kuru, bitcoin fiyatı, finans haberleri" />
                <meta property="og:title" content="DövizPara - Günlük Döviz Kurları, Altın Fiyatları ve Ekonomi Haberleri" />
                <meta property="og:description" content="Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dovizpara.vercel.app" />
                <meta property="og:image" content="/og-image.png" />
                <meta property="og:site_name" content="DövizPara" />
                <meta property="og:locale" content="tr_TR" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="DövizPara - Günlük Döviz Kurları, Altın Fiyatları ve Ekonomi Haberleri" />
                <meta name="twitter:description" content="Güncel döviz kurları, altın fiyatları, Bitcoin değeri ve ekonomi haberleri. Ücretsiz döviz çevirici, altın çevirici ve kripto para çevirici. TL, USD, EUR, GBP, altın, gümüş ve Bitcoin çevirme aracı." />
                <meta name="twitter:image" content="/og-image.png" />
            </head>
            <body>{children}</body>
        </html>
    );
}
