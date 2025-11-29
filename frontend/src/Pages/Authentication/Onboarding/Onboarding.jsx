
import React, { useState, useCallback } from 'react'
import { ArrowLeft } from 'lucide-react'
import Sidebar from './Sidebar'
import { initialFormData, stepsConfig } from './constants'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const totalSteps = stepsConfig.length

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps))
  const handleBack = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = () => {
    console.log('Submission:', formData)
    const successMessage = `Submission successful!\nTag Line: ${formData.tagLine}\nCheck console for details.`
    const container = document.getElementById('message-box-container')
    if (container) {
      container.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                <div class="bg-zinc-900 p-8 rounded-xl shadow-2xl max-w-md w-full border border-green-500">
                    <h4 class="text-2xl font-bold text-green-400 mb-4">Onboarding Complete!</h4>
                    <pre class="whitespace-pre-wrap text-sm text-zinc-300">${successMessage}</pre>
                    <button onclick="document.getElementById('message-box-container').innerHTML = ''" class="mt-6 w-full py-2 bg-[#32cd32] rounded-lg text-white font-semibold hover:bg-green-600 transition">Close</button>
                </div>
            </div>
        `
    }
  }

  const renderStep = () => {
    const props = { formData, updateFormData }
    switch (step) {
      case 1:
        return <Step1 {...props} />
      case 2:
        return <Step2 {...props} />
      case 3:
        return <Step3 {...props} />
      case 4:
        return <Step4 {...props} />
      case 5:
        return <Step5 {...props} />
      case 6:
        return <Step6 {...props} />
      default:
        return <Step1 {...props} />
    }
  }

  const nextButtonAction = step === totalSteps ? handleSubmit : handleNext

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f10] font-sans text-white">
      {/* LEFT SIDEBAR: P-8 is the source of truth for alignment */}
      <Sidebar currentStep={step} steps={stepsConfig} />

      {/* RIGHT CONTENT AREA */}
      <main className="relative flex h-full flex-1 flex-col overflow-y-auto">
        <div id="message-box-container"></div>

        {/* MOBILE HEADER (Only < LG) */}
        <div className="px-4 pt-4 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`p-2 transition ${step === 1 ? 'cursor-default opacity-30' : 'rounded-full opacity-100 hover:bg-zinc-900'}`}
            >
              <ArrowLeft className="h-6 w-6 text-zinc-500" />
            </button>

            <div className="w-10"></div>
          </div>
          <div className="mx-auto mt-4 flex max-w-md justify-center">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`mx-0.5 mt-4 h-2 flex-1 rounded-xl transition-all duration-300 ${index < step ? 'bg-[#32cd32]' : 'bg-zinc-800'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* MAIN FORM CONTENT */}
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between lg:max-w-4xl">
          {/* LG:P-8 ADDED HERE 
              LG:MT-0 ADDED HERE
              This matches the Sidebar's p-8 exactly.
          */}
          <div className="mt-4 w-full md:mt-12 lg:mt-0 lg:p-8">{renderStep()}</div>

          {/* FOOTER BUTTONS */}
          <div className="mb-8 mt-8 flex items-center justify-between px-6 pb-8 lg:mt-0 lg:px-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`hidden rounded-lg px-6 py-3 font-medium text-zinc-400 transition hover:text-white lg:flex ${step === 1 ? 'invisible' : 'visible'}`}
            >
              Back
            </button>

            <button
              onClick={nextButtonAction}
              className="h-12 w-full rounded-3xl bg-[#32cd32] text-xl font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-600 disabled:opacity-50 lg:w-auto lg:px-12"
            >
              {step === totalSteps ? 'Complete Onboarding' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Onboarding
