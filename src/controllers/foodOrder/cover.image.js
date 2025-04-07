import cloudinary from "cloudinary";
import fs from "fs";
import multer from "multer";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


let coverImages = [];

const uploadImage = async (filePath, folder) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, { folder });
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error("Error uploading image to Cloudinary");
    }
};


export const coverImg = async (req, res) => {
    try {
        const imageUrl = await uploadImage(req.file.path, "admin_cover_images");
        coverImages.push({ page: req.body.page, url: imageUrl });
        res.send({ url: imageUrl });
    } catch (error) {
        res.status(500).send({ error: "Error uploading cover image" });
    }
};


export const getCoverImg = (req, res) => {
    const page = req.params.page;
    console.log("Current cover images:", coverImages);
    const coverImage = coverImages.find((img) => img.page === page);

    if (coverImage) {
        res.send({ url: coverImage.url });
    } else {
        console.log(`Image not found for page: ${page}`);
        res.status(404).send({ error: "Cover image not found" });
    }
};