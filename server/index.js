import express from "express"
import bodyParser from "body-parser"
import path from "path"
import multer from "multer"
import { fileURLToPath } from "url"
import { LoadDataFromExcel } from "./LoadDataFromExcel.js"
import { copyingToWordCard } from "./CopyToWord.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
app.use(bodyParser.urlencoded({ extended: true }))

let studentDataToBeCopied = [];

const init = async () => {
    studentDataToBeCopied = await LoadDataFromExcel()
    studentDataToBeCopied.map(async(student,i) => {
        await copyingToWordCard(student,i)
    })
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files'); 
    },
    filename: (req, file, cb) => {
        let fileName;
        if (path.extname(file.originalname) == ".docx") {
            console.log("docccccccc")
            fileName = "idCard_template.docx"
        } else if (path.extname(file.originalname) == ".xlsx") {
            console.log("xllll")
            fileName = "spreadsheet.xlsx"
        }
        cb(null, fileName); 
    },
});

const upload = multer({ storage });

app.post('/upload', upload.array('spreadsheet', 10), async (req, res) => {
    await init()
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send('File uploaded successfully');
});


app.listen(3000,()=> {
    console.log("Server started on port 3000")
})
