import { useNavigate } from "react-router-dom";

const JobButton = () => {
  const navigate = useNavigate();
  const handleJobPost = () => {
    navigate("/dashboard/clientdashboard/jobpost");
  };
  return (
    <button
      onClick={() => handleJobPost()}
      className="mb-2 mt-2 rounded bg-[#32cd32] px-2 py-2 text-white"
    >
      Post Job +
    </button>
  );
};

export default JobButton;
