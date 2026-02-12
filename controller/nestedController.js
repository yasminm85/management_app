import Nested from "../models/nestedModel.js";
import mongoose from "mongoose";
const GridFSBucket = mongoose.mongo.GridFSBucket;

export const createNestedItem = async (req, res) => {

    try {

        const { name, type, parentId, isStatic, mimetype, filename, size, tanggal_folder, tanggal_file } = req.body;

        let fileNestedId = null;

        if (req.file) {
            const bucket = new GridFSBucket(mongoose.connection.db);

            const uploadStream = bucket.openUploadStream(req.file.originalname, {
                contentType: req.file.mimetype
            });

            uploadStream.end(req.file.buffer);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', () => {
                    fileNestedId = uploadStream.id;
                    resolve();
                });
                uploadStream.on('error', reject);
            });
        }

        const items = Nested.create({
            name: name,
            type: type,
            parentId: parentId || null,
            isStatic: isStatic || false,
            fileId: fileNestedId || null,
            tanggal_folder: tanggal_folder || null,
            tanggal_file: tanggal_file || null,
            mimetype: req.file.mimetype || null,
            filename: req.file.originalname || null,
            size: req.file.size || null
        });



        res.status(201).json({ success: true, message: 'Nested item created successfully', item: items });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllItems = async (req, res) => {
    try {
        const items = await Nested.find();
        res.status(200).json({ success: true, items: items });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Nested.find({
            parentId: id,
            type: 'file'
        }).sort({ createdAt: -1 });

        if (!item) {
            return res.json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, item: item });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getFile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid file id');
        }

        const bucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db
        );

        const fileId = new mongoose.Types.ObjectId(id);

        const files = await mongoose.connection.db
            .collection('fs.files')
            .find({ _id: fileId })
            .toArray();

        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }

        const file = files[0];

        res.writeHead(200, {
            "Content-Type": file.contentType || "application/pdf",
            "Content-Disposition": `inline; filename="${file.filename}"`,
            "Accept-Ranges": "bytes",
        });

        bucket.openDownloadStream(fileId).pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving file');
    }
};