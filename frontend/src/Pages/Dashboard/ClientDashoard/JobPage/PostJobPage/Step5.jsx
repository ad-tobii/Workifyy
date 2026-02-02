import React, { useState } from 'react'

const Step5 = ({ setStep, setFormData, formData }) => {
  const [budget, setBudget] = useState('')

  const handleChange = e => {
    let value = e.target.value.replace(/\D/g, '')
    value = new Intl.NumberFormat('en-NG').format(value)
    setBudget(value)
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-2 text-2xl font-semibold text-white">How much are you thinking?</h2>
      <p className="mb-6 text-gray-400">You can always negotiate later</p>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">₦</span>
        <input
          type="text"
          value={budget}
          onChange={handleChange}
          placeholder="Enter your budget"
          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f10] py-3 pl-10 pr-4 text-center text-3xl font-extrabold tracking-widest text-[#32cd32] placeholder:align-middle placeholder:text-[1.2rem] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setStep(6)
            const cleanBudget = budget.replace(/,/g, '')
            setFormData({ ...formData, budget: parseInt(cleanBudget) })
          }}
          className="rounded-2xl bg-[#32cd32] px-6 py-3 font-medium text-black shadow-md transition hover:bg-[#28a428] hover:shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step5
