import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import useJobStore from '../../../../store/jobStore.store'

export default function PostJobPage() {
  const loading = useJobStore(state => state.loading) // Hooking into global store state
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    budget: '',
    description: '',
    address: '',
    images: [],
    previews: [],
    scheduledAt: '',
  })

  return (
    <div className="relative w-[90%]">
      {/* 1. Loading Overlay Modal */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-all">
          <div className="flex w-[85%] max-w-sm flex-col items-center rounded-3xl bg-[#0f0f10] p-8 shadow-2xl">
            {/* Simple CSS Spinner */}
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-100 border-t-[#32cd32]"></div>

            <h2 className="mt-6 text-center text-xl font-bold text-[#32cd32]">
              Publishing Your Job
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We're uploading your images and pinpointing your location...
            </p>
          </div>
        </div>
      )}

      {/* 2. Step Rendering */}
      {step === 1 && <Step1 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 2 && <Step2 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 3 && <Step3 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 4 && <Step4 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 5 && <Step5 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 6 && <Step6 setStep={setStep} setFormData={setFormData} formData={formData} />}
      {step === 7 && <Step7 setFormData={setFormData} formData={formData} />}
    </div>
  )
}
