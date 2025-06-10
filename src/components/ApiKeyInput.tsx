
import { useState } from "react";
import { Eye, EyeOff, Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading: boolean;
}

const ApiKeyInput = ({ onApiKeySubmit, isLoading }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Key className="w-5 h-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">CoinMarketCap API Key Required</h3>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">
        To display real-time cryptocurrency prices, please enter your CoinMarketCap API key.
        You can get a free API key from{" "}
        <a 
          href="https://coinmarketcap.com/api/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 underline"
        >
          CoinMarketCap API
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your CoinMarketCap API key"
            className="w-full pr-12 pl-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={!apiKey.trim() || isLoading}
          className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? "Loading..." : "Load Real Prices"}
        </button>
      </form>
    </div>
  );
};

export default ApiKeyInput;
