const express = require('express');
const router = express.Router();
const user = require('../model/user.model');
const upload = require('../midleware/fileUpload');
const fileSystem = require('fs');

router.post('', upload.single('avatar'),async (req, res) => {
    const postUser = await user.create({
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'profile_pic':req.file.path
    });
    res.status(201).json({ postUser });
});

router.get('', async (req, res) => {
    const getUser = await user.find().lean().exec();
    res.status(200).send(getUser);
});

router.patch('/:id',upload.single('avatar'),async (req, res) => {


    const fetch = await user.findById(req.params.id);
    var updata = req.body;
    if (req.file) {
        fileSystem.unlink(fetch.profile_pic, (err) => {
            if (err) {
                return res.status(400).json({ "type": "error", "message": err.message });
            }
        });

        updata = {'profile_pic':req.file.path,...updata};
    }
    
    const updateUser = await user.findByIdAndUpdate(req.params.id,updata,{new:1});
    
    res.status(200).send(updateUser);
});

router.delete('/:id', async (req, res) =>
{
    const fetch = await user.findById(req.params.id);
    if (fetch) {
        fileSystem.unlink(fetch.profile_pic, (err) => {
            if (err) {
                return res.status(400).json({ "type": "error", "message": err.message });
            }
        });
    }
    const deleteUser = await user.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteUser);
});

module.exports = router;