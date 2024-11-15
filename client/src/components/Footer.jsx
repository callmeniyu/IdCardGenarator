import React from "react"
import { IoLogoGithub } from "react-icons/io5"
import { FaLinkedinIn } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="footer flex h-52 bg-slate-950 justify-center items-center">
            <div className="footer-social flex gap-3 justify-center items-center">
                <Link to="https://github.com/callmeniyu/IdCardGenarator.git">
                    <IoLogoGithub className="text-white text-3xl hover:scale-110 cursor-pointer transition duration-200 ease-in-out" />
                </Link>
                <Link to="https://www.linkedin.com/in/mohammed-niyas-071717248/">
                    <FaLinkedinIn className="text-white text-3xl hover:scale-110 cursor-pointer transition duration-200 ease-in-out" />
                </Link>
                <Link to="https://github.com/callmeniyu/IdCardGenarator.git">
                    <FaInstagram className="text-white text-3xl hover:scale-110 cursor-pointer transition duration-200 ease-in-out" />
                </Link>
            </div>
        </div>
    )
}

export default Footer
