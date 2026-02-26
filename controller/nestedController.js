import Nested from "../models/nestedModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
const GridFSBucket = mongoose.mongo.GridFSBucket;
import { PDFDocument, rgb } from "pdf-lib";
import { nestedName } from "../helper/nestedName.js";
import { buildPath } from "../helper/buildPath.js";

export const createNestedItem = async (req, res) => {

    try {

        const { name, type, parentId, isStatic, tanggal_folder, tanggal_file, kategori_file } = req.body;

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

        const items = await Nested.create({
            name: name,
            type: type,
            parentId: parentId || null,
            isStatic: isStatic || false,
            fileId: fileNestedId || null,
            tanggal_folder: tanggal_folder || null,
            tanggal_file: tanggal_file || null,
            submitted_by: req.user.id,
            kategori_file: kategori_file || null,
            mimetype: req.file?.mimetype || null,
            filename: req.file?.originalname || null,
            size: req.file?.size || null
        });

        const itemsId = await Nested.findById(items._id)
            .populate("submitted_by", "name")
        res.status(201).json({ success: true, message: 'Nested item created successfully', items: itemsId });
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

export const renameNestedItem = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ success: false, message: "ID dan nama wajib" });
        }

        const updated = await Nested.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Folder tidak ditemukan" });
        }

        res.json({ success: true, item: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getFile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid file id");
        }

        const fileId = new mongoose.Types.ObjectId(id);

        const bucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db
        );

        const files = await mongoose.connection.db
            .collection("fs.files")
            .find({ _id: fileId })
            .toArray();

        if (!files || files.length === 0) {
            return res.status(404).send("File not found");
        }

        const gridFile = files[0];

        const fileMeta = await Nested.findOne({ fileId });

        if (!fileMeta) {
            return res.status(404).send("File metadata not found");
        }

        const folderPath = await nestedName(fileMeta.parentId);

        const chunks = [];
        const downloadStream = bucket.openDownloadStream(fileId);

        downloadStream.on("data", (chunk) => chunks.push(chunk));

        downloadStream.on("error", (err) => {
            console.error(err);
            res.status(500).send("Error reading file");
        });

        downloadStream.on("end", async () => {
            const pdfBytes = Buffer.concat(chunks);

            const isPdf = gridFile.filename.toLowerCase().endsWith(".pdf");

            if (!isPdf) {
                res.set({
                    "Content-Type": gridFile.contentType || "application/octet-stream",
                    "Content-Disposition": `inline; filename="${gridFile.filename}"`,
                });
                return res.send(pdfBytes);
            }

            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = pdfDoc.getPages();

            const folderPathText = folderPath.map(f => f.name).join(" / ");

            const user = await userModel
                .findById(req.user.id)
                .select("name");

            const downloadedBy = user?.name || "Unknown User";
            const submittedBy = fileMeta.submitted_by ? await userModel.findById(fileMeta.submitted_by).select("name") : null;
            const submittedByText = submittedBy ? `Submitted by: ${submittedBy.name}` : "Submitted by: Unknown";

            const footerText =
                `Lokasi Dokumen: ${folderPathText}  ` +
                `Downloaded by : ${downloadedBy}  ` +
                `${submittedByText}`


            pages.forEach((page) => {
                const { width } = page.getSize();

                page.drawText(footerText, {
                    x: 75,
                    y: page.getHeight() - 800,
                    size: 10,
                    color: rgb(0, 0, 0),
                });
            });

            const modifiedPdf = await pdfDoc.save();

            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${gridFile.filename}"`,
                "Accept-Ranges": "bytes",
            });

            res.send(Buffer.from(modifiedPdf));
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving file');
    }
};

export const updateNestedItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedItem = await Nested.findByIdAndUpdate(
            id,
            { name },
            { returnDocument: 'after' }
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, item: updatedItem });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteNestedItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await Nested.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllFiles = async (req, res) => {
    try {
        const { q } = req.query;

        const filter = {
            type: "file",
            ...(q && {
                name: { $regex: q, $options: "i" }
            })
        };

        const files = await Nested.find(filter).lean();

        const results = await Promise.all(
            files.map(async (file) => {
                const path = await buildPath(file.parentId);

                return {
                    fileId: file.fileId,
                    name: file.name,
                    parentId: file.parentId,
                    path
                };
            })
        );

        res.status(200).json({
            success: true,
            results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }


}

export const TotalFolderAndFile = async (req, res) => {
    try {
        const parentIds = [
            new mongoose.Types.ObjectId("6989547fa7f77cef4554db55"),
            new mongoose.Types.ObjectId("698956c3a7f77cef4554db5d"),
            new mongoose.Types.ObjectId("698956faa7f77cef4554db5f"),
            new mongoose.Types.ObjectId("698958a7a7f77cef4554db6b")
        ];

        const result = await Nested.aggregate([
            {
                $match: {
                    _id: { $in: parentIds },
                    type: "folder"
                }
            },

            {
                $graphLookup: {
                    from: "nesteds",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentId",
                    as: "descendants"
                }
            },

            {
                $lookup: {
                    from: "nesteds",
                    localField: "_id",
                    foreignField: "parentId",
                    as: "children",
                },
            },


            {
                $project: {
                    parentId: "$_id",
                    parentName: "$name",

                    totalFiles: {
                        $size: {
                            $filter: {
                                input: "$descendants",
                                as: "item",
                                cond: { $eq: ["$$item.type", "file"] }
                            }
                        }
                    },

                    totalFolders: {
                        $size: {
                            $filter: {
                                input: "$children",
                                as: "item",
                                cond: { $eq: ["$$item.type", "folder"] }
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json({ success: true, fileCount: result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const detectionFileCompleted = async (req, res) => {
    try {
        const REQUIRED_KATEGORI = [
            "Proposal Audit",
            "Surat Perintah Tugas",
            "Laporan Hasil Audit Sementara",
            "Laporan Hasil Audit Final",
            "Arahan DU ke Auditee",
            "Arahan DU ke Unit Terkait",
            "Kertas Kerja Audit",
            "Tindak Lanjut",
            "Lainnya",
        ];
        const { id } = req.params;

        const files = await Nested.find({
            parentId: id,
            type: "file"
        }).lean();

        const existingKategori = new Set(
            files
                .map(f => f.kategori_file)
                .filter(Boolean)
        );

        const status = REQUIRED_KATEGORI.map(kategori => ({
            kategori,
            fulfilled: existingKategori.has(kategori)
        }));

        res.status(200).json({ success: true, status });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};





