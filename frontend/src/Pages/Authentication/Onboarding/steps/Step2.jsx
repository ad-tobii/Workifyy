import React from 'react'

const Step2 = ({ formData, updateFormData }) => {
  const value = formData.experienceYears
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mx-8 mt-16 flex flex-col items-center sm:mt-32 lg:mx-0 lg:mt-0 lg:items-start">
        <h3 className="mb-2 text-center text-xl text-zinc-400 lg:text-left">
          How many years of experience do you have?
        </h3>
        <p className="mb-8 mt-10 text-3xl text-zinc-400">
          <span className="text-[#32cd32]">{value !== 30 ? value : '30+'}</span> Years
        </p>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={value}
          onChange={e => updateFormData('experienceYears', Number(e.target.value))}
          className="mb-16 h-2 w-full max-w-sm cursor-pointer rounded-lg bg-zinc-800 accent-[#32cd32] transition-all hover:brightness-110"
        />
      </div>
    </div>
  )
}

export default Step2