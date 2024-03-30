const { Car, Option } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getOptions = async () => {
  const key = `options:all`;
  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await Option.findAll();
  if (data.length > 0) {
    // save to redis
    await setData(key, data, 300);
  }
  return data;
};

exports.getOptionById = async (id) => {
  const key = `option:${id}`;
  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await Option.findAll({
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
  throw new Error(`Option with id ${id} is not found!`);
};

exports.createOption = async (payload) => {
  // create data to postgres
  const data = await Option.create(payload);

  // Include Car model immediately after creating the option
  await data.reload({ include: Car });

  // save to redis
  const key = `option:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateOption = async (id, payload) => {
  // update data to postgres
  await Option.update(payload, {
    where: {
      id,
    },
  });

  // get from postgre
  const data = await Option.findAll({
    where: {
      id,
    },
    include: {
      model: Car,
    },
  })
  if(data.length > 0) {

    // save to redis
    const key = `option:${id}`;
    await setData(key, data, 300);

    return data[0]
  }

  return data;
};

exports.deleteOption = async (id) => {
  const key = `option:${id}`;

  // delete from postgres
  await Option.destroy({
    where: {
      id
    }
  })

  // delete from redis
  await deleteData(key);

  return null
}
