import { BookmarkIcon } from '@heroicons/react/24/outline'

const SavedJobsPage = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
        <BookmarkIcon className="h-8 w-8 text-zinc-500" />
      </div>
      <p className="text-lg font-semibold text-white">Saved Jobs</p>
      <p className="text-sm text-zinc-500">Job saving is coming soon</p>
    </div>
  )
}

export default SavedJobsPage
