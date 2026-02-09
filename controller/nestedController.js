import Nested from "../models/nestedModel.js";

export const createNestedItem = async (req, res) => {
    try {

        const { name, type, parentId, isStatic, fileId, mimetype, filename, size } = req.body;

        const items = Nested.create({
            name: name,
            type: type,
            parentId: parentId || null,
            isStatic: isStatic || false,
            fileId: fileId || null,
            mimetype: mimetype || null,
            filename: filename || null,
            size: size || null
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
        const item = await Nested.findById(id);

        if (!item) {
            return res.json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, item: item });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}