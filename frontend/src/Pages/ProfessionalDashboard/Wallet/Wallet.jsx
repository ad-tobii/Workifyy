import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import DashboardFooter from "../Footer/Footer";

const ProfessionalWallet = () => {
  const [activeTab, setActiveTab] = useState("balance");

  return (
    <div>
      <Navbar />
      <div className="bg-zinc-40 p-8 text-white mobile:p-11 tablet:p-9">
        <div className="mx-auto max-w-4xl">
          {/* Wallet Header */}
          <div className="mb-8 flex items-center justify-between xsMobile:flex-col xsMobile:items-start miniMobile:flex-col miniMobile:items-start mobile:flex-col mobile:items-start miniTablet:flex-col miniTablet:items-start tablet:flex-col tablet:items-start">
            <h1 className="text-3xl font-semibold text-[#32cd32] xsMobile:text-2xl">
              Adekeye O.
            </h1>
            <div className="flex space-x-3 rounded-lg bg-black p-3 xsMobile:p-0 xsMobile:pt-4 miniMobile:p-0 miniMobile:pt-5 mobile:p-0 mobile:pt-5 miniTablet:p-0 miniTablet:pt-5 tablet:p-0 tablet:pt-4">
              <span className="text-lg font-semibold xsMobile:text-xl mobile:text-2xl">
                Balance :{" "}
              </span>
              <div className="flex space-x-2 font-bold text-[#32cd32]">
                <span className="text-2xl xsMobile:text-xl mobile:text-2xl">
                  ₦ 150,000
                </span>
                <ArrowUpIcon className="h-8 w-8 xsMobile:h-7 xsMobile:w-5" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-between">
            {["balance", "history", "settings", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 xsMobile:px-1 xsMobile:text-sm miniMobile:px-1 miniMobile:text-sm mobile:px-2 mobile:text-sm miniTablet:px-2 miniTablet:text-lg ${
                  activeTab === tab
                    ? "text-[#32cd32] desktop:rounded desktop:border-b-4 desktop:border-b-[#32cd32] largeDesktop:rounded largeDesktop:border-b-4 largeDesktop:border-b-[#32cd32]"
                    : ""
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Nav border and Tab Content */}
          <div className="mt-8">
            {activeTab === "balance" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                {/* Balance Content */}
              </div>
            )}
            {activeTab === "history" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                {/* History Content */}
              </div>
            )}
            {activeTab === "settings" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                {/* Settings Content */}
              </div>
            )}
            {activeTab === "notifications" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                {/* Notifications Content */}
              </div>
            )}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default ProfessionalWallet;
