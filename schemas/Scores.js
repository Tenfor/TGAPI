const mongoose = require("mongoose");

const ScoreSchema = mongoose.Schema({
    playerName: {
        type: String,
        required:true
    },
    scores: {
        type: Number,
        required:true
    },
    date: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Scores", ScoreSchema);