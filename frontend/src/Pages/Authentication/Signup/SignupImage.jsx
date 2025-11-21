export default function SignupImage() {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center">
      <div className="vecimg w-full ">
        <img src="/assets/clientsignup.png" alt="Credit Cards" />
      </div>

      {/* Text Section */}
      <div className="-mt-20 text-center text-white">
        <h2 className="mb-3 text-2xl font-bold">Find trusted professionals</h2>
        <p className="text-sm leading-relaxed text-blue-100">
          Discover skilled professionals near you at the best rates. Compare, hire, and get quality
          work done—fast, reliable, and hassle-free.
        </p>
      </div>
    </div>
  )
}
