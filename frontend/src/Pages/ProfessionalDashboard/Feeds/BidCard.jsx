import React from "react";
import {
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const BidCard = ({ bid }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Accepted":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div>
      <div className="group w-[50.5rem] p-6 shadow-md transition-colors duration-300 hover:bg-[#1a1a1a] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold text-white group-hover:text-[#32cd32] group-hover:underline">
            {bid.jobTitle}
          </h2>
          <span
            className={`rounded-full px-2 py-1 text-sm font-medium ${getStatusStyle(bid.status)}`}
          >
            {bid.status}
          </span>
        </div>

        <p className="mb-4 text-gray-400">{bid.clientName}</p>

        <div className="mb-4 flex flex-wrap">
          <div className="mb-2 flex w-full items-center sm:mb-0 sm:w-1/2">
            <CurrencyDollarIcon className="mr-2 h-5 w-5 text-gray-300" />
            <span className="text-gray-500">
              Your Bid: ₦ {bid.bidAmount.toFixed(2)}
            </span>
          </div>
          <div className="mb-2 flex w-full items-center sm:mb-0 sm:w-1/2">
            <ClockIcon className="mr-2 h-5 w-5 text-gray-300" />
            <span className="text-gray-500">Submitted: {bid.dateSubmitted}</span>
          </div>
          <div className="mb-2 flex w-full items-center sm:mb-0 sm:w-1/2">
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-300" />
            <span className="text-gray-500">Deadline: {bid.projectDeadline}</span>
          </div>
          <div className="flex w-full items-center sm:w-1/2">
            <UsersIcon className="mr-2 h-5 w-5 text-gray-300" />
            <span className="text-gray-500">Competing Bids: {bid.competingBids}</span>
          </div>
        </div>

        <p className="mb-4 text-white">{bid.proposalSummary}</p>

        <div className="flex items-center space-x-4">
          <div className="flex flex-wrap gap-2">
            <button className="rounded bg-[#32cd32] px-2 py-1 text-xs font-medium text-white transition duration-300 hover:bg-white hover:text-[#32cd32] sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base">
              View Full Proposal
            </button>
            <button className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white transition duration-300 hover:bg-white hover:text-[#32cd32] sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <hr className="h-[0.08rem] w-[50.5rem] border-0 bg-[#2e2e2e] xsMobile:w-[15.5rem] miniMobile:w-[18.5rem] mobile:w-[22rem] miniTablet:w-[20.5rem] tablet:w-[26.5rem] miniLaptop:w-[30.5rem] laptop:w-[33.5rem] desktop:w-[33.5rem]" />
    </div>
  );
};

// Sample bid data for testing
const sampleBid = {
  id: "1",
  jobTitle: "Full Stack Web Developer for E-commerce Project",
  clientName: "TechInnovate Solutions",
  status: "Pending",
  bidAmount: 5000,
  dateSubmitted: "2024-09-15",
  projectDeadline: "2024-12-01",
  competingBids: 12,
  proposalSummary:
    "As a seasoned full-stack developer with 8+ years of experience in e-commerce solutions, I'm excited to bring your vision to life. My proposal includes a comprehensive approach to develop a scalable, secure, and user-friendly platform tailored to your specific needs...",
};

// Example usage
const TestComponent = () => <BidCard bid={sampleBid} />;

export default BidCard;
export { sampleBid, TestComponent };
