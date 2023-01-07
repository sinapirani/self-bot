export const TEXT_GENERATOR = {
  downloadLinkText: (uploadText: any, fileKey: any) => {
    return `
${`Upload To Server: 100% 🚀`}
➖➖➖➖➖➖➖
This is Download Link: ${process.env.BUCKET_URL}/${fileKey}
        `;
  },

  addAdmin: {
    accessDenied: "YOU DONT HAVE ADMIN ACCESS!",
    alreadyAdmin: "HE/SHE IS ALREADY AN ADMIN!",
    admined: "HE/SHE BECAME AN ADMINISTRATOR!",
    ERROR: "ERROR!",
    COMMANDS: {
      command: "~admins",
      add: {
        command: "-a",
        accessDenied: "YOU DONT HAVE ADMIN ACCESS TO ADD ADMINS!",
        ERROR: "ERROR IN ADD NEW ADMIN!",
        invalidAccess: "THE ACCESS TYPE IS INVALID!",
        admined: "HE/SHE BECAME AN ADMINISTRATOR!",
      },
    },
  },
};
