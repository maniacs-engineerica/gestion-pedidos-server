import multer from 'multer'
import fs from 'fs';
import path from 'path';
import util from 'util';

class FileError {
  constructor(message, description) {
    this.message = message
    this.description = description
  }
}

export function createUploader(destinationPath) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(destinationPath, { recursive: true })
      cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  return multer({ storage: storage })
}

export async function getAllFiles(directoryPath) {
  try {
    const readdir = util.promisify(fs.readdir);
    const names = await readdir(directoryPath)
    return names
  } catch (e) {
    throw FileError("Could not get files", e.message);
  }
}
