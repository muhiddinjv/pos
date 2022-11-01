import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
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
