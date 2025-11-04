import Rating from "./Rating";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";

const BidCard = ({
  onAction,
  bidAmount,
  workerName,
  bidDescription,
}) => {
  return (
    <div>
      <div>
        <div className="mt-3 space-y-4">
          <div className="flex flex-col justify-between rounded-md border border-black bg-[#0e0e0e] p-4 lg:flex-row">
            {/* Left Section: Profile Picture and Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                {/* Profile Picture */}
                <img
                  src="/assets/black-worker.jpg"
                  className="flex h-12 w-12 items-center justify-center rounded-full object-cover"
                  alt={workerName}
                />

                {/* Professional Info */}
                <div className="space-y-1">
                  <div className="flex items-center">
                    <p className="mr-2 font-bold text-white">{workerName}</p>
                    <Rating />
                  </div>
                  <p className="text-gray-400">
                    ₦ {bidAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500">
                  Bid Description: {bidDescription}
                </p>
              </div>
            </div>

            {/* Right Section: Action Buttons */}
            <div className="mt-4 flex flex-col gap-2 lg:mt-0 lg:flex-row lg:items-center lg:justify-end">
              <button
                onClick={() => onAction("accept")}
                className="flex w-full items-center rounded bg-[#32cd32] px-4 py-2 text-black hover:bg-zinc-900 hover:text-[#32cd32] lg:w-auto"
              >
                <CheckCircleIcon className="mr-2 h-5 w-5" />
                Accept
              </button>

              <button
                onClick={() => onAction("reject")}
                className="flex w-full items-center rounded bg-red-600 px-4 py-2 text-white hover:bg-zinc-900 hover:text-red-600 lg:w-auto"
              >
                <XCircleIcon className="mr-2 h-5 w-5" />
                Reject
              </button>

              <button
                onClick={() => onAction("counter")}
                className="flex w-full items-center rounded bg-zinc-900 px-4 py-2 text-[#32cd32] hover:bg-[#04aa04] hover:text-black lg:w-auto"
              >
                <ArrowsUpDownIcon className="mr-2 h-5 w-5" />
                Counter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
