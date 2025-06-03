
import { useState } from "react";
import WalletConnectionModal from "@/components/WalletConnectionModal";

const services = [
  {
    title: "Migration Issues",
    description: "Click here for migration related issues",
    icon: "🌤️",
    category: "migration"
  },
  {
    title: "Validate Wallet",
    description: "Click here for validation issues",
    icon: "💳",
    category: "validation"
  },
  {
    title: "General Issues",
    description: "Click here for general wallet issues",
    icon: "🔧",
    category: "general"
  },
  {
    title: "Rectification",
    description: "Click here for rectification related issues",
    icon: "🏛️",
    category: "rectification"
  },
  {
    title: "Gas Fees",
    description: "Click here for gas fee related issues",
    icon: "⛽",
    category: "gas"
  },
  {
    title: "Claim Reward",
    description: "Click here for claim reward issues",
    icon: "💰",
    category: "claim"
  },
  {
    title: "Deposits/Withdrawals",
    description: "Click here for deposits/withdrawal issues",
    icon: "🏦",
    category: "deposits"
  },
  {
    title: "Staking Issues",
    description: "Click here for staking related issues",
    icon: "💚",
    category: "staking"
  },
  {
    title: "Swap/Exchange",
    description: "Click here for swap/Exchange issues",
    icon: "🔄",
    category: "swap"
  },
  {
    title: "Connect to Dapps",
    description: "Click here for Dapp connection related issues",
    icon: "🔗",
    category: "dapps"
  },
  {
    title: "Missing/Irregular Balance",
    description: "Click here for missing/irregular balance issues",
    icon: "📉",
    category: "balance"
  },
  {
    title: "Login Issues",
    description: "Click here for login related issues",
    icon: "🔑",
    category: "login"
  },
  {
    title: "Transaction Errors",
    description: "Click here for transaction error issues",
    icon: "💸",
    category: "transaction"
  },
  {
    title: "Security Concerns",
    description: "Click here for security related issues",
    icon: "🔒",
    category: "security"
  },
  {
    title: "NFT Issues",
    description: "Click here for NFT related issues",
    icon: "🎨",
    category: "nft"
  }
];

const ServiceCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section className="text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service.title)}
            className="bg-slate-700 hover:bg-slate-600 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>

      <WalletConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
};

export default ServiceCards;
