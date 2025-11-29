import React from 'react'

const Step6 = ({ formData, updateFormData }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto mt-10 w-full max-w-xl px-4 duration-500 lg:mx-0 lg:mt-0 lg:px-0">
      <h3 className="mb-4 text-center text-4xl font-semibold text-zinc-300 lg:text-left">
        <span className="text-[#32cd32]">Almost</span> done! 🎉
      </h3>
      <h3 className=" mb-4 mt-10 text-center text-2xl font-semibold text-zinc-300 lg:mt-6 lg:text-left">
        Tell us about yourself
      </h3>
      <div className="mb-12 mt-8 flex flex-col items-center lg:items-start">
        <textarea
          value={formData.bio}
          onChange={e => updateFormData('bio', e.target.value)}
          placeholder="Write your bio…"
          rows={5}
          className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-zinc-200 placeholder-zinc-500 transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 lg:max-w-xl"
        />
        <div className="text-md mt-8 space-y-1 text-zinc-400">
          <p>• Keep it short</p>
          <p>• Highlight your strengths</p>
          <p>• Let clients know what makes you unique</p>
        </div>
      </div>
    </div>
  )
}

export default Step6