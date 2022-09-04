import User from '../models/userModel.js';

export const loginController = async (req, res) => {
    try {
        const {userId, password} = req.body;
        const user = await User.findOne({userId, password, verified:true});
        res.status(200).send('Login Successfully!');
    } catch (error) {
        console.log(error);
    }
}

export const userController = async (req, res) => {
    try {
        const newUser = new Product(req.body);
        await newUser.save();
        res.status(200).send("New User Added Successfully!");
    } catch (error) {
        console.log(error);
    }
}