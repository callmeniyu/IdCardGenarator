import React from "react"
import { FaIdCardAlt } from "react-icons/fa"
import { IoLogoGithub } from "react-icons/io5";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="navbar flex justify-between px-9 py-1 h-20 items-center bg-slate-900 text-white w-full">
            <div className="nav-logo flex gap-3 items-center cursor-pointer">
                <FaIdCardAlt className="text-5xl text-white"/>
                <div className="nav-logo-text flex-col text-white text-sm">
                    <h4 className="font-semibold">IdCard Generator</h4>
                    <p className="text-xs text-green-600">Beta 3.2</p>
                </div>
            </div>
            <Link to="/github.com" className="font-semibold flex gap-2 rounded-md bg-white p-2  text-black cursor-pointer">
                <IoLogoGithub className="text-2xl"/>
                Source
            </Link>
        </div>
    )
}

export default Navbar
