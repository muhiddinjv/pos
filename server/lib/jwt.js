const { verify, sign } = require("jsonwebtoken")
const SECRET_KEY = "NO_SECRET_KEY"

const signuser = (data)=> sign(data, SECRET_KEY)
const verifyuser = (data) => verify(data, SECRET_KEY)

module.exports = {
    signuser,
    verifyuser
}