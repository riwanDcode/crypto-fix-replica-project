
import { useState, useEffect } from "react";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { fetchCryptocurrencyPrices } from "@/services/cryptoService";
import ApiKeyInput from "@/components/ApiKeyInput";

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

const ITEMS_PER_PAGE = 10;

const CryptoPricesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('cmc_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      loadCryptoData(storedApiKey);
    }
  }, []);

  const loadCryptoData = async (key: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchCryptocurrencyPrices(key);
      setCryptoData(data);
      localStorage.setItem('cmc_api_key', key);
      setApiKey(key);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cryptocurrency data');
      console.error('Error loading crypto data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (newApiKey: string) => {
    loadCryptoData(newApiKey);
  };

  const refreshData = () => {
    if (apiKey) {
      loadCryptoData(apiKey);
    }
  };

  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
  const visibleData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  return (
    <section className="text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Cryptocurrency Prices by Market Cap</h2>
        {apiKey && (
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Refresh</span>
            )}
          </button>
        )}
      </div>

      {!apiKey && (
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} isLoading={isLoading} />
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-red-400 font-medium">Error loading data</p>
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={() => {
                setApiKey(null);
                setError(null);
                localStorage.removeItem('cmc_api_key');
              }}
              className="text-orange-400 hover:text-orange-300 text-sm underline mt-1"
            >
              Enter new API key
            </button>
          </div>
        </div>
      )}

      {apiKey && !error && (
        <>
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
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
                <span className="ml-2 text-gray-300">Loading cryptocurrency data...</span>
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {visibleData.map((crypto, index) => (
                  <div key={`${crypto.symbol}-${index}`} className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className={`text-4xl ${crypto.color}`}>{crypto.icon}</span>
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
            )}
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((page) => (
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
          )}
        </>
      )}
    </section>
  );
};

export default CryptoPricesTable;
