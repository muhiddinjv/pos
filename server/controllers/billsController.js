import Bills from '../models/BillsModel.js';

export const addBillsController = async (req, res) => {
    try {
        const newBills = new Bills(req.body);
        await newBills.save();
        res.send("Bill Created Successfully!");
    } catch (error) {
        console.log(error);
    }
}
