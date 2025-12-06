export default function MobileHeader({ currentStep, totalSteps, onBack }) {
  return (
    <div className="border-b p-4" style={{ backgroundColor: '#0f0f10', borderColor: '#2a2a2b' }}>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onBack} className="text-xl text-gray-400">
          ←
        </button>
        <span className="text-sm text-gray-500">
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all"
            style={{
              backgroundColor: i < currentStep ? '#32cd32' : '#2a2a2b',
            }}
          />
        ))}
      </div>
    </div>
  )
}
