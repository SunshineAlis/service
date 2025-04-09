
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cloudinaryModule from "cloudinary";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cloudinary = cloudinaryModule.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const upload = multer({ dest: path.join(__dirname, "../tmp") });

const imageRouter = express.Router();

const CoverImageStore = {};

imageRouter.post("/", upload.single("cover"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send({ error: "No file uploaded" });

        const ext = path.extname(req.file.originalname).toLowerCase();
        const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        if (!allowed.includes(ext)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).send({ error: "Invalid file type" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "covers",
            public_id: uuidv4(),
            overwrite: true
        });

        fs.unlinkSync(req.file.path);

        const pages = req.body.page?.split(",") || [];
        pages.forEach(page => {
            CoverImageStore[page] = result.secure_url;
        });

        res.send({
            url: result.secure_url,
            pages
        });
    } catch (error) {
        console.error("Upload error:", error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send({ error: "Internal server error" });
    }
});
imageRouter.get("/:page", (req, res) => {
    const { page } = req.params;
    const url = CoverImageStore[page];

    if (!url) {
        const fallback = cloudinary.url("default-cover.jpg", {
            secure: true,
            transformation: [{ width: 1200, height: 630, crop: "fill" }]
        });
        return res.send({ url: fallback });
    }

    res.send({ url });
});

export default imageRouter;
