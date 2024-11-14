import React from "react"

const Button = ({handleSubmit}) => {
    return (
        <div className="button" onClick={handleSubmit}>
            <button className="bg-slate-900 text-white text-lg p-2 px-3 rounded-md font-semibold border-none cursor-pointer">Generate ID Card</button>
        </div>
    )
}

export default Button
