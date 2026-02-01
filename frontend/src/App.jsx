import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './styles/index.css'

// Pages
import Home from './Pages/Home/Home'
import NotFound from './Components/NotFound'
import SignupOptions from './Pages/Authentication/SignupOptions/Signup'
import Signin from './Pages/Authentication/Signin/Signin'
import Otp from './Pages/Authentication/OTP/Otp'
import ClientSignup from './Pages/Authentication/Signup/SignupFormOptions/Clientsignup'
import ProfessionalSignup from './Pages/Authentication/Signup/SignupFormOptions/Professionalsignup'
import WelcomePage from './Pages/Authentication/Onboarding/WelcomePage'
import ProfessionalDashboard from './Pages/ProfessionalDashboard/ProfessionalDashboard'
import ProfessionalDasboardWrapper from './Pages/ProfessionalDashboard/ProfessionalDasboardWrapper'
import Onboarding from './Pages/Authentication/Onboarding/Onboarding'
import ClientOnboarding from './Pages/Authentication/ClientOnboarding/ClientOnboarding'
import ClientDashboard from './Pages/ClientDashoard/ClientDashboard'
import JobDetailsPage from './Pages/ProfessionalDashboard/JobDetailsPage/JobDetailsPage'

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
              <Route path="professionalDashboard" element={<ProfessionalDasboardWrapper />}>
                <Route
                  path=""
                  element={
                    <ProtectRoute role="professional" checkOnboarded={true}>
                      <ProfessionalDashboard />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="jobs/:jobId"
                  element={
                    <ProtectRoute role="professional" checkOnboarded={true}>
                      <JobDetailsPage />
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
// remove  all guards for the landing page
// form protection and validation app wide
// remove get me from log in and sign up
// To Do : implement loader for all screens.
// Find a better way to handle the geolocation, it keeps timing out n stuff.
// Job card : make it into it's own component
// Format numbers across the entire app to have commas
// pagination or view all jobs.
// Changing location should trigger new job fetch and delete old ones
// Need to move my listeners to a more global layout to prevent mounting and un mounting
// Rename your stores man, no need to write store twice
// your guards arent working
// UI error handling
// Basically sort out initial bids fetch and then handle updates with zustand
// Have to overtly request location permissions, and also you have to handle it better, louder.
//Bid cleanup : make it much better.... delete bids once rejected or accepted for professional or others
// Use Ui to diffrentiate between offers and bids.
// Need to ensure the whole bids=> ongoing jobs =>notification of rejected jobs works.
// Indicate price trend  negotiation trend on bid ui
