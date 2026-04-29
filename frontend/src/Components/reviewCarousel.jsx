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
    <div className="border-t border-white/10 py-12">
      <div className="mb-8 px-8 md:px-16 lg:px-24">
        <p className="text-xs uppercase tracking-[0.3em] text-white/30">What People Say</p>
      </div>
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex animate-infinite-scroll items-stretch gap-4 pr-4">
          {reviews.map((r, i) => (
            <li
              key={`a-${i}`}
              className="flex w-72 flex-shrink-0 flex-col justify-between border border-white/10 p-6"
            >
              <p className="text-sm leading-relaxed text-white/70">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">{r.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-white/30">{r.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="flex animate-infinite-scroll items-stretch gap-4 pr-4" aria-hidden="true">
          {reviews.map((r, i) => (
            <li
              key={`b-${i}`}
              className="flex w-72 flex-shrink-0 flex-col justify-between border border-white/10 p-6"
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
