import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../Components/Nav'; // Assuming a generic Nav component

const SKILLS_LIST = [
  "Web Development", "Graphic Design", "Data Analysis", "UI/UX Design", 
  "SEO", "Content Writing", "Marketing", "Mobile Development", "Project Management"
];

const LOCATIONS_LIST = [
  "Lagos", "Abuja", "Rivers", "Kano", "Oyo", "Enugu", "Kaduna", "Delta" 
];

const EditProfessionalProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedSkills = watch('expertise', []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImagePreview(event.target?.result);
        setValue('photo', event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillChange = (skill) => {
    const currentSkills = selectedSkills || [];
    if (currentSkills.includes(skill)) {
      setValue('expertise', currentSkills.filter((s) => s !== skill), { shouldValidate: true });
    } else if (currentSkills.length < 4) {
      setValue('expertise', [...currentSkills, skill], { shouldValidate: true });
    } else {
      toast.error('You can select up to 4 skills.');
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (!data.expertise || data.expertise.length < 1) {
      toast.error('Please select at least one skill for expertise.');
      setIsLoading(false);
      return;
    }
    if (data.expertise.length > 4) {
      toast.error('You can select a maximum of 4 skills.');
      setIsLoading(false);
      return;
    }

    // For now just log form data
    console.log('Form submitted:', data);
    toast.success('Profile saved locally!');
    setIsLoading(false);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white shadow-xl rounded-xl">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Edit Professional Profile
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Tagline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline</label>
              <input type="text" {...register('tagline', { required: 'Tagline is required' })}
                className={`mt-1 input-class ${errors.tagline ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.tagline && <p className="error-text">{errors.tagline.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <input type="number" {...register('experience', { required: 'Experience is required', min: { value: 0, message: 'Experience cannot be negative' } })}
                className={`mt-1 input-class ${errors.experience ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.experience && <p className="error-text">{errors.experience.message}</p>}
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Expertise (Select up to 4)</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {SKILLS_LIST.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1.5 text-sm rounded-full font-semibold transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('expertise', { required: 'Please select at least one skill.', validate: value => value.length <= 4 || "Maximum 4 skills allowed." })} />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select {...register('location', { required: 'Location is required' })}
                className={`mt-1 input-class ${errors.location ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select Location</option>
                {LOCATIONS_LIST.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              {errors.location && <p className="error-text">{errors.location.message}</p>}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea {...register('Bio', { required: 'Bio is required', maxLength: { value: 500, message: "Bio cannot exceed 500 characters" } })}
                className={`mt-1 input-class h-32 ${errors.Bio ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.Bio && <p className="error-text">{errors.Bio.message}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <div className="mt-2 flex items-center space-x-4">
                {selectedImagePreview && (
                  <img src={selectedImagePreview} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover" />
                )}
                <input type="file" accept="image/*" id="photo-upload" className="hidden" onChange={handleImageChange} />
                <label htmlFor="photo-upload" className="cursor-pointer px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                  Change Photo
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button type="button" onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50">
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-class {
          appearance: none;
          border-radius: 0.375rem;
          display: block;
          width: 100%;
          padding: 0.75rem;
          border-width: 1px;
          color: #111827;
        }
        .input-class:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 2px #6366F1;
        }
        .error-text {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #EF4444;
        }
      `}</style>
    </>
  );
};

export default EditProfessionalProfile;
