import { useEffect } from 'react'
import useUserStore from '../store/userStore.store'

const SessionGate = ({ children }) => {
  const sessionChecked = useUserStore(state => state.sessionChecked)
  const initSession = useUserStore(state => state.initSession)

  useEffect(() => {
    initSession()
  }, [initSession])

  if (!sessionChecked) {
    return <FullPageLoader />
  }

  return <>{children}</>
}

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f10]">
      {/* Spinner */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-b-transparent border-l-[#32cd32] border-r-transparent border-t-[#32cd32]"></div>

      {/* Text */}
      <div className="mt-4 text-lg font-semibold tracking-wide text-[#32cd32]">Loading...</div>
    </div>
  )
}

export default SessionGate
