import mongoose from "mongoose";

const { DATABASE_URI } = process.env;

export interface IConnectStatus {
  success: boolean;
}

mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(DATABASE_URI!);
      console.log("DATABASE CONNECTED");
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export default connectToDB;
