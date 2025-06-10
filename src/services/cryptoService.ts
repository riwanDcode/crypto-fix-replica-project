
// CoinGecko API service for fetching real-time cryptocurrency data
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

// Mapping of crypto IDs to their display properties
const cryptoMapping = {
  'bitcoin': { icon: '₿', color: 'text-orange-400' },
  'ethereum': { icon: 'Ξ', color: 'text-gray-300' },
  'tether': { icon: '₮', color: 'text-green-400' },
  'solana': { icon: '◎', color: 'text-purple-400' },
  'binancecoin': { icon: '♦', color: 'text-yellow-400' },
  'ripple': { icon: '✗', color: 'text-blue-400' },
  'cardano': { icon: '⋈', color: 'text-blue-600' },
  'dogecoin': { icon: 'Ð', color: 'text-yellow-300' },
  'polkadot': { icon: '●', color: 'text-pink-400' },
  'avalanche-2': { icon: '△', color: 'text-red-400' },
  'chainlink': { icon: '⌘', color: 'text-blue-500' },
  'uniswap': { icon: '🦄', color: 'text-pink-500' },
  'algorand': { icon: 'Ⓐ', color: 'text-green-300' },
  'cosmos': { icon: '⊗', color: 'text-purple-300' },
  'monero': { icon: 'ɱ', color: 'text-orange-300' },
  'stellar': { icon: '✧', color: 'text-blue-200' },
  'vechain': { icon: 'V', color: 'text-blue-300' },
  'filecoin': { icon: '⊚', color: 'text-green-500' },
  'tron': { icon: '◈', color: 'text-red-500' },
  'near': { icon: '◉', color: 'text-green-400' },
  'internet-computer': { icon: '∞', color: 'text-orange-400' },
  'hedera-hashgraph': { icon: 'ℏ', color: 'text-purple-400' },
  'aptos': { icon: '⟐', color: 'text-blue-400' },
  'arbitrum': { icon: '◆', color: 'text-blue-500' },
  'optimism': { icon: '○', color: 'text-red-400' },
  'polygon': { icon: '⬟', color: 'text-purple-500' },
  'litecoin': { icon: 'Ł', color: 'text-gray-400' },
  'shiba-inu': { icon: '🐕', color: 'text-orange-300' },
  'dai': { icon: '◈', color: 'text-yellow-400' },
  'bittensor': { icon: 'T', color: 'text-gray-400' }
};

const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
};

const formatMarketCap = (marketCap: number): string => {
  return `$${marketCap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const fetchCryptoPrices = async (): Promise<CryptoData[]> => {
  try {
    const cryptoIds = Object.keys(cryptoMapping).join(',');
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${cryptoIds}&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((coin: any) => {
      const mapping = cryptoMapping[coin.id as keyof typeof cryptoMapping];
      return {
        id: coin.id,
        name: `${coin.name} (${coin.symbol.toUpperCase()})`,
        symbol: coin.symbol.toUpperCase(),
        price: formatPrice(coin.current_price),
        change: `${coin.price_change_percentage_24h?.toFixed(2) || 0}%`,
        marketCap: formatMarketCap(coin.market_cap || 0),
        isPositive: (coin.price_change_percentage_24h || 0) >= 0,
        icon: mapping?.icon || '◯',
        color: mapping?.color || 'text-gray-400'
      };
    });
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};
