const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAll);
router.post("/login", controller.login);
router.post("/", controller.post);
router.delete("/:id", controller.delete);
router.delete("/", controller.deleteAll);
router.put("/:id", controller.update);
router.get("/search", controller.search);

module.exports = router;
