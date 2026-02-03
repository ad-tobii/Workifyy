import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import { useEffect } from 'react'

const GuestRoute = ({ children }) => {
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const role = user.role
      navigate(`/dashboard/${role}dashboard`, { replace: true })
    }
  }, [user, navigate])

  if (user) return null // optionally a loader

  return children
}

export default GuestRoute
