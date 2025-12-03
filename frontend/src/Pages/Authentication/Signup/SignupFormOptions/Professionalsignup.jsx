import React, { useEffect } from 'react'
import SignupPage from '../SignupPage'

function Professionalsignup() {
  useEffect(() => {
    document.title = 'Sign In | Workifyy'
  }, [])

  return (
    <div>
      <SignupPage role="professional" />
    </div>
  )
}

export default Professionalsignup
