const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_cron_jobs", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection Established !");
    })
    .catch((error) => {
        console.error("Error Connecting to database:", error);
    });

module.exports = sequelize;