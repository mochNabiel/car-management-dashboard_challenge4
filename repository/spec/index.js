const { Car, Spec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getSpecs = async () => {
  const key = `specs:all`;
  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await Spec.findAll();
  if (data.length > 0) {
    // save to redis
    await setData(key, data, 300);
  }
  return data;
};

exports.getSpecById = async (id) => {
  const key = `spec:${id}`;
  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await Spec.findAll({
    where: {
      id,
    },
    include: {
      model: Car,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);
    return data[0];
  }
  throw new Error(`Spec with id ${id} is not found!`);
};

exports.createSpec = async (payload) => {
  // create data to postgres
  const data = await Spec.create(payload);

  // Include Car model immediately after creating the spec
  await data.reload({ include: Car });

  // save to redis
  const key = `spec:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateSpec = async (id, payload) => {
  // update data to postgres
  await Spec.update(payload, {
    where: {
      id,
    },
  });

  // get from postgre
  const data = await Spec.findAll({
    where: {
      id,
    },
    include: {
      model: Car,
    },
  });
  if (data.length > 0) {
    // save to redis
    const key = `spec:${id}`;
    await setData(key, data, 300);

    return data[0];
  }

  return data;
};

exports.deleteSpec = async (id) => {
  const key = `spec:${id}`;

  // delete from postgres
  await Spec.destroy({
    where: {
      id,
    },
  });

  // delete from redis
  await deleteData(key);

  return null;
};
