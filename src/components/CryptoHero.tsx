
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
  }
];

const CryptoHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cryptoData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cryptoData.length) % cryptoData.length);
  };

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
            {cryptoData.map((crypto, index) => (
              <div
                key={crypto.symbol}
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
      </div>
    </section>
  );
};

export default CryptoHero;
