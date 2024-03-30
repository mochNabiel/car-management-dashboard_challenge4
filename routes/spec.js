const express = require("express");
const router = express.Router();

const specController = require("../controller/spec");

router
  .route("/")
  .get(specController.getSpecs)
  .post(specController.createSpec);
  
router
  .route("/:id")
  .get(specController.getSpecById)
  .put(specController.updateSpec)
  .delete(specController.deleteSpec);

module.exports = router;