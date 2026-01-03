import React, { useState } from 'react'

const Step6 = ({ setStep, setFormData, formData }) => {
  // Initializing with existing data if the user goes "Back" and "Forward"
  const [address, setAddress] = useState(formData.address || '')
  const [charLeft, setCharLeft] = useState(100 - (formData.address?.length || 0))

  const handleChange = e => {
    const value = e.target.value
    const limit = 100
    const left = limit - value.length

    if (left >= 0) {
      setCharLeft(left)
      setAddress(value)
    }
  }

  return (
    <div className="flex flex-col">
      <span className="mb-4 text-2xl font-semibold">Where is the job located?</span>
      <p className="mb-4 text-gray-400">Enter the full street address for the professional.</p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="e.g. 123 Main St, Lagos"
          value={address}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-[#0f0f10] p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
        />
      </div>

      <div className="mt-6 flex flex-col items-end space-y-4">
        <span className="text-sm text-gray-500">Characters left: {charLeft}</span>

        <div className="flex w-full justify-between">
          {/* Back button is usually helpful in multi-step */}
          <button onClick={() => setStep(5)} className="text-gray-400 transition hover:text-white">
            Back
          </button>

          <button
            onClick={() => {
              if (address.trim().length < 5) {
                return alert('Please enter a more specific address.')
              }
              setFormData({ ...formData, address: address })
              setStep(7)
            }}
            className="rounded-xl bg-[#32cd32] px-10 py-3 font-medium text-black transition hover:bg-[#2dbd2d]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step6
