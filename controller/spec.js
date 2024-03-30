const specUsecase = require("../usecase/spec");

exports.getSpecs = async (req, res, next) => {
  try {
    const specs = await specUsecase.getSpecs();
    res.status(200).json({
      message: "Success to get specs",
      data: specs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const spec = await specUsecase.getSpecById(id);
    if (!spec) {
      return next({
        message: `spec with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: `Success to get spec with id ${id}`,
      data: spec,
    });
  } catch (error) {
    next(error);
  }
};

exports.createSpec = async (req, res, next) => {
  try {
    const { carId, spec } = req.body;
    if (!carId) {
      return res.status(400).json({
        data: null,
        message: "Car id is required!",
      });
    }
    if (!spec) {
      return res.status(400).json({
        data: null,
        message: "Spec is required!",
      });
    }
    const data = await specUsecase.createSpec({ carId, spec });
    res.status(201).json({
      message: "Success to create spec",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { carId, spec } = req.body;
    if (!spec) {
      return res.status(400).json({
        data: null,
        message: "spec is required!",
      });
    }
    const data = await specUsecase.updateSpec(id, { carId, spec });
    res.status(200).json({
      message: `Success to update spec with id ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await specUsecase.getSpecById(id);
    if (!data) {
      return next({
        message: `spec with id ${id} is not found!`,
        statusCode: 404,
      });
    }
    await specUsecase.deleteSpec(id);
    res.status(200).json({
      message: `Success to delete spec with id ${id}`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
