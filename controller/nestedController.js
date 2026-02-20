import Nested from "../models/nestedModel.js";
import mongoose from "mongoose";
const GridFSBucket = mongoose.mongo.GridFSBucket;

export const createNestedItem = async (req, res) => {

    try {

        const { name, type, parentId, isStatic, tanggal_folder, tanggal_file } = req.body;

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
            mimetype: req.file?.mimetype || null,
            filename: req.file?.originalname || null,
            size: req.file?.size || null
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

// export const FolderTotal = async (req, res) => {
//     try {
//         const [folderCount] = await Promise.all([
//             Nested.aggregate([
//                 {
//                     $match: {
//                         parentId: {
//                             $in: [
//                                 new mongoose.Types.ObjectId("6989547fa7f77cef4554db55"),
//                                 new mongoose.Types.ObjectId("698956c3a7f77cef4554db5d"),
//                                 new mongoose.Types.ObjectId("698956faa7f77cef4554db5f"),
//                                 new mongoose.Types.ObjectId("698958a7a7f77cef4554db6b")
//                             ]
//                         }
//                     },
//                 },

//                 {
//                     $group: {
//                         _id: '$parentId',
//                         folderCount: { $sum: 1 },
//                     }
//                 },

//                 {
//                     $lookup: {
//                         from: "nesteds",
//                         localField: "_id",
//                         foreignField: "_id",
//                         as: "parent"
//                     }
//                 },

//                 {
//                     $project: {
//                         _id: 0,
//                         parentId: "$_id",
//                         Name: { $arrayElemAt: ["$parent.name", 0] },
//                         folderCount: 1
//                     }
//                 }
//             ]),
//         ]);

//         res.status(200).json({ success: true, folderCount: folderCount });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

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
                                input: "$descendants",
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

export const nestedName = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Nested.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $graphLookup: {
                    from: "nesteds",
                    startWith: "$parentId",
                    connectFromField: "parentId",
                    connectToField: "_id",
                    as: "ancestors",
                    depthField: "level"
                }
            }
        ]);

        if (!result.length) {
            return res.status(404).json({ message: "Folder not found" });
        }

        const folder = result[0];

        // urutkan dari root → parent
        const sortedAncestors = folder.ancestors
            .sort((a, b) => b.level - a.level)
            .map(a => ({
                _id: a._id,
                name: a.name
            }));

        res.json({
            current: {
                _id: folder._id,
                name: folder.name
            },
            path: [...sortedAncestors, { _id: folder._id, name: folder.name }]
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};