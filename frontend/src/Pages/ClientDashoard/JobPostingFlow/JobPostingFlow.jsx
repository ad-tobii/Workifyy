import { useState } from "react";
import JobTitleCategoryForm from "./JobTitleCategoryForm";
import JobLocationTimingForm from "./JobLocationTimingForm";
import JobBudgetAttachmentsForm from "./JobBudgetAttachmentsForm";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Navbar from "../Navbar";
import DashboardFooter from "../DashboardFooter";

const JobPostingFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    // category: "",
    description: "",
    location: "",
    isImmediate: false,
    startDate: "",
    deadline: "",
    budget: "",
    images: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleFormChange = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-8 rounded border-t-4 border-[#32cd32] bg-[#181819] p-7 text-white xsMobile:max-w-[18rem] xsMobile:p-12 miniMobile:max-w-[18rem] mobile:max-w-xs miniTablet:max-w-xs tablet:max-w-sm miniLaptop:max-w-lg laptop:max-w-lg desktop:max-w-lg largeDesktop:max-w-lg">
        {" "}
        {/* Text color set to white */}
        <div className="mb-6 flex items-center justify-between">
          <ArrowLeftIcon
            className={`h-6 w-6 ${step === 1 ? "hidden" : ""}`}
            onClick={handlePrevious}
          />
          <span className="font-semibold">
            Step <span className="text-[#32cd32]">{step}</span> of 3
          </span>
          <ArrowRightIcon
            className={`h-6 w-6 ${step === 3 ? "hidden" : ""}`}
            onClick={handleNext}
          />
        </div>
        {step === 1 && (
          <JobTitleCategoryForm
            formData={formData}
            handleChange={handleFormChange}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <JobLocationTimingForm
            formData={formData}
            handleChange={handleFormChange}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        )}
        {step === 3 && (
          <JobBudgetAttachmentsForm
            formData={formData}
            handleChange={handleFormChange}
            onBack={handlePrevious}
          />
        )}
      </div>
      <DashboardFooter />
    </div>
  );
};

export default JobPostingFlow;
