const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
let database;

const initDb = async (callback) => {
  if (database) {
    console.warn('Trying to init DB again!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI).then((client) => {
    database = client.db(process.env.DB_NAME);
    console.log("DB initialized - connected to: " + process.env.MONGODB_URI);
    return callback(null, database);
  }).catch((err) => {
    return callback(err);
  });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDatabase };
