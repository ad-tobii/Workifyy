const reviews = [
  {
    name: 'Amaka Okonkwo',
    role: 'Client · Lagos',
    text: 'Got 4 bids within 30 minutes of posting. Workifyy is a game-changer.',
  },
  {
    name: 'Emeka Adeyemi',
    role: 'Electrician · Professional',
    text: "I've doubled my monthly income since joining Workifyy. Highly recommend.",
  },
  {
    name: 'Tobi Lawson',
    role: 'Client · Abuja',
    text: 'The bidding system is brilliant. Real competition means better prices for me.',
  },
  {
    name: 'Chidi Nwachukwu',
    role: 'Plumber · Professional',
    text: "Jobs come to me now. I don't have to chase clients anymore.",
  },
  {
    name: 'Fatima Bello',
    role: 'Client · Kano',
    text: 'Transparent ratings made it easy to trust my hire. Excellent experience.',
  },
  {
    name: 'Seun Adeyinka',
    role: 'Painter · Professional',
    text: "The platform is clean, straightforward, and the clients are serious. Love it.",
  },
]

const ReviewCarousel = () => {
  return (
    <div className="border-t border-white/10 py-8 md:py-12">
      <div className="mb-5 px-5 sm:px-8 md:mb-8 md:px-16 lg:px-24">
        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/30 md:text-xs md:tracking-[0.3em]">
          What People Say
        </p>
      </div>
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_32px,_black_calc(100%-32px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex animate-infinite-scroll items-stretch gap-3 pr-3 md:gap-4 md:pr-4">
          {reviews.map((r, i) => (
            <li
              key={`a-${i}`}
              className="flex w-64 flex-shrink-0 flex-col justify-between rounded-2xl border border-white/10 p-5 md:w-72 md:rounded-none md:p-6"
            >
              <p className="text-sm leading-relaxed text-white/70">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">{r.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-white/30">{r.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="flex animate-infinite-scroll items-stretch gap-3 pr-3 md:gap-4 md:pr-4" aria-hidden="true">
          {reviews.map((r, i) => (
            <li
              key={`b-${i}`}
              className="flex w-64 flex-shrink-0 flex-col justify-between rounded-2xl border border-white/10 p-5 md:w-72 md:rounded-none md:p-6"
            >
              <p className="text-sm leading-relaxed text-white/70">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">{r.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-white/30">{r.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ReviewCarousel
