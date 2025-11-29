import React, { useCallback } from 'react'

const Step5 = ({ formData, updateFormData }) => {
  const selected = formData.languages || []
  const toggleLanguage = useCallback(
    lang => {
      const newLanguages = selected.includes(lang)
        ? selected.filter(l => l !== lang)
        : [...selected, lang]
      updateFormData('languages', newLanguages)
    },
    [selected, updateFormData]
  )

  const popularLanguages = [
    'English',
    'Hausa',
    'Yoruba',
    'Igbo',
    'Fulfulde',
    'Kanuri',
    'Ibibio',
    'Tiv',
    'Ijaw',
    'Edo',
    'Other',
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto mt-10 w-full max-w-xl p-4 duration-500 lg:mx-0 lg:mt-0 lg:px-0">
      <h3 className="mb-4 text-center text-2xl font-semibold text-zinc-300 lg:text-left">
        Pick Languages You Speak
      </h3>
      <p className="mx-8 mb-6 text-center text-sm text-zinc-400 lg:mx-0 lg:text-left">
        Tap on the languages below to select the ones you can speak
      </p>
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        {popularLanguages.map(lang => {
          const isSelected = selected.includes(lang)
          return (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-zinc-300 transition-colors duration-200 ${
                isSelected
                  ? 'border-green-500 bg-[#32cd32] text-white'
                  : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {lang}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Step5