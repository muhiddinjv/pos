import pkg from 'jsonwebtoken';
const { sign,verify } = pkg;

export const signuser = (data)=> sign(data,"NO_SECRET_KEY")
export const verifyuser = (data) => verify(data, "NO_SECRET_KEY")