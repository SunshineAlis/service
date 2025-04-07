import cloudinary from "cloudinary";
import { Readable } from "stream";
import fs from "fs";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFromBuffer = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: "image", folder },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};

const uploadFromPath = async (filePath, folder) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, { folder });
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload from path error:", error);
        throw error;
    }
};

export const uploadImage = async (input, folder = "food_images") => {
    try {
        if (Buffer.isBuffer(input)) {
            return await uploadFromBuffer(input, folder);
        } else if (typeof input === "string") {
            return await uploadFromPath(input, folder);
        } else {
            throw new Error("Invalid input type. Expected Buffer or file path.");
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};



