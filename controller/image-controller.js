import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "https://blogwebsite77.herokuapp.com";

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
    gfs = new grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
});

export const uploadImage = (request, response) => {
    if (!request.file) return response.status(404).json("File not found");

    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({
            filename: request.params.filename,
        });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
    } catch (error) {
        console.log(error);
    }
};
