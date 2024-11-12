import express from "express"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import { LoadDataFromExcel } from "./LoadDataFromExcel.js"
import { copyingToWordCard } from "./CopyToWord.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(bodyParser.urlencoded({ extended: true }))

let studentDataToBeCopied = [];

const init = async () => {
    studentDataToBeCopied = await LoadDataFromExcel()
    studentDataToBeCopied.map(async(student,i) => {
        await copyingToWordCard(student,i)
    })
};

init();

app.listen(3000, function () {
    console.log("Server started on port 3000")
})
