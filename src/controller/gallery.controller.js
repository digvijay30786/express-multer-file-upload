const express = require('express');
const router = express.Router();
const fileSystem = require('fs');
const gallery = require('../model/gallery.model');
const upload = require('../midleware/fileUpload');
router.post('',upload.array('avatar',2), async (req, res) => {
    const filePath = req.files.map((file) => file.path);
    const postgallery = await gallery.create({
        'gallery': filePath,
        'user':req.body.user
    });
    res.status(201).json({ postgallery });
});

router.get('', async (req, res) => {
    const getgallery = await gallery.find().populate('user').lean().exec();
    res.status(200).json({ getgallery });
});

router.delete('/:id', async (req,res) => {
    const findGallery = await gallery.findById(req.params.id);
    if (findGallery)
      {
        findGallery.gallery.map((gallery) => {
            fileSystem.unlink(gallery, (err) => {
                if (err) {
                    return res.status(400).json({ "type": "error", "message": err.message });
                }
            });
        });
    }
    const deletegallery = await gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({deletegallery})
})

module.exports = router;