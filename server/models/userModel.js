import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    password: { type: Number, required: true },
    verified: { type: Boolean }
},{
    //for date
    timestamp: true
});

const User = mongoose.model("User", userSchema);
export default User;