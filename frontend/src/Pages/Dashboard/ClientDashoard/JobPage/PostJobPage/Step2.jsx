import { CheckCircle2 } from 'lucide-react'

const Step2 = ({ setStep, setFormData, formData }) => {
  const title = formData.title || ''
  const maxLength = 60
  const trimmedTitle = title.trim()
  const charLeft = maxLength - title.length
  const isValid = trimmedTitle.length > 0

  const handleChange = e => {
    const value = e.target.value
    if (value.length <= maxLength) {
      setFormData({ ...formData, title: value })
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

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className={isValid ? 'flex items-center gap-2 text-[#32cd32]' : 'text-red-400'}>
          {isValid ? <CheckCircle2 size={16} /> : null}
          {isValid ? 'Title looks good' : 'Title is required'}
        </span>
        <span className="text-gray-400">Characters left: {charLeft}</span>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          disabled={!isValid}
          onClick={() => setStep(3)}
          className={`rounded-xl px-6 py-3 font-medium ${
            isValid ? 'bg-[#32cd32] text-black' : 'pointer-events-none bg-gray-700 text-gray-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step2
