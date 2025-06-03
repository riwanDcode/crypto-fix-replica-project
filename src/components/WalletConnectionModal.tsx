
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  "Metamask",
  "Trust Wallet",
  "Coinbase",
  "Keplr Wallet",
  "Safepal",
  "Tronlink",
  "Defichain Wallet",
  "DFX Defichain",
  "Solana",
  "Blockchain",
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

  const handleConnect = () => {
    // This is for educational purposes only - in a real app, never handle private keys this way
    console.log("Educational simulation - wallet connection attempted");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Connect Your Wallet To Get Started
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="space-y-6 mt-6">
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

            <Select value={accessType} onValueChange={setAccessType}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Access Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {accessTypes.map((access) => (
                  <SelectItem key={access} value={access} className="text-white hover:bg-slate-600">
                    {access}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              onClick={onClose}
              variant="destructive"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionModal;
