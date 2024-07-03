const mongoose = require("mongoose");
const MagicMoverSchema = new mongoose.Schema({
    weightLimit: {
        type: Number,
        required: true
    },
    energy: {
        type: Number,
        required: true
    },
    itemsCarried: [{ type: mongoose.Schema.Types.Mixed, ref: 'MagicItem' }],
    currentState: {
        type: String,
    },
},
    { timestamps: true }
);

const MagicMover = mongoose.model("MagicMover", MagicMoverSchema);
module.exports = MagicMover;
