import React, { useEffect } from 'react'
import SignupPage from '../SignupPage'
import SignupNav from '../SignupNav'

function ClientSignup() {
  useEffect(() => {
    document.title = 'Sign In | Workifyy'
  }, [])

  // 👇 define navigation items here
  const ClientFormNav = [
    { name: 'Home', to: '/' },

    { name: 'Join as Professional', to: '/auth/ProfessionalSignup' },
  ]

  return (
    <div>
      <SignupPage role="client" />
    </div>
  )
}

export default ClientSignup
