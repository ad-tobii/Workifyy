import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const Sidebar = ({ currentStep, steps }) => {
  return (
    <div className="hidden h-full w-80 flex-col border-r border-zinc-800 bg-[#0f0f10] p-8 lg:flex">
      {/* Brand / Logo Area - Starts at top padding */}
      <div className="mb-12 flex items-center gap-2">
        <img src="/assets/workifyy-logo.png" className="w-40" />
      </div>

      {/* Vertical Stepper */}
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isActive = step.id === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="relative flex gap-4">
              {!isLast && (
                <div
                  className={`absolute left-[15px] top-8 h-full w-[2px] -translate-x-1/2 ${
                    isCompleted ? 'bg-[#32cd32]' : 'bg-zinc-800'
                  }`}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? 'border-[#32cd32] bg-[#32cd32] text-white'
                      : isCompleted
                        ? 'border-[#32cd32] bg-[#0f0f10] text-[#32cd32]'
                        : 'border-zinc-700 bg-[#0f0f10] text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <div className="h-12"></div>
              </div>
              <div
                className={`pb-8 pt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}
              >
                <h4
                  className={`text-sm font-semibold ${isActive || isCompleted ? 'text-white' : 'text-zinc-500'}`}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-500">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
