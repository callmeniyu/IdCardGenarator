import React, { useEffect, useRef, useState } from "react"
import Upload from "./Upload"
import Button from "./Button"
import Guideline from "./Guideline"
import axios from "axios"
import { Toast } from 'primereact/toast';


const UploadSection = () => {
    const [filesArr, setFilesArr] = useState([])
    const [visible, setVisible] = useState(false)
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Your file has been submitted', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Upload both files', life: 3000});
    }
    const handleClick = () => {
        setVisible((prev) => {
            return !prev
        })
    }
    
const downloadZipFile = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/download-zip-buffer`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IdCards.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

    const handleSubmit = async () => {
        if (filesArr.length == 2) {
            showSuccess()
        } else {
            showError()
            return
        }
        const formData = new FormData()

        filesArr.forEach((fileObj) => {
            if (fileObj.spreadsheet) {
                formData.append("document", fileObj.spreadsheet.file) // spreadsheet file
            }
            if (fileObj.docx) {
                formData.append("document", fileObj.docx.file) // docx file
            }
        })

        try {
            const response = await axios.post("${import.meta.env.VITE_BACKEND_URL}/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (response) {
                downloadZipFile()
            }
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="uploadsection flex flex-col  items-center ">
                        <Toast ref={toast} className="alert"/>
            <div className="upload-fields xs:flex xs:flex-col  sm:flex-row gap-10  justify-center py-10">
                <Upload
                    className="border-2 border-gray-500"
                    type="spreadsheet"
                    filesArr={filesArr}
                    setFilesArr={setFilesArr}
                />
                <Upload type="docx" filesArr={filesArr} setFilesArr={setFilesArr} />
            </div>
            <p className="text-gray-600 pb-3">
                Before uploading read the{" "}
                <span className="text-slate-950 underline cursor-pointer" onClick={handleClick}>
                    Guidelines.
                </span>
            </p>
            <Button handleSubmit={handleSubmit} />
            <Guideline visible={visible} setVisible={setVisible} />
        </div>
    )
}

export default UploadSection
