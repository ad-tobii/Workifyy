import React, { useCallback } from 'react'

const Step3 = ({ formData, updateFormData }) => {
  const selected = formData.expertise || []
  const toggleSkill = useCallback(
    skill => {
      const newSkills = selected.includes(skill)
        ? selected.filter(s => s !== skill)
        : [...selected, skill]
      updateFormData('expertise', newSkills)
    },
    [selected, updateFormData]
  )

  const blueCollarSkills = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Bricklayer',
    'Painter',
    'AC Technician',
    'Mechanic',
    'Solar Installer',
    'Welder',
    'Operator',
    'Technician',
    'Cleaner',
    'Interior Designer',
    'Hairdresser',
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto mt-10 w-full max-w-xl p-4 duration-500 lg:mx-0 lg:mt-0 lg:px-0">
      <h3 className="mb-4 text-center text-2xl font-semibold text-zinc-300 lg:text-left">
        Pick Your Skills / Expertise
      </h3>
      <p className="mb-6 text-center text-sm text-zinc-400 lg:text-left">
        Tap on the skills below to select your areas of expertise
      </p>
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        {blueCollarSkills.map(skill => {
          const isSelected = selected.includes(skill)
          return (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-zinc-300 transition-colors duration-200 ${
                isSelected
                  ? 'border-green-500 bg-[#32cd32] text-white'
                  : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {skill}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Step3