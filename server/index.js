import express from "express"
import bodyParser from "body-parser"
import path from "path"
import multer from "multer"
import { fileURLToPath } from "url"
import { LoadDataFromExcel } from "./LoadDataFromExcel.js"
import { copyingToWordCard } from "./CopyToWord.js"
import fs from "fs"
import cors from "cors"
import { zipDocxFiles } from "./zipDocxFiles.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(bodyParser.urlencoded({ extended: true }))

let studentDataToBeCopied = [];


const init = async () => {
    studentDataToBeCopied = await LoadDataFromExcel()
    studentDataToBeCopied.map(async(student,i) => {
        await copyingToWordCard(student,i)
    })
    await zipDocxFiles()
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

app.post('/upload', upload.array('document', 10), async (req, res) => {
    await init();

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
    }
    res.send({status:200, message: "Files uploaded successfully"})
});

app.get('/download-zip-buffer', async (req, res) => {
    console.log("lllllll")
    try {
        const zipPath = path.join(__dirname, 'result', 'IdCards.zip');
        
        if (!fs.existsSync(zipPath)) {
            return res.status(404).send('ZIP file not found');
        }

        const zipBuffer = fs.readFileSync(zipPath);

        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="IdCards.zip"',
            'Content-Length': zipBuffer.length
        });
        res.send(zipBuffer);
    } catch (error) {
        console.error('Error in download route:', error);
        res.status(500).send('Server error');
    }
});


app.listen(3000,()=> {
    console.log("Server started on port 3000")
})
