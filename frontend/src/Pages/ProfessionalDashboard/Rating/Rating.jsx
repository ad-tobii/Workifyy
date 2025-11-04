import { StarIcon } from "@heroicons/react/24/solid"; // Solid stars
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"; // Outlined stars
const Rating = ({ rating = 4.3 }) => {
  const totalStars = 5;
  const roundedRating = Math.round(rating); // Round to the nearest whole number

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < roundedRating ? (
            <StarIcon className="h-4 w-4 text-yellow-500" />
          ) : (
            <StarOutlineIcon className="h-4 w-4 text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
