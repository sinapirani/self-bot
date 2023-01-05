


export const TEXT_GENERATOR = {

    downloadLinkText: (uploadText:any,fileKey:any) => {
        return `
${uploadText}
➖➖➖➖➖➖➖
This is Download Link: ${process.env.BUCKET_URL}/${fileKey}
        `
    }

}