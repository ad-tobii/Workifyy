import useUserStore from '../store/userStore.store'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const ClientGuard = ({ children }) => {
  const user = useUserStore(state => state.user)

  if (!user) {
    toast.error('Unauthorized. Redirecting to sign in page...')
    return <Navigate to="/auth/signin" replace />
  }
  if (user.role !== 'client') {
    toast.error('Unauthorized. Sign in as a client to access this page.')
    return <Navigate to="/dashboard/professionalDashboard" replace />
  }
  return <>{children}</>
}

export const ProfessionalGuard = ({ children }) => {
  const user = useUserStore(state => state.user)
  if (!user) {
    toast.error('Unauthorized. Redirecting to sign in page...')
    return <Navigate to="/auth/signin" replace />
  }
  if (user.role !== 'professional') {
    toast.error('Unauthorized. Sign in as a professional to access this page.')
    return <Navigate to="/dashboard/clientDashboard" replace />
  }
  return <>{children}</>
}
