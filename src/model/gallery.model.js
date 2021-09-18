const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    gallery: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref:"guser", required: true }
});

module.exports = mongoose.model('gallery', gallerySchema);