import mongoose from "mongoose";

const CleaningLogSchema = new mongoose.Schema({
    area: String,
    cleaner: String,
    timeStamp: { type: Date, default: Date.now },
    vocLevel: Number,
    waterUsed: Number,
    chemicalUsed: Number,
    tools: [String],
    conditions: {
        humidity: Number,
        temperature: Number,
    },
    blockchainHash: String,
});

export default mongoose.models.CleaningLog || mongoose.model("CleaningLog", CleaningLogSchema);