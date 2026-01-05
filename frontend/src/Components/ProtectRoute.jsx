import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore.store'
import toast from 'react-hot-toast'

const ProtectRoute = ({ children, role }) => {
  const user = useUserStore(state => state.user)

  if (!user) {
    return <Navigate to="/auth/signin" replace />
  }

  if (role && user.role !== role) {
    toast.error(`Unauthorized. Sign in as a ${role} to access this page.`, { id: 'role-error' })
    return <Navigate to="/auth/signin" replace />
  }

  return <>{children}</>
}

export default ProtectRoute
