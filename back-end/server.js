const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/CronRouter');
const cors = require('cors')

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.json());

// Routes
app.use(router);

app.listen(5000);
