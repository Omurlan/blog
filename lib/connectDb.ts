import mongoose from 'mongoose';

export const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return mongoose;
  }

  try {
    if (process.env.MONGODB_URI) {
      const db = await mongoose.connect(process.env.MONGODB_URI);
      console.log('DB CONNECTED');

      return db;
    } else {
      throw new Error('Define db uri');
    }
  } catch (error) {
    console.log('DB CONNECTION ERROR', error);
  }
};
