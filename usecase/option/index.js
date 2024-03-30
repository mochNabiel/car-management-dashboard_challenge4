const optionRepo = require("../../repository/option");

exports.getOptions = async () => {
  const data = await optionRepo.getOptions();
  return data;
}

exports.getOptionById = async (id) => {
  const data = await optionRepo.getOptionById(id);
  return data;
}

exports.createOption = async (payload) => {
  const data = await optionRepo.createOption(payload);
  return data;
}

exports.updateOption = async (id, payload) => {
  const data = await optionRepo.updateOption(id, payload);
  return data;
}

exports.deleteOption = async (id) => {
  const data = await optionRepo.deleteOption(id);
  return data;
}