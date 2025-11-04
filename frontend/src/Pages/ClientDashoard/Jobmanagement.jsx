import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DashboardFooter from "./DashboardFooter";
import {
  PencilIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import BidCard from "./BidCard";

const AcceptModal = ({
  isOpen,
  onClose,
  bidderName,
  bidAmount,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-10 w-[20rem] rounded-lg bg-[#0e0e0e] p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="/assets/black-worker.jpg"
            alt={bidderName}
            className="mb-4 h-16 w-16 rounded-full object-cover"
          />
          <p className="mb-6 text-center text-lg text-gray-300">
            Hire <span className="font-semibold">{bidderName}</span> for{" "}
            <span className="font-semibold">₦{bidAmount.toLocaleString()}</span>?
          </p>
          <div className="flex w-full justify-between gap-4">
            <button
              onClick={onAccept}
              className="flex-1 rounded-lg bg-[#32cd32] px-4 py-2 text-white hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-[#1a1a1a] px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RejectModal = ({ isOpen, onClose, bidderName, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-10 w-[20rem] rounded-lg bg-[#0e0e0e] p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="/assets/black-worker.jpg"
            alt={bidderName}
            className="mb-4 h-16 w-16 rounded-full object-cover"
          />
          <p className="mb-6 text-center text-lg text-gray-300">
            Reject <span className="font-semibold">{bidderName}</span>'s offer?
          </p>
          <div className="flex w-full justify-between gap-4">
            <button
              onClick={onReject}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Reject
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-[#1a1a1a] px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterModal = ({
  isOpen,
  onClose,
  bidderName,
  originalBidAmount,
  onCounter,
}) => {
  const [counterAmount] = useState(originalBidAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-10 w-[20rem] rounded-lg bg-[#0e0e0e] p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="/assets/black-worker.jpg"
            alt={bidderName}
            className="mb-4 h-16 w-16 rounded-full object-cover"
          />
          <p className="mb-4 text-center text-lg text-gray-300">
            Make counter offer to{" "}
            <span className="font-semibold">{bidderName}</span>
          </p>
          <div className="mb-4 w-full">
            <label className="mb-2 block text-sm text-gray-400">
              Counter Offer Amount (₦)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 p-2 text-white"
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <button
              onClick={() => onCounter(counterAmount)}
              className="flex-1 rounded-lg bg-[#1a1a1a] px-4 py-2 text-[#32cd32] hover:bg-[#32cd32] hover:text-white"
            >
              Make Offer
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-[#1a1a1a] px-4 py-2 text-red-600 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobManagement = () => {
  const [modalState, setModalState] = useState({
    accept: false,
    counter: false,
    reject: false,
  });

  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    if (Object.values(modalState).some((value) => value)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalState]);

  const handleAction = (actionType, bidData) => {
    setSelectedBid(bidData);
    setModalState({
      accept: actionType === "accept",
      counter: actionType === "counter",
      reject: actionType === "reject",
    });
  };

  const handleCloseModal = () => {
    setModalState({ accept: false, counter: false, reject: false });
    setSelectedBid(null);
  };

  const handleAcceptBid = () => {
    console.log("Accepting bid:", selectedBid);
    handleCloseModal();
  };

  const handleRejectBid = () => {
    console.log("Rejecting bid:", selectedBid);
    handleCloseModal();
  };

  const handleCounterBid = (amount) => {
    console.log("Counter offer:", { bid: selectedBid, amount });
    handleCloseModal();
  };

  const isAnyModalOpen = Object.values(modalState).some((value) => value);

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <AcceptModal
        isOpen={modalState.accept}
        onClose={handleCloseModal}
        bidderName={selectedBid?.bidderName || ""}
        bidAmount={selectedBid?.bidAmount || 0}
        bidderImage={selectedBid?.bidderImage || ""}
        onAccept={handleAcceptBid}
      />

      <RejectModal
        isOpen={modalState.reject}
        onClose={handleCloseModal}
        bidderName={selectedBid?.bidderName || ""}
        bidderImage={selectedBid?.bidderImage || ""}
        onReject={handleRejectBid}
      />

      <CounterModal
        isOpen={modalState.counter}
        onClose={handleCloseModal}
        bidderName={selectedBid?.bidderName || ""}
        bidderImage={selectedBid?.bidderImage || ""}
        originalBidAmount={selectedBid?.bidAmount || 0}
        onCounter={handleCounterBid}
      />

      <div className={isAnyModalOpen ? "opacity-50" : ""}>
        <Navbar />
        <div className="container mx-auto my-8 p-9">
          <div className="mb-6 border-b border-zinc-700 pb-4">
            <h1 className="text-3xl font-semibold text-white">
              Need a plumber for my leaking sink.
            </h1>
            <p className="mt-2 text-gray-500">Posted: 3 hours ago</p>
          </div>

          <div className="mb-8 flex flex-col gap-6 lg:flex-row">
            <div className="flex h-40 w-full items-center justify-center lg:w-1/3">
              <img
                src="/assets/portfolio1.jpg"
                alt="Job"
                className="h-full w-full rounded-md object-cover"
              />
            </div>

            <div className="w-full lg:w-2/3">
              <p className="mb-4 rounded-lg bg-[#0e0e0e] p-4 text-gray-400">
                Job Description: Please I need an experienced plumber who can do
                a neat job for my leaking sink.
              </p>
              <div className="rounded-md bg-green-900 p-4">
                <p className="font-bold text-[#32cd32]">
                  Price Offered: ₦50,000
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <h2 className="text-xl font-bold text-white">Bids</h2>
              <p className="text-gray-300">
                Total Bids: 25 |
                <span className="text-[#32cd32]"> Avg. Bid: ₦47,000</span>
              </p>
              <select className="w-full rounded border border-gray-700 bg-black p-2 text-white lg:w-auto">
                <option>Sort by Price</option>
                <option>Sort by Rating</option>
                <option>Sort by Experience</option>
              </select>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <BidCard
                  key={index}
                  acceptOpen={modalState.accept}
                  counterOpen={modalState.counter}
                  rejectOpen={modalState.reject}
                  onAction={(actionType) =>
                    handleAction(actionType, {
                      bidderName: "Kurosaki Ichigo",
                      bidAmount: 40000,
                      bidderImage: "/api/placeholder/400/320",
                    })
                  }
                  bidAmount={40000}
                  workerName="Kurosaki Ichigo"
                  workerImage="/api/placeholder/400/320"
                  bidDescription="I can fix the sink within 2-3 hours, I'll be buying a few materials for ₦20,000 and then ₦5000 service fee."
                />
              ))}
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-md bg-[#0e0e0e] p-4">
                <h3 className="mb-2 text-lg font-bold text-white">
                  Job History
                </h3>
                <ul className="list-inside list-disc text-gray-400">
                  <li>Job posted: 2 hours ago</li>
                  <li>Bids started: 2 hours ago</li>
                  <li>Latest bid received: 15 minutes ago</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-[#0e0e0e] p-4">
                <h3 className="text-lg font-bold text-white">Job Settings</h3>
                <button className="mt-2 flex w-full items-center justify-center rounded bg-zinc-900 py-2 text-[#32cd32] hover:bg-[#04aa04] hover:text-white">
                  <PencilIcon className="mr-2 h-5 w-5" />
                  Edit Job
                </button>
                <button className="mt-2 flex w-full items-center justify-center rounded bg-red-600 py-2 text-white hover:bg-zinc-900 hover:text-red-600">
                  <XMarkIcon className="mr-2 h-5 w-5" />
                  Close Job
                </button>
                <button className="mt-2 flex w-full items-center justify-center rounded bg-blue-500 py-2 text-white hover:bg-zinc-900 hover:text-blue-600">
                  <ArrowPathIcon className="mr-2 h-5 w-5" />
                  Repost Job
                </button>
              </div>

              <div className="rounded-md bg-[#0e0e0e] p-4">
                <h3 className="text-lg font-bold text-white">Client Info</h3>
                <p className="text-gray-400">Adekeye Oluwatobi</p>
                <p>Rating: ⭐⭐⭐⭐</p>
              </div>

              <div className="rounded-md bg-[#0e0e0e] p-4">
                <h3 className="text-lg font-bold text-white">Job Location</h3>
                <div className="flex h-40 w-full items-center justify-center bg-[#323232]">
                  <span className="text-lg text-gray-400">[Map Preview]</span>
                </div>
                <p className="mt-2">No 32, Al-mubarak, Fagge, Kano.</p>
              </div>
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default JobManagement;
