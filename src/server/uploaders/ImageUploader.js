import request from 'request-promise-native'

import AbstractUploader from "./AbstractUploader.js";
import FileError from '../errors/fileError.js';
import config from '../../../config.js';

export default class ImageUploader extends AbstractUploader {
    async upload(stream){
      const data = {
        method: "POST",
        url: `${config.fileStorageUrl}api/files/input`,
        formData: { image: stream }
      }
      try {
        const response = await request(data)
        const imageName = JSON.parse(response).filename
        return imageName
      } catch (error) {
        throw new FileError("error al subir la imagen", error.message)
      }
    }
  }