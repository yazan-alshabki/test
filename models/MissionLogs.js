const mongoose = require("mongoose");
const MissionLogsSchema = new mongoose.Schema({
    moverId: { type: mongoose.Schema.Types.ObjectId, ref: 'MagicMover' },
    state: {
        type: String
    },
    itemsLoaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
    itemsUnloaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
},
    { timestamps: true }
);
const MissionLogs = mongoose.model("MissionLogs", MissionLogsSchema);
module.exports = MissionLogs;
