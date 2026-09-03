import Main from "../components/landing/Main"
import Stats from "../components/landing/Stats"
import Features from "../components/landing/Features"
import Activity from "../components/landing/Activity"
import CTASection from "../components/landing/CTASection"

import NavBar from "../components/landing/NavBar"
import Footer from "../components/landing/Footer"

const LandingPage = () => {
  return (
    <>
        <NavBar />
        <Main />
        <Stats />
        <Features />
        <Activity />
        <CTASection />
        <Footer />
    </>
  )
}

export default LandingPage