const nodemailer = require('nodemailer');
const config = require('../config/emailConfig');
const db = require('../config/dbConfig');

function sendEmail(email) {
    const transporter = nodemailer.createTransport(config.emailConfig);

    const mailOptions = {
        from: config.emailConfig.auth.user,
        to: email,
        subject: '10 sec Reminder',
        text: 'This is a reminder email sent every 10 sec.'
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent to', email, ':', info.response);

            try {
                // Reset the counter to 0
                await db.query('UPDATE update_counter SET counter = 0 WHERE id = 1');
                console.log('Counter reset to 0');
            } catch (error) {
                console.log("Failed to reset counter:", error);
            }

            // Update the counter in the database
            try {
                const [result] = await db.query('UPDATE update_counter SET counter = counter + 1 WHERE id = 1');
                console.log('Counter updated:', result.affectedRows);
            } catch (error) {
                console.error('Error updating counter:', error);
            }
        }
    });
}

module.exports = {
    sendEmail
};

// module.exports = {
//     sendEmail
// };
