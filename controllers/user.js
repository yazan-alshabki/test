let MagicItem = require("../models/MagicItem.js");
let MagicMover = require("../models/MagicMover.js");
let MissionLogs = require("../models/MissionLogs.js");



// Add a Magic Mover
const addMagicMover = async (req, res) => {
    let weightLimit = req.body.weightLimit;
    let energy = req.body.energy;
    try {
        let mover = await MagicMover.create({
            weightLimit,
            energy,
            currentState: "resting"
        });;
        return res.status(200).json({
            success: true,
            mover: mover,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }

};

// Add a Magic Item
const addMagicItem = async (req, res) => {
    let name = req.body.name;
    let weight = req.body.weight;
    try {
        let item = await MagicItem.create({
            name,
            weight,
        });;
        return res.status(200).json({
            success: true,
            item: item,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }

};

// Loading
const loading = async (req, res) => {
    let moverId = req.body.moverId;
    let itemIds = req.body.itemIds;


    try {
        let mover = await MagicMover.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState == "on-mission") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not load more !'
            });
        }
        let itemsToLoad = [];
        for (let i = 0; i < itemIds.length; i++) {
            let item = await MagicItem.findById(itemIds[i]);
            itemsToLoad.push(item);
        }

        let totalWeight = itemsToLoad.reduce((total, item) => total + item.weight, 0);
        let carried = mover.itemsCarried;

        for (let i = 0; i < carried.length; i++) {
            totalWeight += carried[i]['weight'];
        }

        if (totalWeight > mover.weightLimit) {
            return res.status(400).json({
                success: false,
                error: 'Mover weight limit exceeded'
            });
        }
        mover.itemsCarried.push(...itemsToLoad);
        mover.currentState = 'loading';
        await mover.save();

        let loadingLog = await MissionLogs.create({
            moverId,
            state: "load before mission start",
            itemsLoaded: itemsToLoad.map(item => item._id),
        });

        res.status(200).json({
            success: true,
            loadingLog: loadingLog
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }

};

// Start a Mission
const startMission = async (req, res) => {
    let moverId = req.params.id;
    try {
        let mover = await MagicMover.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState != "loading") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not start a mission because he did not load !'
            });
        }
        mover.currentState = 'on-mission';
        await mover.save();

        let missionStartLog = await MissionLogs.create({
            moverId,
            state: "mission started",

        });

        res.status(200).json({
            success: true,

            missionStartLog: missionStartLog
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }


};

// End a Mission
const endMission = async (req, res) => {
    let moverId = req.params.id;
    try {
        let mover = await MagicMover.findById(moverId);
        if (!mover) {
            return res.status(404).json({
                success: false,
                error: 'Magic Mover not found !'
            });
        }
        if (mover.currentState != "on-mission") {
            return res.status(400).json({
                success: false,
                error: 'Magic Mover can not start a mission because he did not in mission !'
            });
        }
        let missionEndLog = await MissionLogs.create({
            moverId,
            state: "mission ended",
            itemsUnloaded: mover.itemsCarried.map(item => item._id),
        });
        mover.itemsCarried = [];
        mover.currentState = 'resting';
        await mover.save();
        res.status(200).json({
            success: true,
            missionEndLog: missionEndLog
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }




};

// The movers completed their missions
const moversCompleteTheirMission = async (req, res) => {
    try {
        let magicMovers = await MagicMover.find({});
        let missionLogs = await MissionLogs.find({});
        let moverMissions = magicMovers.map(mover => ({
            id: `Mover ${mover.id}`,
            missionsCompleted: missionLogs.filter(log => log.moverId.toString() == mover.id.toString() && log.itemsUnloaded.length > 0).length
        }));

        let movers = moverMissions.sort((a, b) => b.missionsCompleted - a.missionsCompleted);

        res.status(200).json({
            success: true,
            movers: movers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }


};


const adminController = {
    addMagicMover,
    addMagicItem,
    loading,
    startMission,
    endMission,
    moversCompleteTheirMission
};
module.exports = adminController;
