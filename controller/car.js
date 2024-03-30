const carUsecase = require("../usecase/car");
const { v4: uuid } = require("uuid");

const checkCarInput = (req, res) => {
  const {
    plate,
    manufacture,
    model,
    rentPerDay,
    capacity,
    description,
    transmission,
    year,
    type,
    available,
    availableAt,
  } = req.body;
  if (!plate) {
    return res.status(400).json({
      data: null,
      message: "plate is required!",
    });
  }
  if (!manufacture) {
    return res.status(400).json({
      data: null,
      message: "Manufacture is required!",
    });
  }
  if (!model) {
    return res.status(400).json({
      data: null,
      message: "Model is required!",
    });
  }
  if (!rentPerDay) {
    return res.status(400).json({
      data: null,
      message: "Rent Per Day is required!",
    });
  }
  if (!capacity) {
    return res.status(400).json({
      data: null,
      message: "Capacity is required!",
    });
  }
  if (!description) {
    return res.status(400).json({
      data: null,
      message: "Description is required!",
    });
  }
  if (!transmission) {
    return res.status(400).json({
      data: null,
      message: "Transmission is required!",
    });
  }
  if (!year) {
    return res.status(400).json({
      data: null,
      message: "Year is required!",
    });
  }
  if (!type) {
    return res.status(400).json({
      data: null,
      message: "Type is required!",
    });
  }
  if (!available) {
    return res.status(400).json({
      data: null,
      message: "Available is required!",
    });
  }
  if (!availableAt) {
    return res.status(400).json({
      data: null,
      message: "Available At is required!",
    });
  }
};

exports.getCars = async (req, res, next) => {
  try {
    const cars = await carUsecase.getCars();
    res.status(200).json({
      message: "Success to get cars",
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCarById(id);
    if (!data) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: `Success to get car with id ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarByCapacity = async (req, res, next) => {
  try {
    const { capacity } = req.params;
    const data = await carUsecase.getCarByCapacity(capacity);
    if (!data) {
      return next({
        message: `Cars with capacity ${capacity} is not found!`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: `Success to get cars with capacity ${capacity}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCar = async (req, res, next) => {
  try {
    checkCarInput(req, res);
    const id = uuid();
    const { image } = req.files;
    const car = await carUsecase.createCar({
      id,
      ...req.body,
      image,
    });
    res.status(201).json({
      message: "Success to create car",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    checkCarInput(req, res);
    const { id } = req.params;
    const { image } = req.files;

    const car = await carUsecase.updateCar(id, req.body, image);
    res.status(200).json({
      message: `Success to update car with id ${id}`,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCarById(id);
    if (!data) {
      return next({
        message: `Car with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    await carUsecase.deleteCar(id);
    res.status(200).json({
      message: `Success to delete car with id ${id}`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
