const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/assets/MailAttachments';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// Multer upload middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB for image
    files: 3, // Max number of files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  },
}).fields([{ name: 'image', maxCount: 1 }, { name: 'excel', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]);

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
  auth: {
    user: 'bonypatel810@gmail.com',
    pass: 'ilzt ubxj xenv smxh',
  },
});

// Send email function
const sendEmail = async (req, res) => {
  try {
    const { email, subject } = req.body;
    const attachments = [];

    // Attachments
    if (req.files['image']) {
      attachments.push({
        filename: req.files['image'][0].filename,
        path: req.files['image'][0].path,
      });
    }
    if (req.files['excel']) {
      attachments.push({
        filename: req.files['excel'][0].filename,
        path: req.files['excel'][0].path,
      });
    }
    if (req.files['pdf']) {
      attachments.push({
        filename: req.files['pdf'][0].filename,
        path: req.files['pdf'][0].path,
      });
    }

    // Email options
    const mailOptions = {
      from: 'bonypatel810@gmail.com',
      to: email,
      subject: subject,
      attachments: attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  upload,
  sendEmail,
};
