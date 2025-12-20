const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0f0f10] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-[#32cd32]">404</h1>
        <p className="text-xl">Oops! Page not found.</p>
        <a
          href="/"
          className="mt-4 inline-block rounded-lg bg-[#32cd32] px-6 py-3 font-semibold text-black hover:bg-green-600"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
