import React from "react";

const ReviewCarousel = () => {
  const reviews = [
    {
      name: "John Doe",
      text: "Workifyy made hiring so easy and seamless!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      text: "Highly recommend this platform for professionals.",
      rating: 4,
    },
    {
      name: "Mike Johnson",
      text: "A game-changer for finding gigs in Nigeria.",
      rating: 5,
    },
    {
      name: "Sarah Brown",
      text: "The bidding system is truly unique and effective!",
      rating: 4,
    },
    {
      name: "Emily Davis",
      text: "I found the perfect job thanks to Workifyy!",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = rating;
    const emptyStars = 5 - rating;

    return (
      <div className="mb-2 flex justify-center text-xl text-yellow-500">
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={`full-${index}`}>&#9733;</span>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-28 relative overflow-hidden py-6">
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex animate-infinite-scroll">
          {reviews.map((review, index) => (
            <div
              key={`first-${index}`}
              className="mx-4 flex h-32 w-64 flex-shrink-0 flex-col items-center justify-between rounded-lg bg-[#1a1a1a] p-4 shadow-lg"
            >
              {renderStars(review.rating)}
              <p className="mb-2 text-center text-sm text-white">
                {review.text}
              </p>
              <p className="text-center text-xs font-semibold text-[#32cd32]">
                - {review.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex animate-infinite-scroll" aria-hidden="true">
          {reviews.map((review, index) => (
            <div
              key={`second-${index}`}
              className="mx-4 flex h-32 w-64 flex-shrink-0 flex-col items-center justify-between rounded-lg bg-[#1a1a1a] p-4 shadow-lg"
            >
              {renderStars(review.rating)}
              <p className="mb-2 text-center text-sm text-white">
                {review.text}
              </p>
              <p className="text-center text-xs font-semibold text-[#32cd32]">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
