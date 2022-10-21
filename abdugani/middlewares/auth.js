import { verifyuser } from "../lib/jwt";
import Admin from "../models/adminModel";

module.exports = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    const { token } = req.headers;

    const { adminId, name } = verifyuser(token);

    const foundAdmin = admin.find((e) => e.id === adminId && e.name === name);

    if (!foundAdmin) {
      res.redirect("/login");
      return;
    }
    next();
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: "Not Auth Token",
    });
  }
};
