import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: Number, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean }
},{
    //for date
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;