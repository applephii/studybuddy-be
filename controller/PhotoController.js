import express from 'express';
import multer from 'multer';
import { Photo } from '../model/Model.js';

const uploadPhoto = async (req, res) => {
    try {
        const { userId } = req.query.body;
        if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

        const blob = bucket.file(Date.now() + "-" + req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: req.file.mimetype,
        });

        blobStream.on("error", (err) => res.status(500).json({ msg: err.message }));

        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${blob.name}`;

            const photo = await Photo.create({
                url: publicUrl,
                userId,
            });

            res.status(201).json(photo);
        });

        blobStream.end(req.file.buffer);
    } catch (error) {

    }
}