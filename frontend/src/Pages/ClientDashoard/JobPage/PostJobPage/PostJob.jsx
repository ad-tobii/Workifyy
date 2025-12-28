import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'

export default function PostJobPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="w-[90%]">
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} />}
      {step === 3 && <Step3 setStep={setStep} />}
      {step === 4 && <Step4 setStep={setStep} />}
      {step === 5 && <Step5 setStep={setStep} />}
      {step === 6 && <Step6 />}
    </div>
  )
}
