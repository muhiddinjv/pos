import mongoose from 'mongoose';

const billsSchema = mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: Number, required: true },
    customerAdress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: { type: Array, required: true },
},{
    timestamps: true
});

const Bills = mongoose.model("Bills", billsSchema);
export default Bills;