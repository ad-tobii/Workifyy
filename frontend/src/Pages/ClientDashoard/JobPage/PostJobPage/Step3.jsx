const Step3 = ({ setStep }) => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Tell us about the job</h2>
      <p className="mb-6 text-gray-400">The more details, the better the offers</p>

      <textarea
        placeholder="Describe what needs to be done..."
        className="min-h-[140px] w-full rounded-xl border border-gray-700 bg-[#0f0f10] p-4 focus:border-[#32cd32] focus:outline-none"
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setStep(4)}
          className="rounded-xl bg-[#32cd32] px-6 py-3 font-medium text-black"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step3
