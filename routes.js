const express = require("express");
const routes = express.Router();
const Hubs = require("./hubs/hubs-model.js");

routes.use(express.json());

// routes.get("/api/hubs", async (req, res) => {
//   try {
//     const hubs = await Hubs.find(req.query);
//     res.status(200).json(hubs);
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the hubs"
//     });
//   }
// });

routes.get("/api/hubs", (req, res) => {
  Hubs.find(req.query)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

routes.get("/api/hubs/:id", async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "Hub not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the hub"
    });
  }
});

routes.post("/api/hubs", async (req, res) => {
  try {
    const hub = await Hubs.add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the hub"
    });
  }
});

routes.delete("/api/hubs/:id", async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The hub has been nuked" });
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the hub"
    });
  }
});

routes.put("/api/hubs/:id", async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the hub"
    });
  }
});

// get messages from a particular hub
routes.get("/api/hubs/:id/messages", (req, res) => {
  const { id } = req.params;
  Hubs.findMessageById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

routes.post("/api/hubs/:id/messages", (req, res) => {
  Hubs.addMessage({
    sender: req.body.sender,
    text: req.body.text,
    hub_id: req.params.id
  })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json("somethings wrong", error);
    });
});

// CHECK REST VS SOAP VS RPC
// also check GRAPHQL (super cool)

module.exports = routes;
