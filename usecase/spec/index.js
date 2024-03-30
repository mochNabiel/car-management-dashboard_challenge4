const specRepo = require("../../repository/spec");

exports.getSpecs = async () => {
  const data = await specRepo.getSpecs();
  return data;
}

exports.getSpecById = async (id) => {
  const data = await specRepo.getSpecById(id);
  return data;
}

exports.createSpec = async (payload) => {
  const data = await specRepo.createSpec(payload);
  return data;
}

exports.updateSpec = async (id, payload) => {
  const data = await specRepo.updateSpec(id, payload);
  return data;
}

exports.deleteSpec = async (id) => {
  const data = await specRepo.deleteSpec(id);
  return data;
}