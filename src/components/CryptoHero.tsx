
import { useState } from "react";
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
  }
];

const ITEMS_PER_PAGE = 4;

const CryptoHero = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cryptoData.length / ITEMS_PER_PAGE);
  
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
