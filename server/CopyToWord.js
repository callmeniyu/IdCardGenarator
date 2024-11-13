import path from "path"
import fs from "fs"
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"
import ImageModule from "docxtemplater-image-module-free";

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const copyingToWordCard = async (IdData, i) => {
    try {
        
        const cardTemplatePath = path.resolve(__dirname,"public/files", "idCard_template.docx");
        const content = fs.readFileSync(cardTemplatePath, "binary");

        const zip = new PizZip(content);

        // Configure image module
        const imageOptions = {
            centered: false,   // Center the image in the placeholder
            getImage: function (tagValue) {
                // tagValue is the path to the image file
                return fs.readFileSync(tagValue); // Read image as buffer
            },
            getSize: function () {
                return [230, 230]; // Specify width and height in pixels (adjust as needed)
            },
        };

        const imageModule = new ImageModule(imageOptions);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [imageModule], // Use the image module
        });

        doc.setData(IdData);

        // Render document with the image
        doc.render();

        const buffer = doc.getZip().generate({ type: "nodebuffer" });

        const outputPath = path.resolve(__dirname, "output", `student${i}.docx`);

        fs.writeFileSync(outputPath, buffer);

        console.log(`Document generated and saved at ${outputPath}`);
    } catch (error) {
        console.error("Error copying data to Word:", error);
    }
};