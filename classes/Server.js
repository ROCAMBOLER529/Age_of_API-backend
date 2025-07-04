/*
+-------------------+
|                   |
| classes/Server.js |
|                   |
+-------------------+
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.db = process.env.MONGO_URI;
        // this.db = 'mongodb+srv://rocamboler529:<db_password>@ageofapi.47ph7.mongodb.net/';
        // this.db = 'mongodb://localhost:27017/Age_of_API';
        this.cargarMiddlewares();
        this.cargarRoutes();
        this.conectarDB();
    }

    cargarMiddlewares() {
        this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    cargarRoutes() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/api/usuarios", require('../routes/usuario'));
        this.app.use("/api/units", require('../routes/units'));
        this.app.use("/api/tech", require('../routes/tech'));
        this.app.use("/api/buildings", require('../routes/buildings'));
        this.app.use("/api/animals", require('../routes/animals'));
        this.app.use("/api/nature", require('../routes/nature'));
        this.app.use("/api/civilizations", require('../routes/civilizations'));
        this.app.use("/api/auth", require('../routes/auth'));
    }

    async conectarDB() {
        try {
            await mongoose.connect(this.db);
            console.log("(1) DB:", mongoose.connection.name);

            mongoose.connection.on("connected", () => {
                console.log("DB: ", mongoose.connection.name);                
            })
        } catch (e) {
            console.log(e);
            throw new Error("(2)");
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("(3)");
        })
    }
}

module.exports = Server;
