const services = [
  'Plumbing', 'Electrical', 'Painting', 'Carpentry', 'Tiling',
  'Roofing', 'Moving & Relocation', 'Cleaning', 'AC Repair', 'Welding',
  'Landscaping', 'Security Fitting', 'Generator Service', 'Fumigation',
]

export default function StepsSection() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#32CD32] py-5">
      <div className="inline-flex w-full flex-nowrap overflow-hidden">
        <ul className="flex animate-infinite-scroll items-center">
          {services.map((s, i) => (
            <li key={i} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap px-8 text-sm font-black uppercase tracking-[0.25em] text-black">
                {s}
              </span>
              <span className="text-black/30 text-xl font-bold">·</span>
            </li>
          ))}
        </ul>
        <ul className="flex animate-infinite-scroll items-center" aria-hidden="true">
          {services.map((s, i) => (
            <li key={i} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap px-8 text-sm font-black uppercase tracking-[0.25em] text-black">
                {s}
              </span>
              <span className="text-black/30 text-xl font-bold">·</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
