const express = require("express");
const router = express.Router();

const carController = require("../controller/car");

router.route("/")
  .get(carController.getCars)
  .post(carController.createCar);

router
  .route("/id/:id")
  .get(carController.getCarById)
  .put(carController.updateCar)
  .delete(carController.deleteCar);

router.get("/capacity/:capacity", carController.getCarByCapacity);

module.exports = router;
