import React from "react"
import Upload from "./Upload"
import Button from "./Button"

const UploadSection = () => {
    return (
        <div className="uploadsection flex flex-col items-center">
            <div className="upload-fields flex gap-10 justify-center py-10">
                <Upload className="border-2 border-gray-500" type="spreadsheet" />
                <Upload type="docx" />
            </div>
            <Button />
        </div>
    )
}

export default UploadSection
