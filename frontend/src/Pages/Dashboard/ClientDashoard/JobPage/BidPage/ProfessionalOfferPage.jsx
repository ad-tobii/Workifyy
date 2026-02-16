import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, StarHalf } from 'lucide-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const ProfessionalOfferPage = () => {
  const navigate = useNavigate()
  const [currentReview, setCurrentReview] = useState(0)
  const [currentPortfolio, setCurrentPortfolio] = useState(0)
  const [isPausedReview, setIsPausedReview] = useState(false)
  const [isPausedPortfolio, setIsPausedPortfolio] = useState(false)

  // Sample data - replace with your actual data
  const professional = {
    name: 'Sarah Mitchell',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    totalReviews: 127,
  }

  const reviews = [
    {
      id: 1,
      client: 'Michael Chen',
      rating: 5,
      text: 'Exceptional work! Delivered ahead of schedule and exceeded expectations. Would definitely hire again.',
      date: '2 weeks ago',
      job: 'Website Redesign',
    },
    {
      id: 2,
      client: 'Emma Rodriguez',
      rating: 5,
      text: 'Professional, responsive, and incredibly talented. Transformed our brand identity completely.',
      date: '1 month ago',
      job: 'Brand Identity',
    },
    {
      id: 3,
      client: 'James Wilson',
      rating: 4,
      text: 'Great communication throughout. Minor revisions needed but overall very satisfied with the outcome.',
      date: '2 months ago',
      job: 'Mobile App UI',
    },
  ]

  const portfolio = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      title: 'E-commerce Platform',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=600&fit=crop',
      title: 'Dashboard Design',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      title: 'Mobile App',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
      title: 'Brand Identity',
    },
  ]

  const bid = {
    price: 2850,
    message:
      "I've reviewed your project requirements and I'm confident I can deliver exactly what you need. With 8+ years of experience in similar projects, I'll ensure a smooth process from start to finish. My approach includes weekly check-ins and unlimited revisions until you're 100% satisfied.",
  }

  const nextReview = () => {
    setCurrentReview(prev => (prev + 1) % reviews.length)
    setIsPausedReview(true)
    setTimeout(() => setIsPausedReview(false), 5000) // Resume after 5s
  }

  const prevReview = () => {
    setCurrentReview(prev => (prev - 1 + reviews.length) % reviews.length)
    setIsPausedReview(true)
    setTimeout(() => setIsPausedReview(false), 5000)
  }

  const nextPortfolio = () => {
    setCurrentPortfolio(prev => (prev + 1) % portfolio.length)
    setIsPausedPortfolio(true)
    setTimeout(() => setIsPausedPortfolio(false), 5000)
  }

  const prevPortfolio = () => {
    setCurrentPortfolio(prev => (prev - 1 + portfolio.length) % portfolio.length)
    setIsPausedPortfolio(true)
    setTimeout(() => setIsPausedPortfolio(false), 5000)
  }

  // Auto-advance reviews every 5 seconds
  useEffect(() => {
    if (isPausedReview) return
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPausedReview, reviews.length])

  // Auto-advance portfolio every 4 seconds
  useEffect(() => {
    if (isPausedPortfolio) return
    const interval = setInterval(() => {
      setCurrentPortfolio(prev => (prev + 1) % portfolio.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPausedPortfolio, portfolio.length])

  const renderStars = rating => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-[#32cd32] text-[#32cd32]" />)
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-[#32cd32] text-[#32cd32]" />)
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#32cd32]/5 to-[#0f0f10] font-sans text-white">
      {/* Back Button */}
      <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-[#32cd32]"
        >
          <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section - Professional Profile */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            {/* Profile Picture */}
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full ring-2 ring-[#32cd32]/20 sm:h-32 sm:w-32">
                <img
                  src={professional.profilePic}
                  alt={professional.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-full bg-[#32cd32] px-3 py-1 text-sm font-bold text-[#0f0f10]">
                TOP PRO
              </div>
            </div>

            {/* Name and Rating */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {professional.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <div className="flex items-center gap-1">{renderStars(professional.rating)}</div>
                <span className="text-2xl font-bold text-[#32cd32]">{professional.rating}</span>
                <span className="text-gray-400">({professional.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8 px-4 pb-12 sm:px-6 lg:px-8">
        {/* Bid Offer Section */}
        <div className="rounded-2xl border border-[#32cd32]/20 bg-gradient-to-br from-[#1a1a1c] to-[#151517] p-6 shadow-xl shadow-[#32cd32]/5 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm uppercase tracking-wider text-gray-400">Bid Amount</p>
              <p className="text-4xl font-bold text-[#32cd32] sm:text-5xl">
                ${bid.price.toLocaleString()}
              </p>
            </div>
            <button className="rounded-xl bg-[#32cd32] px-8 py-4 text-lg font-bold text-[#0f0f10] shadow-lg shadow-[#32cd32]/20 transition-all duration-200 hover:scale-105 hover:bg-[#2eb82e]">
              Accept Bid
            </button>
          </div>

          {bid.message && (
            <div className="border-t border-gray-800 pt-6">
              <p className="mb-3 text-sm uppercase tracking-wider text-gray-400">
                Message from {professional.name.split(' ')[0]}
              </p>
              <p className="leading-relaxed text-gray-300">{bid.message}</p>
            </div>
          )}
        </div>

        {/* Client Reviews Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Client Reviews</h2>
              <p className="mt-1 text-sm text-gray-400">Reviews from past clients</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevReview}
                className="rounded-full p-2 text-gray-400 transition-all hover:text-[#32cd32]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextReview}
                className="rounded-full p-2 text-gray-400 transition-all hover:text-[#32cd32]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPausedReview(true)}
            onMouseLeave={() => setIsPausedReview(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map(review => (
                <div key={review.id} className="min-w-full">
                  <div className="rounded-xl border border-gray-800 bg-[#1a1a1c] p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-lg font-semibold">{review.client}</p>
                        <p className="text-sm text-gray-400">
                          {review.job} • {review.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-300">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review indicators */}
          <div className="flex justify-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReview(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentReview ? 'w-8 bg-[#32cd32]' : 'w-2 bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Portfolio Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Portfolio</h2>
              <p className="mt-1 text-sm text-gray-400">
                See pictures of {professional.name.split(' ')[0]}'s past work
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevPortfolio}
                className="rounded-full p-2 text-gray-400 transition-all hover:text-[#32cd32]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextPortfolio}
                className="rounded-full p-2 text-gray-400 transition-all hover:text-[#32cd32]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsPausedPortfolio(true)}
            onMouseLeave={() => setIsPausedPortfolio(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPortfolio * 100}%)` }}
            >
              {portfolio.map(item => (
                <div key={item.id} className="min-w-full">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-[#1a1a1c]">
                    <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-xl font-bold">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio indicators */}
          <div className="flex justify-center gap-2">
            {portfolio.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPortfolio(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentPortfolio
                    ? 'w-8 bg-[#32cd32]'
                    : 'w-2 bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalOfferPage
