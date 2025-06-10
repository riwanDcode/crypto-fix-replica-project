
interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

interface CMCQuote {
  price: number;
  percent_change_24h: number;
  market_cap: number;
}

interface CMCData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: CMCQuote;
  };
}

const cryptoIcons: Record<string, { icon: string; color: string }> = {
  BTC: { icon: "₿", color: "text-orange-400" },
  ETH: { icon: "Ξ", color: "text-gray-300" },
  USDT: { icon: "₮", color: "text-green-400" },
  BNB: { icon: "♦", color: "text-yellow-400" },
  XRP: { icon: "✗", color: "text-blue-400" },
  SOL: { icon: "◎", color: "text-purple-400" },
  ADA: { icon: "⋈", color: "text-blue-600" },
  DOGE: { icon: "Ð", color: "text-yellow-300" },
  DOT: { icon: "●", color: "text-pink-400" },
  AVAX: { icon: "△", color: "text-red-400" },
  LINK: { icon: "⌘", color: "text-blue-500" },
  UNI: { icon: "🦄", color: "text-pink-500" },
  ALGO: { icon: "Ⓐ", color: "text-green-300" },
  ATOM: { icon: "⊗", color: "text-purple-300" },
  XMR: { icon: "ɱ", color: "text-orange-300" },
  XLM: { icon: "✧", color: "text-blue-200" },
  VET: { icon: "V", color: "text-blue-300" },
  FIL: { icon: "⊚", color: "text-green-500" },
  TRX: { icon: "◈", color: "text-red-500" },
  NEAR: { icon: "◉", color: "text-green-400" },
  ICP: { icon: "∞", color: "text-orange-400" },
  HBAR: { icon: "ℏ", color: "text-purple-400" },
  APT: { icon: "⟐", color: "text-blue-400" },
  ARB: { icon: "◆", color: "text-blue-500" },
  OP: { icon: "○", color: "text-red-400" },
  MATIC: { icon: "⬟", color: "text-purple-500" },
  LTC: { icon: "Ł", color: "text-gray-400" },
  SHIB: { icon: "🐕", color: "text-orange-300" },
  DAI: { icon: "◈", color: "text-yellow-400" },
  TAO: { icon: "T", color: "text-gray-400" }
};

const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

export const fetchCryptocurrencyPrices = async (apiKey: string): Promise<CryptoData[]> => {
  const symbols = Object.keys(cryptoIcons).join(',');
  
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status?.error_code !== 0) {
      throw new Error(data.status?.error_message || 'API error');
    }

    const cryptoData: CryptoData[] = Object.values(data.data as Record<string, CMCData>)
      .map((crypto: CMCData) => {
        const iconData = cryptoIcons[crypto.symbol] || { icon: "◯", color: "text-gray-400" };
        const quote = crypto.quote.USD;
        const isPositive = quote.percent_change_24h >= 0;
        
        return {
          name: `${crypto.name} (${crypto.symbol})`,
          symbol: crypto.symbol,
          price: formatPrice(quote.price),
          change: `${isPositive ? '+' : ''}${quote.percent_change_24h.toFixed(2)}%`,
          marketCap: formatMarketCap(quote.market_cap),
          isPositive,
          icon: iconData.icon,
          color: iconData.color,
        };
      })
      .sort((a, b) => {
        // Sort by market cap descending (extract number from formatted string)
        const aMarketCap = parseFloat(a.marketCap.replace(/[$,BTM]/g, ''));
        const bMarketCap = parseFloat(b.marketCap.replace(/[$,BTM]/g, ''));
        return bMarketCap - aMarketCap;
      });

    return cryptoData;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    throw error;
  }
};
