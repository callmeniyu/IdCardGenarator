import path from "path"
import ExcelJS from "exceljs"
import fs from "fs"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export const LoadDataFromExcel = async () => {
    let studentData = []

    const spreadsheetPath = path.resolve(__dirname, "public/files", "spreadsheet.xlsx");
    const imagesDir = path.join(__dirname,"public", "Images");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(spreadsheetPath);

    const worksheet = workbook.getWorksheet(1); // Assuming data is on the first sheet

    // Accessing image data and skipping the header row
    const headerRow = worksheet.getRow(1);

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip the first row (header row)

        const rowData = {};

        headerRow.eachCell((cell, colNumber) => {
            const header = cell.value;  // Get header name from the first row
            rowData[header] = row.getCell(colNumber).value;  // Assign cell value to the corresponding header name
        });


        // Check if an image exists for this row
        const image = worksheet.getImages().find((img) => img.range.tl.nativeRow === rowNumber - 1);
        
        let imagePath = null;
        if (image) {
            const imageData = workbook.getImage(image.imageId);
            imagePath = path.join(imagesDir, `Student${image.imageId}.png`);

            // Save the image if needed
            fs.writeFileSync(imagePath, imageData.buffer);
        }
        rowData.image = imagePath;
        // Push unique student data once per row
        studentData.push(rowData);
    });
    return studentData
};