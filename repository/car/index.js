const crypto = require("crypto");
const path = require("path");
const { Car, Option, Spec } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  let key = `cars:all`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await Car.findAll();
  if (data.length > 0) {
    // save to redis
    await setData(key, data, 300);
  }
  return data;
};

exports.getCarById = async (id) => {
  const key = `car:${id}`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from database
  data = await Car.findAll({
    where: {
      id,
    },
    include: [Option, Spec],
  });

  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }
  throw new Error(`Car with id ${id} is not found!`);
};

exports.getCarByCapacity = async (capacity) => {
  const key = `car:${capacity}`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from database
  data = await Car.findAll({
    where: {
      capacity,
    },
    include: [Option, Spec],
  });

  if (data.length > 0) {
    // save to redis
    await setData(key, data, 300);

    return data;
  }
  throw new Error(`Cars with capacity ${capacity} is not found!`);
};

exports.createCar = async (payload) => {
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // save to db
  const data = await Car.create(payload);

  // Include Car model immediately after creating the car
  await data.reload({ include: [Option, Spec] });

  // save to redis
  const key = `car:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCar = async (id, payload) => {
  const key = `car:${id}`;

  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    // make unique filename -> 213123128uasod9as8djas
    image.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // update to postgres
  await Car.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await Car.findAll({
    where: {
      id,
    },
    include: [Option, Spec],
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
};

exports.deleteCar = async (id) => {
  const key = `car:${id}`;

  // delete from postgres
  await Car.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
