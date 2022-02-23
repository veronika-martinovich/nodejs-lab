/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer: any;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);
  console.log('MongoMemoryServer connection was successful');
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = {
  connect,
  close,
  clear,
};
