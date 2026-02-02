import React, { useState } from 'react'

const Step2 = ({ setStep, setFormData, formData }) => {
  const [title, setTitle] = useState('')
  const [charLeft, setCharLeft] = useState(120)
  const handleChange = e => {
    const value = e.target.value
    const left = 60 - value.length

    // Use the local 'left' variable so the logic is instant
    if (left >= 0) {
      setCharLeft(left)
      setTitle(value)
    }
  }
  return (
    <div>
      <span className="mb-4 text-2xl font-semibold">Job Title — Keep it short and specific.</span>
      <div className="mt-4">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-[#0f0f10] p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
        />
      </div>

      <div className="mt-6 flex justify-end space-y-12">
        <span className="">Characters left : {charLeft}</span>
        <button
          onClick={() => {
            setStep(3)
            setFormData({ ...formData, title: title })
          }}
          className="rounded-xl bg-[#32cd32] px-6 py-3 font-medium text-black"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step2
