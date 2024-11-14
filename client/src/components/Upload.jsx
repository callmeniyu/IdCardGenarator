import React, { useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { FileUpload } from "primereact/fileupload"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { Tag } from "primereact/tag"

export default function Upload({ type, filesArr, setFilesArr }) {
    const toast = useRef(null)
    const [totalSize, setTotalSize] = useState(0)
    const [doc, setDoc] = useState(null)
    const fileUploadRef = useRef(null)

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize
        let files = e.files
        let returnSpreadsheet = {
            spreadsheet: {
                file: files[0],
            },
        }
        let returnDoc = {
            docx: {
                file: files[0],
            },
        }
        let returnFile = type == "spreadsheet" ? returnSpreadsheet : returnDoc
        setFilesArr((prev) => (
            [...prev, returnFile]
        ))
        setTotalSize(_totalSize)
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0

        e.files.forEach((file) => {
            _totalSize += file.size || 0
            formData.append("files", file) // Append the file to the FormData object
            setFiles() // Add the file to the files array
            console.log("dsgfdh", formData)
        })

        setTotalSize(_totalSize)
        toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" })
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size)
        callback()
    }

    const onTemplateClear = () => {
        setTotalSize(0)
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options
        const value = totalSize / 10000
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : "0 B"

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgb(0,0,0,0.2",
                }}
            >
                {chooseButton}
                {cancelButton}
            </div>
        )
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex-col xs:w-52 md:w-72 lg:w-96 align-items-center flex-wrap border-2 border-gray-500">
                <div className="flex align-items-center" style={{ width: "40%" }}>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column px-10 xs:w-52 md:w-80 lg:w-96">
                <i
                    className={`pi ${type == "spreadsheet" ? "pi-table" : "pi-file-word"}  mt-3 p-5`}
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
                    {type === "spreadsheet" ? (
                        <p>
                            Drag and drop your <span className="font-bold">spreadsheet</span> here
                        </p>
                    ) : (
                        <p>
                            Drag and drop your <span className="font-bold">Docx</span> here
                        </p>
                    )}
                </span>
            </div>
        )
    }

    const chooseOptions = {
        icon: "pi pi-fw pi-images",
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined",
    }
    const uploadOptions = {
        icon: "pi pi-fw pi-cloud-upload",
        iconOnly: true,
        className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    }
    const cancelOptions = {
        icon: "pi pi-fw pi-times",
        iconOnly: true,
        className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    }

    return (
        <div className="upload-card">
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                multiple={false}
                accept={
                    type == "spreadsheet"
                        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                }
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
            />
        </div>
    )
}
