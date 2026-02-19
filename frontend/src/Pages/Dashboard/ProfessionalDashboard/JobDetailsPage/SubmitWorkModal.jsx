import { useState } from 'react'
import { XMarkIcon, PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import useJobStore from '../../../../store/useJobStore'

const SubmitWorkModal = ({ isOpen, onClose, jobId }) => {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const submitWork = useJobStore(state => state.submitWork)
  const loading = useJobStore(state => state.loading)

  const handleImageChange = e => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 10) {
      setError('Maximum 10 images allowed')
      return
    }

    setImages(prev => [...prev, ...files])

    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setError(null)

    if (images.length === 0) {
      setError('At least one image is required')
      return
    }

    try {
      await submitWork(jobId, images, message)
      setSuccess(true)
    } catch (err) {
      setError('Failed to submit work. Please try again.')
    }
  }

  const handleClose = () => {
    setImages([])
    setPreviews([])
    setMessage('')
    setSuccess(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#131314] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {success ? 'Work Submitted!' : 'Submit Your Work'}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {success ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircleIcon className="mb-4 h-16 w-16 text-[#32cd32]" />
            <p className="mb-2 text-lg font-semibold text-white">Work submitted successfully!</p>
            <p className="mb-8 text-sm text-zinc-400">The client will review your submission</p>
            <button
              onClick={handleClose}
              className="rounded-2xl bg-[#32cd32] px-8 py-3 text-sm font-bold text-black transition-all hover:bg-[#2eb32e] active:scale-95"
            >
              Close
            </button>
          </div>
        ) : (
          // Form
          <>
            {/* Image Upload */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-white">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <p className="mb-3 text-xs text-zinc-400">Upload up to 10 photos of completed work</p>

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="group relative aspect-square">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full rounded-xl object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <XMarkIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {images.length < 10 && (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-8 transition-colors hover:border-[#32cd32] hover:bg-zinc-900">
                  <PhotoIcon className="mb-2 h-12 w-12 text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-300">Click to upload images</p>
                  <p className="text-xs text-zinc-500">PNG, JPG up to 10MB each</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-white">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                placeholder="Add any notes about the work you completed..."
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#32cd32]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-2xl border border-zinc-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || images.length === 0}
                className="flex-1 rounded-2xl bg-[#32cd32] py-3 text-sm font-bold text-black transition-all hover:bg-[#2eb32e] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Work'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SubmitWorkModal
