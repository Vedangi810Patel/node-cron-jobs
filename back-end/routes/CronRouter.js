const express = require('express');
const router = express.Router();
const emailController = require('../controller/Email_Controller');
const EmailFormController = require('../controller/EmailForm_Controller');
const cron = require('node-cron');
const ExcelCotroller = require('../controller/ExcelController');

    router.post('/sendEmail', (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email address is required' });
        }

        cron.schedule('*/10 * * * * *', () => {
            emailController.sendEmail(email);
        });

        return res.status(200).json({ message: 'Email scheduled to be sent to ' + email });
    });


router.post('/SendEmailForm', EmailFormController.upload, EmailFormController.sendEmail);

router.post('/ExcelInsertion', ExcelCotroller.uploadFile);

router.get('/AllProducts', ExcelCotroller.getAllProducts)

module.exports = router;
