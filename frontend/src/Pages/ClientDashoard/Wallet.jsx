import React, { useState } from "react";
import Navbar from "./Navbar";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import DashboardFooter from "./DashboardFooter";

const ClientWallet = () => {
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
            <button
              onClick={() => setActiveTab("balance")}
              className={`px-6 py-3 xsMobile:px-1 xsMobile:text-sm miniMobile:px-1 miniMobile:text-sm mobile:px-2 mobile:text-sm miniTablet:px-2 miniTablet:text-lg tablet:px-1 ${
                activeTab === "balance"
                  ? "text-[#32cd32] desktop:rounded desktop:border-b-4 desktop:border-b-[#32cd32] largeDesktop:rounded largeDesktop:border-b-4 largeDesktop:border-b-[#32cd32]"
                  : ""
              }`}
            >
              Balance
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 xsMobile:px-1 xsMobile:text-sm miniMobile:px-1 miniMobile:text-sm mobile:px-2 mobile:text-sm miniTablet:px-2 miniTablet:text-lg ${
                activeTab === "history"
                  ? "text-[#32cd32] desktop:rounded desktop:border-b-4 desktop:border-b-[#32cd32] largeDesktop:rounded largeDesktop:border-b-4 largeDesktop:border-b-[#32cd32]"
                  : ""
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 xsMobile:px-1 xsMobile:text-sm miniMobile:px-1 miniMobile:text-sm mobile:px-2 mobile:text-sm miniTablet:px-2 miniTablet:text-lg ${
                activeTab === "settings"
                  ? "text-[#32cd32] desktop:rounded desktop:border-b-4 desktop:border-b-[#32cd32] largeDesktop:rounded largeDesktop:border-b-4 largeDesktop:border-b-[#32cd32]"
                  : ""
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-6 py-3 xsMobile:px-1 xsMobile:text-sm miniMobile:px-1 miniMobile:text-sm mobile:px-2 mobile:text-sm miniTablet:px-2 miniTablet:text-lg ${
                activeTab === "notifications"
                  ? "text-[#32cd32] desktop:rounded desktop:border-b-4 desktop:border-b-[#32cd32] largeDesktop:rounded largeDesktop:border-b-4 largeDesktop:border-b-[#32cd32]"
                  : ""
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Nav border */}
          {activeTab === "balance" && (
            <div className="flex space-x-2 transition-all duration-300 ease-in-out">
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#32cd32] xsMobile:w-[13rem] miniMobile:w-[12rem] mobile:w-[12rem] miniTablet:w-[12rem] tablet:w-[10rem] miniLaptop:w-[12rem] laptop:w-[12rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[37rem] miniMobile:w-[38rem] mobile:w-[38rem] miniTablet:w-[38rem] tablet:w-[40rem] miniLaptop:w-[38rem] laptop:w-[38rem]" />
            </div>
          )}
          {activeTab === "history" && (
            <div className="flex space-x-2 transition-all duration-300 ease-in-out">
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[11rem] miniMobile:w-[10rem] mobile:w-[10rem] miniTablet:w-[11rem] tablet:w-[9rem] miniLaptop:w-[11rem] laptop:w-[11rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#32cd32] xsMobile:w-[12rem] miniMobile:w-[12rem] mobile:w-[12rem] miniTablet:w-[12rem] tablet:w-[10rem] miniLaptop:w-[12rem] laptop:w-[12rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[27rem] miniMobile:w-[28rem] mobile:w-[28rem] miniTablet:w-[27rem] tablet:w-[31rem] miniLaptop:w-[27rem] laptop:w-[27rem]" />
            </div>
          )}
          {activeTab === "settings" && (
            <div className="flex space-x-2 transition-all duration-300 ease-in-out">
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[24rem] miniMobile:w-[23rem] mobile:w-[23rem] miniTablet:w-[23rem] tablet:w-[22rem] miniLaptop:w-[24rem] laptop:w-[24rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#32cd32] xsMobile:w-[12rem] miniMobile:w-[11rem] mobile:w-[11rem] miniTablet:w-[12rem] tablet:w-[13rem] miniLaptop:w-[12rem] laptop:w-[12rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[14rem] miniMobile:w-[16rem] mobile:w-[16rem] miniTablet:w-[15rem] tablet:w-[15rem] miniLaptop:w-[14rem] laptop:w-[14rem]" />
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="flex space-x-2 transition-all duration-300 ease-in-out">
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#323232] xsMobile:w-[36rem] miniMobile:w-[35rem] mobile:w-[35rem] miniTablet:w-[35rem] tablet:w-[35rem] miniLaptop:w-[38rem] laptop:w-[38rem]" />
              <hr className="h-[0.18rem] rounded-full border-0 bg-[#32cd32] xsMobile:w-[14rem] miniMobile:w-[15rem] mobile:w-[15rem] miniTablet:w-[15rem] tablet:w-[15rem] miniLaptop:w-[12rem] laptop:w-[12rem]" />
            </div>
          )}

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "balance" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Wallet Balance</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mobile:gap-6 miniLaptop:flex miniLaptop:flex-col laptop:flex laptop:flex-col">
                  <div className="transform rounded-lg bg-zinc-800 p-4 transition-transform duration-200 hover:scale-105">
                    <h3 className="font-semibold text-[#32cd32]">
                      Current Balance
                    </h3>
                    <p className="text-2xl font-bold">₦ 150,000</p>
                  </div>
                  <div className="transform rounded-lg bg-zinc-800 p-4 transition-transform duration-200 hover:scale-105">
                    <h3 className="font-semibold text-[#32cd32]">
                      Pending Funds
                    </h3>
                    <p className="text-2xl font-bold">₦ 25,000</p>
                  </div>
                  <div className="transform rounded-lg bg-zinc-800 p-4 transition-transform duration-200 hover:scale-105">
                    <h3 className="font-semibold text-[#32cd32]">
                      Withdrawable Funds
                    </h3>
                    <p className="text-2xl font-bold">₦ 100,000</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Transaction History</h2>
                <ul className="space-y-4 mobile:space-y-6">
                  <li className="flex-col rounded-lg bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                      <span className="text-sm text-gray-400">
                        Taiwo Hassan
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        10:00 pm
                      </span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span>Payment Sent</span>
                      <span className="font-bold text-red-500">- ₦15,000</span>
                    </div>
                  </li>
                  <li className="flex-col rounded-lg bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                      <span className="text-sm text-gray-400">
                        Sasuke Uchiha
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        9:09 pm
                      </span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span>Payment Received</span>
                      <span className="font-bold text-[#32cd32]">
                        + ₦15,000
                      </span>
                    </div>
                  </li>
                  <li className="flex-col rounded-lg bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                      <span className="text-sm text-gray-400">
                        Kurosaki Ichigo
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        9:00 pm
                      </span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span>Payment Sent</span>
                      <span className="font-bold text-red-500">- ₦15,000</span>
                    </div>
                  </li>
                  <li className="flex-col rounded-lg bg-zinc-800">
                    <div className="flex justify-between px-4 pt-4">
                      <span className="text-sm text-gray-400">
                        Byakuya Kuchiki
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        7:00 pm
                      </span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span>Payment Pending</span>
                      <span className="font-bold text-yellow-400">
                        + ₦15,000
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Payment Settings</h2>
                <div className="space-y-4 mobile:space-y-6">
                  <div className="rounded-lg bg-zinc-800 p-4">
                    <label className="mb-2 block">Bank Account Number</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-zinc-900 p-2"
                    />
                  </div>
                  <div className="rounded-lg bg-zinc-800 p-4">
                    <label className="mb-2 block">Account Name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-zinc-900 p-2"
                    />
                  </div>
                  <div className="rounded-lg bg-zinc-800 p-4">
                    <label className="mb-2 block">Bank</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-700 bg-zinc-900 p-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="rounded-lg bg-black p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Notifications</h2>
                <p className="text-gray-400">You have no new notifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default ClientWallet;
