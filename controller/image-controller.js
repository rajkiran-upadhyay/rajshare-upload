//callback functions run when an endpoint is hit and if you want to manipulate something(req obj) before callback use middleware
import File from "../models/file.js"
const BASE_URL = process.env.BASE_URL;
export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname
    }//no return then pending
    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `${BASE_URL}/file/${file._id}` });
        //server/file/file_id
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message })
    }
}

export const downloadImage = async (request, response) => {
    try {

        const file = await File.findById(request.params.fileId);
        file.downloadContent++;
        await file.save();
        response.download(file.path, file.name)

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message })



    }



}