import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const skillsList = [
    "Web Development",
    "Graphic Design",
    "Data Analysis",
    "UI/UX Design",
    "SEO",
    "Content Writing",
    "Marketing",
  ];

  const statesList = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
    "Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina",
    "Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
    "Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT",
  ];

  const languagesList = ["Yoruba", "Hausa", "Igbo", "English", "Others"];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 4) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log({
        tagline: data.tagline,
        experience: data.experience,
        location: data.location,
        expertise: selectedSkills,
        languages: selectedLanguages,
        photo: selectedImage,
        bio: data.bio,
      });
      alert("Onboarding data collected! Check console.");
    }
  };

  useEffect(() => {
    document.title = "Onboarding | Workifyy";
  }, []);

  return (
    <main className="flex h-screen flex-col largeDesktop:flex-row">
      <div className="flex h-screen flex-grow flex-col bg-black largeDesktop:w-[30%]">
        <div className="flex flex-grow items-center overflow-y-auto">
          <div className="mx-auto max-w-md px-4 py-8">
            <div className="mb-8 flex items-center justify-center">
              {[1, 2, 3, 4].map((item, index) => (
                <React.Fragment key={item}>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step >= item ? "bg-[#32cd32] text-white" : "bg-gray-300 text-black"
                    }`}
                  >
                    {item}
                  </div>
                  {index < 3 && <div className="mx-2 h-[2px] w-8 bg-gray-300"></div>}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div>
                  <input
                    className="mb-4 w-full rounded bg-[#323439] p-3 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Enter your tagline"
                    {...register("tagline", { required: true })}
                  />
                  {errors.tagline && (
                    <span className="mb-4 block text-red-500">This field is required</span>
                  )}

                  <input
                    type="number"
                    className="mb-4 w-full rounded bg-[#323439] p-3 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Enter years of experience"
                    {...register("experience", { required: true })}
                  />
                  {errors.experience && (
                    <span className="mb-4 block text-red-500">This field is required</span>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="mb-4 block text-sm font-semibold text-white">
                    Fields of Expertise (Select up to 4)
                  </label>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillChange(skill)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                          selectedSkills.includes(skill)
                            ? "bg-[#32cd32] text-black"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <select
                    className="mb-4 w-full rounded bg-[#323439] p-2 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    {...register("location", { required: true })}
                  >
                    {statesList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <span className="mb-4 block text-red-500">Location is required</span>
                  )}

                  <div className="mb-6 flex flex-wrap gap-2">
                    {languagesList.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageChange(language)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                          selectedLanguages.includes(language)
                            ? "bg-[#32cd32] text-black"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 4 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 w-full text-white"
                  />
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="mb-4 h-20 w-20 rounded-full object-cover"
                    />
                  )}

                  <textarea
                    className="mb-4 h-32 w-full rounded bg-[#323439] p-2 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Write a short bio..."
                    {...register("bio", { required: true, maxLength: 200 })}
                  />
                  {errors.bio && (
                    <span className="mb-4 block text-red-500">
                      Bio is required and max 200 chars
                    </span>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Finish
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnboardingForm;
