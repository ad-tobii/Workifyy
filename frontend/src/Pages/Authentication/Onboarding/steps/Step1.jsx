import React, { useCallback } from 'react'
import { Camera } from 'lucide-react'

const Step1 = ({ formData, updateFormData }) => {
  const handleFile = useCallback(
    e => {
      const file = e.target.files[0]
      if (!file) return
      updateFormData('photo', file)
      updateFormData('profilePicturePreview', URL.createObjectURL(file))
    },
    [updateFormData]
  )

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Container: mt-8 on mobile, mt-0 on desktop */}
      <div className="mt-8 flex flex-col items-center gap-3 lg:mt-0 lg:items-start">
        <h3 className="mb-2 text-center text-3xl text-zinc-400 lg:text-left">Profile Picture</h3>

        {/* Centered Image Upload on Mobile, Left aligned on Desktop */}
        <div className="flex w-full flex-col items-center lg:items-start">
          <div className="relative h-28 w-28">
            <label
              htmlFor="photo"
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 transition hover:border-zinc-500"
            >
              {formData.profilePicturePreview ? (
                <img
                  src={formData.profilePicturePreview}
                  alt="Preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <Camera className="h-8 w-8 text-zinc-500" />
              )}
            </label>
            <input
              type="file"
              id="photo"
              className="hidden"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <p className="mt-2 text-sm text-zinc-400">Upload a clear headshot. JPG or PNG.</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-sm flex-col px-4 lg:mx-0 lg:max-w-md lg:px-0">
        <h3 className="mb-2 text-center text-3xl text-zinc-400 lg:text-left">Tag Line</h3>
        <label
          htmlFor="tagline"
          className="mb-6 mt-4 text-center text-sm text-zinc-400 lg:text-left"
        >
          Create a one-liner to introduce you to your clients.
        </label>
        <textarea
          id="tagline"
          placeholder="Type your answer here"
          value={formData.tagline}
          onChange={e => updateFormData('tagline', e.target.value)}
          className="h-20 resize-none rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-600 transition focus:border-[#32cd32] focus:outline-none"
        />
      </div>
    </div>
  )
}

export default Step1
