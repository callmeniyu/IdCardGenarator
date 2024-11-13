import React from "react"
import Navbar from "../../components/Navbar"
import UploadSection from "../../components/UploadSection"
import About from "../../components/About"
import Footer from "../../components/Footer"

const Home = () => {
    return (
        <div>
            <Navbar />
            <UploadSection />
            <About />
            <Footer />
        </div>
    )
}

export default Home
