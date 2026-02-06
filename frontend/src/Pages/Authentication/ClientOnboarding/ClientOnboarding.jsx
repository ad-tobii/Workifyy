import { useState } from 'react'
import useUserStore from '../../../store/useUserStore'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ClientOnboarding() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    photo: null,
    languages: [],
    latitude: null,
    longitude: null,
  })

  const onboardUser = useUserStore(state => state.onboardUser)
  const loading = useUserStore(state => state.loading.onboardUser)

  const steps = [
    { id: 1, label: 'Step 1', description: 'Profile Picture', icon: '👤' },
    { id: 2, label: 'Step 2', description: 'Languages', icon: '🗣️' },
    { id: 3, label: 'Step 3', description: 'Location', icon: '📍' },
  ]

  // Functional form for safer state updates
  const handleNext = async () => {
    if (currentStep === 3) {
      const result = await onboardUser(formData)
      if (result.success) {
        toast.success(result.successMessage)
        navigate('/Dashboard/clientDashboard')
      } else {
        toast.error(result.error)
      }
      return
    }
    setCurrentStep(s => Math.min(s + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep(s => Math.max(s - 1, 1))
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0f0f10' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-96">
        <Sidebar steps={steps} currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <MobileHeader currentStep={currentStep} totalSteps={steps.length} onBack={handleBack} />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 lg:py-0">
          <div className="w-full max-w-2xl">
            <div className="mx-auto max-w-xl">
              {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
              {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
              {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}

              {/* Next Button - Desktop */}
              <div className="mt-12 hidden lg:block">
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full rounded-full px-6 py-4 text-lg font-semibold transition-all"
                  style={{
                    backgroundColor: '#32cd32',
                    color: '#0f0f10',
                  }}
                >
                  {loading ? 'Processing...' : currentStep === 3 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Button */}
        <div className="p-4 lg:hidden">
          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full rounded-full px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: '#32cd32',
              color: '#0f0f10',
            }}
          >
            {loading ? 'Processing...' : currentStep === 3 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
