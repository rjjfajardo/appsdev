const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTask);
router.get("/make_task", taskController.makeTask);
router.get("/create_task", taskController.createTask);


module.exports = router;