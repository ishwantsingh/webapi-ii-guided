const express = require("express");
const hubRoutes = require("./routes");
// const Hubs = require("./hubs/hubs-model.js"); //ROUTES WILL NEED THIS

const server = express();

// server.use(express.json()); //rOUTES WILL NEED THIS

server.use(hubRoutes);
// server.use("/api/hubs", hubRoutes); // IF YOU USE THIS THEN YOU CAN JUST TYPE THE PATH WITHOUT '/api/hubs'

module.exports = server;
