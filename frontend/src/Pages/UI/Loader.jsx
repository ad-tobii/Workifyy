function Loader() {
  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-full w-full items-center justify-center bg-black">
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
