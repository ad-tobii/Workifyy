import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './styles/index.css'

// Pages
import Home from './Pages/Home/Home'
import NotFound from './Components/NotFound'
import SignupOptions from './Pages/Authentication/SignupOptions/Signup'
import Signin from './Pages/Authentication/Signin/signin_user'
import Otp from './Pages/Authentication/OTP/Otp'
import ClientSignup from './Pages/Authentication/Signup/SignupFormOptions/Clientsignup'
import ProfessionalSignup from './Pages/Authentication/Signup/SignupFormOptions/Professionalsignup'
import WelcomePage from './Pages/Authentication/Onboarding/WelcomePage'
import ProfessionalDashboard from './Pages/ProfessionalDashboard/ProfessionalDashboard'
import Onboarding from './Pages/Authentication/Onboarding/Onboarding'
import ClientOnboarding from './Pages/Authentication/ClientOnboarding/ClientOnboarding'
import ClientDashboard from './Pages/ClientDashoard/ClientDashboard'
// Route Wrappers
import GuestRoute from './Components/GuestRoute'
import SessionGate from './Components/SessionGate'
import ProtectRoute from './Components/ProtectRoute'

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <SessionGate>
          <Routes>
            {/* Public Home */}
            <Route path="/" element={<Home />} />

            {/* Auth Routes (Guest Only) */}
            <Route path="/auth">
              <Route
                path="signin"
                element={
                  <GuestRoute>
                    <Signin />
                  </GuestRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <GuestRoute>
                    <SignupOptions />
                  </GuestRoute>
                }
              />
              <Route
                path="ClientSignup"
                element={
                  <GuestRoute>
                    <ClientSignup />
                  </GuestRoute>
                }
              />
              <Route
                path="ProfessionalSignup"
                element={
                  <GuestRoute>
                    <ProfessionalSignup />
                  </GuestRoute>
                }
              />
              <Route
                path="otp"
                element={
                  <ProtectRoute>
                    <Otp />
                  </ProtectRoute>
                }
              />
            </Route>

            {/* Onboarding */}
            <Route path="/onboarding">
              <Route
                path="clientOnboarding"
                element={
                  <ProtectRoute role="client" checkOnboarded={false}>
                    <ClientOnboarding />
                  </ProtectRoute>
                }
              />
              <Route
                path="professionalOnboarding"
                element={
                  <ProtectRoute role="professional" checkOnboarded={false}>
                    <Onboarding />
                  </ProtectRoute>
                }
              />
              <Route
                path="welcome"
                element={
                  <ProtectRoute checkOnboarded={false}>
                    <WelcomePage />
                  </ProtectRoute>
                }
              />
            </Route>

            {/* Dashboards */}
            <Route path="/Dashboard">
              <Route path="professionalDashboard">
                <Route
                  path=""
                  element={
                    <ProtectRoute role="professional" checkOnboarded={true}>
                      <ProfessionalDashboard />
                    </ProtectRoute>
                  }
                />
              </Route>
            </Route>
            <Route path="/Dashboard">
              <Route path="clientdashboard">
                <Route
                  path=""
                  element={
                    <ProtectRoute role="client" checkOnboarded={true}>
                      <ClientDashboard />
                    </ProtectRoute>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionGate>
      </Router>
    </>
  )
}

export default App

// TO DO LIST
// role guard for the dashboards
