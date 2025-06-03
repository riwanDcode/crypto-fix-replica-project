
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$105,274",
    change: "1.03%",
    isPositive: true,
    icon: "₿",
    color: "text-orange-400"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,609.53",
    change: "5.08%",
    isPositive: true,
    icon: "Ξ",
    color: "text-gray-300"
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: "$1",
    change: "0.01%",
    isPositive: true,
    icon: "₮",
    color: "text-green-400"
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$160.96",
    change: "4.57%",
    isPositive: true,
    icon: "◎",
    color: "text-purple-400"
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: "$692.45",
    change: "2.34%",
    isPositive: true,
    icon: "♦",
    color: "text-yellow-400"
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: "$2.08",
    change: "-1.25%",
    isPositive: false,
    icon: "✗",
    color: "text-blue-400"
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "$0.78",
    change: "3.15%",
    isPositive: true,
    icon: "⋈",
    color: "text-blue-600"
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.35",
    change: "-2.67%",
    isPositive: false,
    icon: "Ð",
    color: "text-yellow-300"
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: "$12.87",
    change: "-1.16%",
    isPositive: false,
    icon: "●",
    color: "text-pink-400"
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: "$35.76",
    change: "2.98%",
    isPositive: true,
    icon: "△",
    color: "text-red-400"
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price: "$15.23",
    change: "1.75%",
    isPositive: true,
    icon: "⌘",
    color: "text-blue-500"
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    price: "$8.79",
    change: "-2.31%",
    isPositive: false,
    icon: "🦄",
    color: "text-pink-500"
  },
  {
    name: "Algorand",
    symbol: "ALGO",
    price: "$0.34",
    change: "0.95%",
    isPositive: true,
    icon: "Ⓐ",
    color: "text-green-300"
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    price: "$10.65",
    change: "-0.87%",
    isPositive: false,
    icon: "⊗",
    color: "text-purple-300"
  },
  {
    name: "Monero",
    symbol: "XMR",
    price: "$182.67",
    change: "3.42%",
    isPositive: true,
    icon: "ɱ",
    color: "text-orange-300"
  },
  {
    name: "Stellar",
    symbol: "XLM",
    price: "$0.15",
    change: "1.25%",
    isPositive: true,
    icon: "✧",
    color: "text-blue-200"
  },
  {
    name: "VeChain",
    symbol: "VET",
    price: "$0.032",
    change: "-1.85%",
    isPositive: false,
    icon: "V",
    color: "text-blue-300"
  },
  {
    name: "Filecoin",
    symbol: "FIL",
    price: "$8.16",
    change: "2.74%",
    isPositive: true,
    icon: "⊚",
    color: "text-green-500"
  },
  {
    name: "TRON",
    symbol: "TRX",
    price: "$0.12",
    change: "1.85%",
    isPositive: true,
    icon: "◈",
    color: "text-red-500"
  },
  {
    name: "NEAR Protocol",
    symbol: "NEAR",
    price: "$4.87",
    change: "-0.95%",
    isPositive: false,
    icon: "◉",
    color: "text-green-400"
  }
];

const ITEMS_PER_PAGE = 4;

const CryptoHero = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cryptoData.length / ITEMS_PER_PAGE);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [totalPages]);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleCrypto = cryptoData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold text-center mb-8">The Platform Offers</h2>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-6 overflow-hidden">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
            {visibleCrypto.map((crypto, index) => (
              <div
                key={`${crypto.symbol}-${index}`}
                className="bg-slate-800 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-slate-700"
              >
                <div className={`text-4xl mb-2 ${crypto.color}`}>
                  {crypto.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{crypto.name}</h3>
                <p className={`text-sm mb-2 ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change}
                </p>
                <p className="text-xl font-bold">{crypto.price}</p>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentPage === index ? 'bg-orange-400' : 'bg-slate-600'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoHero;
