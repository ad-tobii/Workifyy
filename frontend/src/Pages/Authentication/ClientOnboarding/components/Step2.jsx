'use client'

import { useState } from 'react'

const NIGERIAN_LANGUAGES = [
  'Yoruba',
  'Igbo',
  'Hausa',
  'Fulani',
  'Kanuri',
  'Tiv',
  'Edo',
  'Isoko',
  'Ibibio',
  'Ijaw',
  'Kalabari',
  'Nupe',
  'Berom',
  'Efik',
  'Idoma',
]

export default function Step2({ formData = { languages: [] }, setFormData }) {
  const [selectedLanguages, setSelectedLanguages] = useState(formData?.languages || [])

  const handleToggleLanguage = language => {
    let updated
    if (selectedLanguages.includes(language)) {
      updated = selectedLanguages.filter(lang => lang !== language)
    } else {
      updated = [...selectedLanguages, language]
    }
    setSelectedLanguages(updated)
    setFormData({
      ...formData,
      languages: updated,
    })
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-3xl font-bold text-gray-300">Pick Languages You Speak</h1>
      <p className="mb-8 text-gray-400">
        Tap on the languages below to select the ones you can speak
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {NIGERIAN_LANGUAGES.map(language => (
          <button
            key={language}
            onClick={() => handleToggleLanguage(language)}
            className="rounded-full border px-4 py-2 font-medium transition-all"
            style={{
              backgroundColor: selectedLanguages.includes(language) ? '#32cd32' : '#1a1a1b',
              color: selectedLanguages.includes(language) ? '#0f0f10' : '#e0e0e0',
              borderColor: selectedLanguages.includes(language) ? '#32cd32' : '#404040',
            }}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  )
}
