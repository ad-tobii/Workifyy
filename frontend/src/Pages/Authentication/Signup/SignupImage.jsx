function SignupImage() {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-center">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <img
          src="/assets/clientsignup.png"
          alt="Clients"
          className="vecimg h-auto max-h-full w-full object-contain"
        />
        <div className="-mt-20 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">Find trusted professionals</h2>
          <p className="text-sm leading-relaxed text-blue-100">
            Discover skilled professionals near you at the best rates. Compare, hire, and get
            quality work done—fast, reliable, and hassle-free.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupImage
