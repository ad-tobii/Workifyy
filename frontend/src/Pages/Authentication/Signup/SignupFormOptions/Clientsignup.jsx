import { useEffect } from 'react'
import SignupPage from '../SignupPage'

function ClientSignup() {
  useEffect(() => {
    document.title = 'Sign Up | Workifyy'
  }, [])

  return <SignupPage role="client" />
}

export default ClientSignup
