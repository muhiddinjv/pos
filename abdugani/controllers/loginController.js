import Admin from "../models/adminModel.js";

import { signuser } from "../lib/jwt.js";

export const loginController = async (req, res) => {
  try {
    const admin = await Admin.find();
    const { email, password } = req.body;
    const sortAdmin = admin.find(
      (e) => e.email === email && e.password === password
    );
    console.log(sortAdmin, email, password);

    if (!sortAdmin) {
      res.send("email or password is not correct");
      return;
    }

    const token = signuser({ adminId: sortAdmin._id, name: sortAdmin.email });
    res.status(200).send({
      stutus: 200,
      token: token,
      idAdmin: sortAdmin.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};
