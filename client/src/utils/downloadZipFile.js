export const downloadZipFile = async() => {
    const url = `http://localhost:3000/download-zip-buffer`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IdCards.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};