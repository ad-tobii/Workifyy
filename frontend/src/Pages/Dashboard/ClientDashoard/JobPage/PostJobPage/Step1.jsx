import { CheckCircle2 } from 'lucide-react'

const Step1 = ({ setStep, setFormData, formData }) => {
  const categories = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Bricklaying',
    'Painting',
    'Air Conditioning',
    'Mechanic',
    'Solar',
    'Welding',
    'Machinery',
    'Technical',
    'Cleaning',
    'Interior Decor',
    'Hair & Beauty',
    'Tiling',
  ]

  const selectedCategory = formData.category || ''
  const isValid = Boolean(selectedCategory)

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">What kind of job is it?</h2>

      <div className="mb-2 flex flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFormData({ ...formData, category: cat })}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              selectedCategory === cat
                ? 'border-[#32cd32] bg-[#32cd32]/10 text-[#32cd32]'
                : 'border-gray-700 text-gray-300 hover:border-[#32cd32]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className={`mb-8 flex items-center gap-2 text-sm ${isValid ? 'text-[#32cd32]' : 'text-red-400'}`}>
        {isValid ? <CheckCircle2 size={16} /> : null}
        {isValid ? 'Category selected' : 'Category is required'}
      </p>

      <div className="flex justify-end">
        <button
          disabled={!isValid}
          onClick={() => setStep(2)}
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

export default Step1
