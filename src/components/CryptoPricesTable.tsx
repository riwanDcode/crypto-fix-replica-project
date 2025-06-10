
import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoPrices } from "@/services/cryptoService";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 10;

const CryptoPricesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { data: cryptoTableData = [], isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['cryptoPricesTable'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });

  const filteredData = cryptoTableData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
  const visibleData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString();

  return (
    <section className="text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Cryptocurrency Prices by Market Cap</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Last updated: {lastUpdated}</span>
          <button
            onClick={() => refetch()}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search For a Crypto Currency"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0); // Reset to first page when searching
            }}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>
      </div>

      {error ? (
        <div className="text-center text-red-400 py-8">
          <p>Failed to load cryptocurrency data</p>
          <button 
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-700 font-semibold">
              <div>Coin</div>
              <div>Price</div>
              <div>24h Change</div>
              <div>Market Cap</div>
            </div>
            
            <div className="divide-y divide-slate-700">
              {isLoading ? (
                Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-8 h-8 rounded-full bg-slate-600" />
                      <Skeleton className="h-4 w-32 bg-slate-600" />
                    </div>
                    <Skeleton className="h-4 w-20 bg-slate-600" />
                    <Skeleton className="h-4 w-16 bg-slate-600" />
                    <Skeleton className="h-4 w-28 bg-slate-600" />
                  </div>
                ))
              ) : (
                visibleData.map((crypto, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className={`text-3xl ${crypto.color}`}>{crypto.icon}</span>
                      <span className="font-medium">{crypto.name}</span>
                    </div>
                    <div className="font-semibold">{crypto.price}</div>
                    <div className={`font-medium ${crypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change}
                    </div>
                    <div className="text-gray-300">{crypto.marketCap}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
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
                    disabled={isLoading}
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
