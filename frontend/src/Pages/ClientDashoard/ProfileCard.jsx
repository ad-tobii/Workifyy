import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  return (
    <div className="mr-12 flex h-[17rem] w-72 flex-col rounded-xl bg-[#1a1a1a] laptop:h-[13rem] desktop:ml-[2rem]">
      <div className="flex space-x-2 px-4 py-4">
        <div>
          <img
            src="/assets/black-worker.jpg"
            className="h-14 w-14 rounded-full object-cover"
            alt="Worker"
          />
        </div>
        <div className="flex flex-col space-y-2 text-white">
          <Link to="/dashboard/clientDashboard/Profile">
            <p className="text-xl underline hover:text-[#32cd32]">Adekeye O.</p>
          </Link>

          <p className="text-sm font-semibold">Client</p>
        </div>
      </div>

      <div className="flex justify-center">
        <hr className="w-64 border-gray-500" />
      </div>
      <div className="flex justify-between px-4 py-2 text-[0.9rem] text-white">
        <div className="space-y-2">
          <p>Avg rating</p>
          <p>Location</p>
          <p>Member since</p>
          <p>Jobs Posted</p>
          <p>Balance</p>
        </div>
        <div className="space-y-2">
          <Rating />
          <p>Fagge, Kano</p>
          <p>May, 2020</p>
          <p>120 jobs</p>
          <p>₦ 15,000</p>
        </div>
      </div>
      <div className="flex justify-center laptop:hidden">
        <hr className="w-64 border-gray-500" />
      </div>

      <div className="mt-12">
        <img
          src="/assets/clientHero.png"
          className="rounded-lg border-2 border-dotted border-[#323232]"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
