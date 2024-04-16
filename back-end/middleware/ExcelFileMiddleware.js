const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/assets/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check if file is excel
const isExcelFile = (file) => {
    const extname = path.extname(file.originalname).toLowerCase();
    return extname === '.xls' || extname === '.xlsx';
}

// Init upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file) {
            return cb(new Error('No file uploaded'));
        }
        if (!isExcelFile(file)) {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
}).single('excelFile');

// Middleware to handle file upload
const handleFileUpload = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Error uploading file', error: err.message });
        } else if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err.message });
        }
        next();
    });
}

module.exports = handleFileUpload;
