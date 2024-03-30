const carRepo = require("../../repository/car");

exports.getCars = async () => {
  const data = await carRepo.getCars();
  return data;
}

exports.getCarById = async (id) => {
  const data = await carRepo.getCarById(id);
  return data;
}

exports.getCarByCapacity = async (capacity) => {
  const data = await carRepo.getCarByCapacity(capacity);
  return data;
}

exports.createCar = async (payload) => {
  const data = await carRepo.createCar(payload);
  return data;
}

exports.updateCar = async (id, payload) => {
  const data = await carRepo.updateCar(id, payload);
  return data;
}

exports.deleteCar = async (id) => {
  const data = await carRepo.deleteCar(id);
  return data;
}