import { useEffect } from 'react'
import SignupPage from '../SignupPage'

function Professionalsignup() {
  useEffect(() => {
    document.title = 'Join as a Pro | Workifyy'
  }, [])

  return <SignupPage role="professional" />
}

export default Professionalsignup
