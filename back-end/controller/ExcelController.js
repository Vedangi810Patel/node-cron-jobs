const xlsx = require('xlsx');
const db = require('../config/dbConfig');
const handleFileUpload = require('../middleware/ExcelFileMiddleware');
const nodemailer = require('nodemailer');

const uploadFile = async (req, res, next) => {
    try {
        handleFileUpload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err.message });
            }

            const workbook = xlsx.readFile(req.file.path);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);

            const sequelize = db;

            let insertedCount = 0; 

            for (const row of data) {
                console.log('Discount percent:', row.discount_percent);
                const discountedPrice = row.price - (row.price * row.discount_percent) / 100;

                await sequelize.query(`
                  INSERT INTO products ( product_name, product_desc, price, discount_percent,discounted_price, product_sku, variant_id, category_id)
                  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)
                `, {
                    replacements: [
                        row.product_name,
                        row.product_desc,
                        row.price,
                        row.discount_percent,
                        discountedPrice, 
                        row.product_sku,
                        row.variant_id,
                        row.category_id
                    ]
                });

                insertedCount++;
            }

            // Send email notification
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'bonypatel810@gmail.com',
                    pass: 'ilzt ubxj xenv smxh'
                }
            });

            const mailOptions = {
                from: 'bonypatel810@gmail.com',
                to: 'bonypatel810@gmail.com',
                subject: `${req.file.originalname} processed successfully`,
                text: `${insertedCount} records inserted into the products table`
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'File uploaded and data inserted successfully' });
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const sequelize = db;
        const products = await sequelize.query(
            `SELECT p.*, c.category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id`);

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    uploadFile,
    getAllProducts
};
