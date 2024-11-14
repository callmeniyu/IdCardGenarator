import React, { useState } from "react"
import { Sidebar } from "primereact/sidebar"
import spreadsheet from "../assets/Images/spreadsheet_img.png"
import docx from "../assets/Images/docx_img.png"
import result from "../assets/Images/result_img.png"
const Guideline = ({ visible, setVisible }) => {
    return (
        <div className="card flex justify-content-center overflow-hidden">
            <Sidebar
                visible={visible}
                onHide={() => setVisible((prev) => !prev)}
                fullScreen
                className=" py-5 px-8 overflow-hidden"
            >
                <h2 className="font-bold text-3xl text-center pb-4">Guidelines</h2>
                <div className="guideline-main overflow-hidden">
                    <ol>
                        <li>1. Make sure your files contain no errors.</li>
                        <li>2. Remember to insert image directly into the cell.</li>
                        <li>3. Give column names in the spreadsheet in the word document inside brackets.</li>
                        <div className="guideline-img-conta flex gap-5 p-4">
                            <div className="spread-card">
                                <h4 className="font-semibold pb-2">Spreasheet</h4>
                                <img src={spreadsheet} alt="guideline-img" className="w-[16rem]" />
                            </div>
                            <div className="docx-card">
                                <h4 className="font-semibold pb-2">Word Template</h4>
                                <img src={docx} alt="guideline-img" className="w-[16rem]" />
                            </div>
                            <div className="docx-card">
                                <h4 className="font-semibold pb-2">Result</h4>
                                <img src={result} alt="guideline-img" className="w-[16rem]" />
                            </div>
                        </div>
                        <li>4. Missing of any attribute in any document will leads to error.</li>
                    </ol>
                </div>
            </Sidebar>
        </div>
    )
}
export default Guideline
