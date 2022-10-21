import Bills from '../models/BillsModel.js';


export const getBillsController = async (req, res) => {
    try {
        res.send(await Bills.find());
    } catch (error) {
        console.log(error);
    }
}

export const addBillsController = async (req, res) => {
    try {
        const newBills = new Bills(req.body);
        console.log(newBills)
        await newBills.save();
        res.send("Bill Created Successfully!");
    } catch (error) {
        console.log(error);
    }
}
