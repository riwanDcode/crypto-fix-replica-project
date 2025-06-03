
import { useState } from "react";
import { Search } from "lucide-react";

const cryptoTableData = [
  {
    name: "Bitcoin (BTC)",
    icon: "₿",
    price: "$105,274",
    change: "1.03%",
    marketCap: "$2,092,127,444,733",
    isPositive: true,
    color: "text-orange-400"
  },
  {
    name: "Ethereum (ETH)",
    icon: "Ξ",
    price: "$2,609.53",
    change: "5.08%",
    marketCap: "$315,048,123,778",
    isPositive: true,
    color: "text-gray-300"
  },
  {
    name: "Tether (USDT)",
    icon: "₮",
    price: "$1",
    change: "0.01%",
    marketCap: "$153,380,226,691",
    isPositive: true,
    color: "text-green-400"
  },
  {
    name: "Dai (DAI)",
    icon: "◈",
    price: "$1.00",
    change: "-0.02%",
    marketCap: "$5,439,322,206",
    isPositive: false,
    color: "text-yellow-400"
  },
  {
    name: "Bittensor (TAO)",
    icon: "T",
    price: "$392.6",
    change: "-4.29%",
    marketCap: "$3,438,322,206",
    isPositive: false,
    color: "text-gray-400"
  },
  {
    name: "BNB (BNB)",
    icon: "♦",
    price: "$692.45",
    change: "2.34%",
    marketCap: "$107,459,809,423",
    isPositive: true,
    color: "text-yellow-400"
  },
  {
    name: "XRP (XRP)",
    icon: "✗",
    price: "$2.08",
    change: "-1.25%",
    marketCap: "$112,239,567,112",
    isPositive: false,
    color: "text-blue-400"
  },
  {
    name: "Cardano (ADA)",
    icon: "⋈",
    price: "$0.78",
    change: "3.15%",
    marketCap: "$27,534,876,201",
    isPositive: true,
    color: "text-blue-600"
  },
  {
    name: "Dogecoin (DOGE)",
    icon: "Ð",
    price: "$0.35",
    change: "-2.67%",
    marketCap: "$46,782,193,452",
    isPositive: false,
    color: "text-yellow-300"
  },
  {
    name: "Solana (SOL)",
    icon: "◎",
    price: "$160.96",
    change: "4.57%",
    marketCap: "$68,993,417,220",
    isPositive: true,
    color: "text-purple-400"
  },
  {
    name: "Polkadot (DOT)",
    icon: "●",
    price: "$12.87",
    change: "-1.16%",
    marketCap: "$16,734,589,932",
    isPositive: false,
    color: "text-pink-400"
  },
  {
    name: "Avalanche (AVAX)",
    icon: "△",
    price: "$35.76",
    change: "2.98%",
    marketCap: "$12,561,832,458",
    isPositive: true,
    color: "text-red-400"
  },
  {
    name: "Chainlink (LINK)",
    icon: "⌘",
    price: "$15.23",
    change: "1.75%",
    marketCap: "$8,792,156,309",
    isPositive: true,
    color: "text-blue-500"
  },
  {
    name: "Uniswap (UNI)",
    icon: "🦄",
    price: "$8.79",
    change: "-2.31%",
    marketCap: "$6,231,984,567",
    isPositive: false,
    color: "text-pink-500"
  },
  {
    name: "Algorand (ALGO)",
    icon: "Ⓐ",
    price: "$0.34",
    change: "0.95%",
    marketCap: "$2,634,781,290",
    isPositive: true,
    color: "text-green-300"
  },
  {
    name: "Cosmos (ATOM)",
    icon: "⊗",
    price: "$10.65",
    change: "-0.87%",
    marketCap: "$4,123,456,789",
    isPositive: false,
    color: "text-purple-300"
  },
  {
    name: "Monero (XMR)",
    icon: "ɱ",
    price: "$182.67",
    change: "3.42%",
    marketCap: "$3,345,678,912",
    isPositive: true,
    color: "text-orange-300"
  },
  {
    name: "Stellar (XLM)",
    icon: "✧",
    price: "$0.15",
    change: "1.25%",
    marketCap: "$4,381,259,304",
    isPositive: true,
    color: "text-blue-200"
  },
  {
    name: "VeChain (VET)",
    icon: "V",
    price: "$0.032",
    change: "-1.85%",
    marketCap: "$2,314,568,790",
    isPositive: false,
    color: "text-blue-300"
  },
  {
    name: "Filecoin (FIL)",
    icon: "⊚",
    price: "$8.16",
    change: "2.74%",
    marketCap: "$3,578,912,456",
    isPositive: true,
    color: "text-green-500"
  },
  {
    name: "TRON (TRX)",
    icon: "◈",
    price: "$0.12",
    change: "1.85%",
    marketCap: "$10,789,456,123",
    isPositive: true,
    color: "text-red-500"
  },
  {
    name: "NEAR Protocol (NEAR)",
    icon: "◉",
    price: "$4.87",
    change: "-0.95%",
    marketCap: "$5,234,876,901",
    isPositive: false,
    color: "text-green-400"
  },
  {
    name: "Internet Computer (ICP)",
    icon: "∞",
    price: "$18.45",
    change: "2.31%",
    marketCap: "$8,567,234,189",
    isPositive: true,
    color: "text-orange-400"
  },
  {
    name: "Hedera (HBAR)",
    icon: "ℏ",
    price: "$0.058",
    change: "1.76%",
    marketCap: "$2,045,123,567",
    isPositive: true,
    color: "text-purple-400"
  },
  {
    name: "Aptos (APT)",
    icon: "⟐",
    price: "$9.87",
    change: "-1.23%",
    marketCap: "$4,876,234,890",
    isPositive: false,
    color: "text-blue-400"
  },
  {
    name: "Arbitrum (ARB)",
    icon: "◆",
    price: "$1.23",
    change: "3.45%",
    marketCap: "$4,123,567,890",
    isPositive: true,
    color: "text-blue-500"
  },
  {
    name: "Optimism (OP)",
    icon: "○",
    price: "$2.67",
    change: "-0.87%",
    marketCap: "$2,789,456,123",
    isPositive: false,
    color: "text-red-400"
  },
  {
    name: "Polygon (MATIC)",
    icon: "⬟",
    price: "$0.89",
    change: "2.15%",
    marketCap: "$8,234,567,901",
    isPositive: true,
    color: "text-purple-500"
  },
  {
    name: "Litecoin (LTC)",
    icon: "Ł",
    price: "$89.45",
    change: "1.67%",
    marketCap: "$6,567,890,123",
    isPositive: true,
    color: "text-gray-400"
  },
  {
    name: "Shiba Inu (SHIB)",
    icon: "🐕",
    price: "$0.000015",
    change: "-3.21%",
    marketCap: "$8,890,123,456",
    isPositive: false,
    color: "text-orange-300"
  }
];

const ITEMS_PER_PAGE = 10;

const CryptoPricesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = cryptoTableData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1);
  
  const visibleData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold mb-6">Cryptocurrency Prices by Market Cap</h2>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search For a Crypto Currency"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-700 font-semibold">
          <div>Coin</div>
          <div>Price</div>
          <div>24h Change</div>
          <div>Market Cap</div>
        </div>
        
        <div className="divide-y divide-slate-700">
          {visibleData.map((crypto, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                <span className="font-medium">{crypto.name}</span>
              </div>
              <div className="font-semibold">{crypto.price}</div>
              <div className={`font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change}
              </div>
              <div className="text-gray-300">{crypto.marketCap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page - 1)}
              className={`w-10 h-10 rounded ${
                currentPage === page - 1
                  ? 'bg-orange-400 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              } transition-colors`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoPricesTable;
