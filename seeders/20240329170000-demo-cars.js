'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define dummy data for cars
    const carsData = [
      {
        id: uuidv4(),
        plate: 'ABC123',
        manufacture: 'Toyota',
        model: 'Camry',
        image: 'path/to/image.jpg',
        rentPerDay: 50,
        capacity: 5,
        description: 'Sedan car suitable for family trips.',
        transmission: 'Automatic',
        availableAt: new Date(),
        available: true,
        type: 'Sedan',
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more cars as needed
    ];

    // Insert cars data into the Cars table
    await queryInterface.bulkInsert('Cars', carsData, {});

    // If you have associations like options or specs, you may need to create those records too
    // For example:
    // const car = await queryInterface.sequelize.query('SELECT id FROM Cars WHERE plate = "ABC123";');
    // const carId = car[0][0].id;
    // await queryInterface.bulkInsert('Options', [
    //   { carId: carId, option: 'Option 1', createdAt: new Date(), updatedAt: new Date() },
    //   { carId: carId, option: 'Option 2', createdAt: new Date(), updatedAt: new Date() },
    // ]);

    // Repeat the process for other associations if needed

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the Cars table
    await queryInterface.bulkDelete('Cars', null, {});

    // If you have associated data in other tables, you may need to remove them too
    // For example:
    // await queryInterface.bulkDelete('Options', null, {});

    return Promise.resolve();
  }
};
