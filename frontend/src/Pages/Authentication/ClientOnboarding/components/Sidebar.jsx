export default function OnboardingSidebar({ steps, currentStep }) {
  return (
    <div
      className="flex h-screen flex-col border-r"
      style={{ backgroundColor: '#0f0f10', borderColor: '#2a2a2b' }}
    >
      {/* Logo */}
      <div className="border-b p-8" style={{ borderColor: '#2a2a2b' }}>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold"
            style={{ backgroundColor: '#32cd32', color: '#0f0f10' }}
          >
            W
          </div>
          <span className="text-xl font-bold text-white">workifyy.</span>
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="flex flex-1 flex-col p-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {/* Vertical Line */}
            {index < steps.length - 1 && (
              <div
                className="absolute left-4 top-12 h-12 w-0.5"
                style={{ backgroundColor: currentStep > step.id ? '#32cd32' : '#2a2a2b' }}
              />
            )}

            {/* Step Circle & Content */}
            <div className="z-10 flex gap-4">
              <div
                className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: currentStep >= step.id ? '#32cd32' : '#2a2a2b',
                  color: currentStep >= step.id ? '#0f0f10' : '#666',
                }}
              >
                {step.icon}
              </div>
              <div className="pb-8">
                <p className="text-sm font-medium text-gray-400">{step.label}</p>
                <p
                  className={currentStep === step.id ? 'font-semibold text-white' : 'text-gray-600'}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
