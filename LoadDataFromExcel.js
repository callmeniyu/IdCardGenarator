import path from "path"
import ExcelJS from "exceljs"
import fs from "fs"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export const LoadDataFromExcel = async () => {
    let studentData = []

    const spreadsheetPath = path.resolve(__dirname, "spreadsheet.xlsx");
    const imagesDir = path.join(__dirname, "Images");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(spreadsheetPath);

    const worksheet = workbook.getWorksheet(1); // Assuming data is on the first sheet

    // Accessing image data and skipping the header row
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip the first row (header row)

        const name = row.getCell(1).value;
        const college = row.getCell(2).value;

        // Check if an image exists for this row
        const image = worksheet.getImages().find((img) => img.range.tl.nativeRow === rowNumber - 1);
        
        let imagePath = null;
        if (image) {
            const imageData = workbook.getImage(image.imageId);
            imagePath = path.join(imagesDir, `Student${image.imageId}.png`);

            // Save the image if needed
            fs.writeFileSync(imagePath, imageData.buffer);
        }

        // Push unique student data once per row
        studentData.push({
            name,
            college,
            image: imagePath,
        });
    });
    return studentData
};