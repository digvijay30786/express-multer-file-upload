const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, callback) => {
        
        const encryptString = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, encryptString + file.originalname);
    }
});


const filter = (req,file,callback) => {
    
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
    {
        callback(null, true);
    }
    else
    {
        callback(null, false);
    }
}


module.exports = multer({
    storage: storage,
    fileFilter: filter,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});