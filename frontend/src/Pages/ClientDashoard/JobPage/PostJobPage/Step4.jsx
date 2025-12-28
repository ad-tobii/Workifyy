import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

const Step4 = ({ setStep }) => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Show us what’s going on</h2>
      <p className="mb-6 text-gray-400">Pictures help workers understand the job faster</p>

      <div className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-700 p-10 text-center transition hover:border-[#32cd32] hover:bg-gray-50">
        <PhotoIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="font-medium text-gray-400">Click to upload photos</p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setStep(5)}
          className="rounded-xl bg-[#32cd32] px-6 py-3 font-medium text-black transition hover:bg-[#28a428]"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step4
