import React from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Step4 = ({ setStep, formData, setFormData }) => {
  const handleFileChange = e => {
    // Basic check to ensure files were actually selected
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file))

    // Update state
    setFormData({
      ...formData,
      images: [...(formData.images || []), ...files],
      previews: [...(formData.previews || []), ...newPreviews],
    })
  }

  const removeImage = index => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    const updatedPreviews = formData.previews.filter((_, i) => i !== index)
    setFormData({ ...formData, images: updatedImages, previews: updatedPreviews })
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Show us what’s going on</h2>
      <p className="mb-6 text-gray-400">Pictures help workers understand the job faster</p>

      {/* The 'htmlFor' links this label to the input ID. 
          Clicking anywhere inside this label opens the file picker.
      */}
      {(!formData.images || formData.images.length === 0) && (
        <label
          htmlFor="file-upload"
          className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-700 p-10 text-center transition hover:border-[#32cd32] hover:bg-gray-800"
        >
          <PhotoIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="font-medium text-gray-400">Click to upload photos</p>

          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* Preview Grid */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {formData.previews?.map((url, index) => (
          <div key={index} className="relative h-24 w-full">
            <img
              src={url}
              alt="preview"
              className="h-full w-full rounded-lg object-cover object-center"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-lg"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
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
