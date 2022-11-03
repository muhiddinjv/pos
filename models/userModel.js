import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
  },
  {
    //for date
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
