import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

class MemoryServer {
  constructor() {
    this.mongod = new MongoMemoryServer();
    this.connection = null;
  }

  // Spin up a new in-memory mongo instance
  async connect() {
    const uri = await this.mongod.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };

    this.connection = await mongoose.createConnection(uri, mongooseOpts);
  }

  // Close the connection and halt the mongo instance
  async disconnect() {
    await this.connection.dropDatabase();
    await this.connection.close();
    await this.mongod.stop();
    console.log('DB - connection closed');
  }

  // Remove all documents from the entire database - useful between tests
  async clearDatabase() {
    const collections = this.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}

export default MemoryServer;