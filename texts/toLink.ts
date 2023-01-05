


export const TEXT_GENERATOR = {

    downloadLinkText: (uploadText:any,fileKey:any) => {
        return `
${`Upload To Server: 100% 🚀`}
➖➖➖➖➖➖➖
This is Download Link: ${process.env.BUCKET_URL}/${fileKey}
        `
    }

}