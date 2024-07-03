const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
dotenv.config();
const userRoutes = require("./routes/user.js");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const LOCAL_DB = process.env.LOCAL_DB;
const PORT = process.env.PORT;

// ============================== connect to database ==============================
let connectPort = async (port) => {
    try {
        await mongoose.connect(LOCAL_DB);
        app.listen(port);
        console.log(`connect to database done at port ${port}!!`);
    } catch (err) {
        console.log(err);
    }
};
connectPort(PORT);

// user actions
app.use("/", userRoutes);


// // Add a Magic Mover
// app.post('/Add-a-Magic-Item', (req, res) => {
//     const weightLimit = req.body.weightLimit;
//     const energy = req.body.energy;

//     const mover = { weightLimit, energy, state: 'resting', carriedItems: [] };
//     magicMovers.push(mover);
//     res.status(201).json({ mover: mover });
// });

// // Add a Magic Item
// app.post('/Add-a-Magic-Item', (req, res) => {
//     const name = req.body.name;
//     const weight = req.body.weight;

//     const item = { name, weight };
//     magicItems.push(item);

//     res.status(201).json({ item: item });
// });

// // Loading
// app.post('/mover/load/:id', (req, res) => {
//     const moverId = req.params.id;
//     const mover = magicMovers.find(m => m.id === moverId);
//     if (!mover) {
//         return res.status(404).json({ error: 'Magic Mover not found !' });
//     }

//     const itemIds = req.body.itemIds;
//     const itemsToLoad = magicItems.filter(item => itemIds.includes(item.id));
//     itemsToLoad.sort((a, b) => a.weight - b.weight);

//     console.log(itemsToLoad);

//     let totalWeight = 0;
//     let canNot = false;
//     for (let i = 0; i < itemsToLoad.length; i++) {
//         if (totalWeight + itemsToLoad[i]['weight'] > mover.weightLimit) {
//             canNot = true;
//             break;
//         } else {
//             totalWeight += itemsToLoad[i]['weight'];
//         }
//     }

//     if (canNot) {
//         return res.status(400).json({ error: 'Mover weight limit exceeded You can not load all these items !' });
//     }

//     mover.carriedItems = itemsToLoad;
//     mover.state = 'loading';
//     const loadingLog = { moverId, itemsLoaded: itemsToLoad.map(item => item.name), timestamp: new Date().toISOString() };
//     missionLogs.push(loadingLog);
//     res.status(200).json({ loadingLog: loadingLog });
// });

// // Start a Mission
// app.post('/mover/start-a-mission/:id', (req, res) => {
//     const moverId = req.params.id;
//     const mover = magicMovers.find(m => m.id === moverId);
//     if (!mover) {
//         return res.status(404).json({ error: 'Magic Mover not found' });
//     }

//     mover.state = 'on-mission';
//     const missionStartLog = { moverId, timestamp: new Date().toISOString() };
//     missionLogs.push(missionStartLog);
//     res.status(200).json({ missionStartLog: missionStartLog });
// });

// // End a Mission
// app.post('/mover/end-a-mission/:id', (req, res) => {
//     const moverId = req.params.id;
//     const mover = magicMovers.find(m => m.id === moverId);
//     if (!mover) {
//         return res.status(404).json({ error: 'Magic Mover not found' });
//     }

//     const missionEndLog = { moverId, itemsUnloaded: mover.carriedItems.map(item => item.name), timestamp: new Date().toISOString() };
//     missionLogs.push(missionEndLog);
//     mover.carriedItems = [];
//     mover.state = 'resting';
//     res.status(200).json({ missionEndLog: missionEndLog });
// });

// // The movers completed their missions
// app.get('/movers-complete-mission', (req, res) => {
//     const moverMissions = magicMovers.map(mover => ({
//         id: mover.id,
//         name: `Mover ${mover.id}`,
//         missionsCompleted: missionLogs.filter(log => log.moverId === mover.id && log.itemsUnloaded).length
//     }));

//     const movers = moverMissions.sort((a, b) => b.missionsCompleted - a.missionsCompleted);
//     res.status(200).json({ movers: movers });
// });


