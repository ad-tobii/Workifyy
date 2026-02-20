import { CheckCircle2 } from 'lucide-react'

const Step6 = ({ setStep, setFormData, formData }) => {
  const address = formData.address || ''
  const limit = 100
  const charLeft = limit - address.length
  const isValid = address.trim().length > 0

  const handleChange = e => {
    const value = e.target.value
    if (value.length <= limit) {
      setFormData({ ...formData, address: value })
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

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className={isValid ? 'flex items-center gap-2 text-[#32cd32]' : 'text-red-400'}>
          {isValid ? <CheckCircle2 size={16} /> : null}
          {isValid ? 'Address looks good' : 'Address is required'}
        </span>
        <span className="text-gray-500">Characters left: {charLeft}</span>
      </div>

      <div className="mt-6 flex w-full justify-between">
        <button onClick={() => setStep(5)} className="text-gray-400 transition hover:text-white">
          Back
        </button>

        <button
          disabled={!isValid}
          onClick={() => setStep(7)}
          className={`rounded-xl px-10 py-3 font-medium transition ${
            isValid ? 'bg-[#32cd32] text-black hover:bg-[#2dbd2d]' : 'pointer-events-none bg-gray-700 text-gray-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step6
