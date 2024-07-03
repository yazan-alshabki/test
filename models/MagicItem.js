const mongoose = require("mongoose");
const MagicItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
}, { timestamps: true }
);
const MagicItem = mongoose.model("MagicItem", MagicItemSchema);
module.exports = MagicItem;
