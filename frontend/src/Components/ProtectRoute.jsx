import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore.store'
import toast from 'react-hot-toast'

const ProtectRoute = ({ checkOnboarded, children, role }) => {
  const user = useUserStore(state => state.user)

  // 1. Basic Auth Check
  if (!user) {
    return <Navigate to="/auth/signin" replace />
  }

  // 2. Role Check
  if (role && user.role !== role) {
    toast.error(`Unauthorized. Sign in as a ${role} to access this page.`, { id: 'role-error' })
    return <Navigate to="/auth/signin" replace />
  }

  // 3. Onboarding Logic
  // If checkOnboarded is passed (true/false), it must match the user.isOnboarded state
  if (typeof checkOnboarded === 'boolean') {
    // Case: Route requires onboarding, but user hasn't done it
    if (checkOnboarded === true && !user.isOnboarded) {
      toast.error('Please complete your onboarding first.', { id: 'onboard-error' })
      return <Navigate to={`/onboarding/welcome`} replace />
    }

    // Case: Route is ONLY for non-onboarded people (like the onboarding page itself),
    // but user is ALREADY onboarded. Bounce them to their dashboard.
    if (checkOnboarded === false && user.isOnboarded) {
      return <Navigate to="/auth/signin" replace />
      // GuestGuard at Signin will then handle the "Already Onboarded" redirect
    }
  }

  return <>{children}</>
}

export default ProtectRoute
