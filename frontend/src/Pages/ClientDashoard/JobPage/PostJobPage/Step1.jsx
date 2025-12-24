import { useState } from 'react'

const Step1 = ({ setStep }) => {
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

  const [selectedCategory, setSelectedCategory] = useState('')
  return (
    <>
      <div>
        <h2 className="mb-4 text-2xl font-semibold">What kind of job is it?</h2>
       

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

        <div className="flex justify-end">
          <button
            disabled={!selectedCategory}
            onClick={() => setStep(2)}
            className={`rounded-xl px-6 py-3 font-medium ${
              selectedCategory
                ? 'bg-[#32cd32] text-black'
                : 'cursor-not-allowed bg-gray-700 text-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Step1
