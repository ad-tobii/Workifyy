import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore.store'

function ProtectRoute({ children }) {
  const user = useUserStore(state => state.user)

  if (!user) {
    return <Navigate to="/auth/signin" replace />
  }

  return <>{children}</>
}

export default ProtectRoute
