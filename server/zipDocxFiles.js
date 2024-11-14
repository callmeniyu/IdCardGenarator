
import path from "path"
import fs from "fs"
import PizZip from "pizzip"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const zipDocxFiles = async () => {
    const zip = new PizZip();
    
    const resultDir = path.join(__dirname, 'result');

    try {
        const outputDir = path.join(__dirname, 'output');
        const files = fs.readdirSync(outputDir);
        
        // Add each DOCX file to the zip
        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.docx') {
                const filePath = path.join(outputDir, file);
                const content = fs.readFileSync(filePath);
                zip.file(file, content);
            }
        }

        // Generate zip content
        const zipContent = zip.generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9 // Maximum compression
            }
        });

        // Save the zip file
        const zipPath = path.join(resultDir, 'IdCards.zip');
        fs.writeFileSync(zipPath, zipContent);
        
        console.log(`Zip file created successfully at: ${zipPath}`);
        return zipPath;
    } catch (error) {
        console.error('Error creating zip file:', error);
        throw error;
    }
}