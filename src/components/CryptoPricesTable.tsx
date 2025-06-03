
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
  }
];

const CryptoPricesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = cryptoTableData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredData.map((crypto, index) => (
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded ${
                page === 4 
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
