
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCryptocurrencyPrices } from "@/services/cryptoService";

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

const ITEMS_PER_PAGE = 4;

const CryptoHero = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCryptoData();
  }, []);

  const loadCryptoData = async () => {
    const storedApiKey = localStorage.getItem('cmc_api_key');
    if (!storedApiKey) return;

    setIsLoading(true);
    try {
      const data = await fetchCryptocurrencyPrices(storedApiKey);
      // Take only the first 20 for the hero section
      setCryptoData(data.slice(0, 20));
    } catch (error) {
      console.error('Error loading crypto data for hero:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(cryptoData.length / ITEMS_PER_PAGE);
  
  useEffect(() => {
    if (totalPages === 0) return;
    
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

  if (isLoading || cryptoData.length === 0) {
    return (
      <section className="text-white">
        <h2 className="text-2xl font-bold text-center mb-8">The Platform Offers</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">
            {isLoading ? "Loading cryptocurrency data..." : "Configure API key in the table below to see live prices"}
          </p>
        </div>
      </section>
    );
  }

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

        {totalPages > 1 && (
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
        )}
      </div>
    </section>
  );
};

export default CryptoHero;
