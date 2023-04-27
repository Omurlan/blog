import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const connectDB =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('HERE');

    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      return handler(req, res);
    } else {
      throw new Error('Define db uri');
    }
  };

export default connectDB;
