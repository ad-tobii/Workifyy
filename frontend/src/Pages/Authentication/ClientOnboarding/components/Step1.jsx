'use client'

import { useRef } from 'react'

export default function Step1({ formData, setFormData }) {
  const fileInputRef = useRef(null)

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      })
    }
  }

  const handleRemove = () => {
    setFormData({
      ...formData,
      photo: null,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getPreviewUrl = () => {
    if (formData.photo instanceof File) {
      return URL.createObjectURL(formData.photo)
    }
    return formData.photo
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-300">Profile Picture</h1>
      <p className="mb-8 text-gray-500">Upload a clear headshot. JPG or PNG.</p>

      {/* Image Preview or Upload Area */}
      {formData.photo ? (
        <div className="mb-8">
          <div
            className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full border-2"
            style={{ borderColor: '#32cd32' }}
          >
            <img
              src={getPreviewUrl() || '/placeholder.svg'}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            onClick={handleRemove}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{
              backgroundColor: '#2a2a2b',
              color: '#ff6b6b',
            }}
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mx-auto mb-8 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-all hover:opacity-80"
          style={{
            borderColor: '#32cd32',
            backgroundColor: '#16161700',
          }}
        >
          <div className="text-center">
            <div className="mb-2 text-4xl">📷</div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
