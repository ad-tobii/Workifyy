import TopBar from '../TopBar'
import BottomBar from '../BottomBar'
import JobImages from './JobImages'
import JobDescription from './JobDescription'
import BidPanel from './BidPanel'

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <TopBar />

      <div className="mx-auto w-[90%] px-2 py-4 text-zinc-400">
        {/* Title now starts exactly where the images start */}
        <h1 className="mb-6 text-xl font-medium tracking-wide text-zinc-400 sm:text-3xl md:text-3xl lg:text-3xl">
          I no go say person matter no matter
        </h1>

        {/* Job Images */}
        <div className="w-full">
          <JobImages />
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left Side: Job Description (Main Content) */}
          <div className="w-full lg:flex-[1.5]">
            <JobDescription />
          </div>

          {/* Right Side: Bid Panel (Sticky Sidebar) */}
          <div className="w-full lg:sticky lg:top-10 lg:w-[380px]">
            {/* flex justify-center ensures it looks good if the column is wider than the card */}
            <div className="flex justify-center lg:justify-end">
              <BidPanel />
            </div>
          </div>
        </div>
        {/* You can add description or other details here, 
              and they will also align with the images! */}
      </div>

      <BottomBar />
    </div>
  )
}

export default JobDetailsPage
