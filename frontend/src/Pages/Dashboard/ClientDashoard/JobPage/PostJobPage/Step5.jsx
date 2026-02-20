import { CheckCircle2 } from 'lucide-react'

const Step5 = ({ setStep, setFormData, formData }) => {
  const budgetInput = formData.budget ? new Intl.NumberFormat('en-NG').format(formData.budget) : ''
  const budgetValue = Number(formData.budget || 0)
  const isValid = Number.isFinite(budgetValue) && budgetValue > 0

  const handleChange = e => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    if (!digitsOnly) {
      setFormData({ ...formData, budget: '' })
      return
    }

    setFormData({ ...formData, budget: parseInt(digitsOnly, 10) })
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-2 text-2xl font-semibold text-white">How much are you thinking?</h2>
      <p className="mb-6 text-gray-400">You can always negotiate later</p>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">₦</span>
        <input
          type="text"
          value={budgetInput}
          onChange={handleChange}
          placeholder="Enter your budget"
          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f10] py-3 pl-10 pr-4 text-center text-3xl font-extrabold tracking-widest text-[#32cd32] placeholder:align-middle placeholder:text-[1.2rem] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
        />
      </div>

      <p className={`mt-3 text-sm ${isValid ? 'flex items-center gap-2 text-[#32cd32]' : 'text-red-400'}`}>
        {isValid ? <CheckCircle2 size={16} /> : null}
        {isValid ? 'Budget is valid' : 'Budget must be greater than 0'}
      </p>

      <div className="mt-6 flex justify-end">
        <button
          disabled={!isValid}
          onClick={() => setStep(6)}
          className={`rounded-2xl px-6 py-3 font-medium shadow-md transition ${
            isValid
              ? 'bg-[#32cd32] text-black hover:bg-[#28a428] hover:shadow-lg'
              : 'pointer-events-none bg-gray-700 text-gray-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step5
