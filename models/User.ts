import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    avatar: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
