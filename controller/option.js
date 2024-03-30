const optionUsecase = require("../usecase/option");

exports.getOptions = async (req, res, next) => {
  try {
    const options = await optionUsecase.getOptions();
    res.status(200).json({
      message: "Success to get options",
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOptionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = await optionUsecase.getOptionById(id);
    if (!option) {
      return next({
        message: `Option with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: `Success to get option with id ${id}`,
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOption = async (req, res, next) => {
  try {
    const { carId, option } = req.body;
    if (!carId) {
      return res.status(400).json({
        data: null,
        message: "Car id is required!",
      });
    }
    if (!option) {
      return res.status(400).json({
        data: null,
        message: "Option is required!",
      });
    }
    const data = await optionUsecase.createOption({ carId, option });
    res.status(201).json({
      message: "Success to create option",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { carId, option } = req.body;
    if (!option) {
      return res.status(400).json({
        data: null,
        message: "Option is required!",
      });
    }
    const data = await optionUsecase.updateOption(id, { carId, option });
    res.status(200).json({
      message: `Success to update option with id ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await optionUsecase.getOptionById(id);
    if (!data) {
      return next({
        message: `Option with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    await optionUsecase.deleteOption(id);
    res.status(200).json({
      message: `Success to delete option with id ${id}`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
