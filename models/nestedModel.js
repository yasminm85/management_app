import mongoose from "mongoose";

const nestedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['folder', 'file'],
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nested",
        default: null, 
    },

    isStatic: {
        type: Boolean,
        default: false, 
    },

    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fs.files", 
        default: null,
    },

    mimetype: String,
    filename: String,
    size: Number,
}, { timestamps: true });

const Nested = mongoose.models.Nested || mongoose.model('Nested', nestedSchema);

export default Nested;