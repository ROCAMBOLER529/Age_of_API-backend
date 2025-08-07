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
        this.cargarMiddlewares();
        this.cargarRoutes();
        this.conectarDB();
        this.app.use(cors({ 
            origin: 'https://age-of-api-frontend.vercel.app',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true 
        }));
    }

    cargarMiddlewares() {
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






