const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.js");
const {
    add_a_magic_mover,
    add_a_magic_item,
} = require("../middlewares/validator.js");
const { validationHandler } = require("../helpers/validation.js");

// Add a Magic Mover
router.post('/Add-a-Magic-Mover', validationHandler(add_a_magic_mover), userController.addMagicMover);

// Add a Magic Item
router.post('/Add-a-Magic-Item', validationHandler(add_a_magic_item), userController.addMagicItem);

// Loading
router.post('/mover/load', userController.loading);

// Start a Mission
router.get('/mover/start-a-mission/:id', userController.startMission);

// End a Mission
router.get('/mover/end-a-mission/:id', userController.endMission);

// The movers completed their missions
router.get('/movers-complete-mission', userController.moversCompleteTheirMission);


module.exports = router;
